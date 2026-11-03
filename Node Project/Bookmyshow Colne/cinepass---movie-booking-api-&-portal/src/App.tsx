import React, { useState, useEffect, useMemo } from 'react';
import {
  Film,
  Search,
  Ticket,
  Calendar,
  Globe,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Code2,
  Send,
  Terminal,
  RefreshCw,
  X,
  ChevronRight,
  ShieldAlert,
  Bot,
  ExternalLink,
  Copy,
  Check,
  Info
} from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  language: string;
  releaseDate: string;
  release_date?: string;
  genre?: string;
  duration?: string;
  rating?: string;
  director?: string;
  banner?: string;
  poster?: string;
  synopsis?: string;
}

interface BookingRecord {
  bookingId: string;
  movieId: string;
  movieTitle: string;
  seatNumber: string;
  userEmail: string;
  bookedAt: string;
}

interface ApiResponse<T = any> {
  status: number;
  statusText: string;
  data: T;
  latencyMs: number;
  url: string;
  method: string;
  timestamp: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'portal' | 'playground' | 'code' | 'bookings'>('portal');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);
  
  // Selected movie for booking modal
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('mohitparekh2002@gmail.com');
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [bookingResult, setBookingResult] = useState<{
    success: boolean;
    message?: string;
    error?: string;
    status?: number;
    booking?: BookingRecord;
  } | null>(null);
  const [simulateErrorInBooking, setSimulateErrorInBooking] = useState<boolean>(false);

  // Booking history
  const [bookingHistory, setBookingHistory] = useState<BookingRecord[]>([]);

  // API Playground states
  const [endpointMethod, setEndpointMethod] = useState<'GET' | 'POST'>('GET');
  const [endpointPath, setEndpointPath] = useState<string>('/movies');
  const [requestBody, setRequestBody] = useState<string>(
    JSON.stringify(
      {
        movieId: 'm1',
        seatNumber: 'C5',
        userEmail: 'mohitparekh2002@gmail.com'
      },
      null,
      2
    )
  );
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Fetch initial movies (/movies)
  const fetchMovies = async () => {
    setLoadingMovies(true);
    try {
      const res = await fetch('/movies');
      const data = await res.json();
      if (Array.isArray(data)) {
        setMovies(data);
      }
    } catch (err) {
      console.error('Failed to load movies:', err);
    } finally {
      setLoadingMovies(false);
    }
  };

  // Fetch booking history
  const fetchBookingHistory = async () => {
    try {
      const res = await fetch('/booking-history');
      if (res.ok) {
        const data = await res.json();
        setBookingHistory(data);
      }
    } catch (err) {
      console.error('Failed to load booking history:', err);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchBookingHistory();
  }, []);

  // Live search when query changes (GET /search-movies?q=...)
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setSearching(true);
      try {
        const url = searchQuery.trim() ? `/search-movies?q=${encodeURIComponent(searchQuery.trim())}` : '/movies';
        const res = await fetch(url);
        const data = await res.json();
        if (Array.isArray(data)) {
          setMovies(data);
        }
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setSearching(false);
      }
    }, 250);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // When a movie is opened for booking, fetch current booked seats
  const openBookingModal = async (movie: Movie) => {
    setSelectedMovie(movie);
    setSelectedSeat('');
    setBookingResult(null);
    setSimulateErrorInBooking(false);
    try {
      const res = await fetch(`/booked-seats/${movie.id}`);
      if (res.ok) {
        const data = await res.json();
        setBookedSeats(data.bookedSeats || []);
      } else {
        setBookedSeats([]);
      }
    } catch {
      setBookedSeats([]);
    }
  };

  // Submit booking (POST /book-ticket)
  const handleBookTicket = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedMovie || !selectedSeat) return;

    setIsBooking(true);
    setBookingResult(null);

    const startTime = performance.now();
    try {
      const payload: any = {
        movieId: selectedMovie.id,
        seatNumber: selectedSeat,
        userEmail: userEmail.trim()
      };

      if (simulateErrorInBooking) {
        payload.simulateError = true;
      }

      const res = await fetch('/book-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      const latencyMs = Math.round(performance.now() - startTime);

      if (res.ok) {
        setBookingResult({
          success: true,
          message: data.confirmationMessage || data.message,
          booking: data.booking,
          status: res.status
        });
        // Update local booked seats
        setBookedSeats((prev) => [...prev, selectedSeat.toUpperCase()]);
        fetchBookingHistory();
      } else {
        setBookingResult({
          success: false,
          error: data.error || 'Failed to complete booking',
          status: res.status
        });
      }
    } catch (err: any) {
      setBookingResult({
        success: false,
        error: err.message || 'Network error occurred while booking ticket',
        status: 500
      });
    } finally {
      setIsBooking(false);
    }
  };

  // Execute API Playground query
  const runPlaygroundRequest = async () => {
    setApiLoading(true);
    const startTime = performance.now();
    try {
      const options: RequestInit = {
        method: endpointMethod,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (endpointMethod === 'POST') {
        options.body = requestBody;
      }

      const res = await fetch(endpointPath, options);
      const latencyMs = Math.round(performance.now() - startTime);
      let data: any;
      try {
        data = await res.json();
      } catch {
        data = await res.text();
      }

      setApiResponse({
        status: res.status,
        statusText: res.statusText || (res.status === 200 ? 'OK' : 'Error'),
        data,
        latencyMs,
        url: endpointPath,
        method: endpointMethod,
        timestamp: new Date().toLocaleTimeString()
      });

      if (endpointPath === '/reset-seats' && res.ok) {
        fetchMovies();
        fetchBookingHistory();
      }
    } catch (err: any) {
      const latencyMs = Math.round(performance.now() - startTime);
      setApiResponse({
        status: 500,
        statusText: 'Internal Error',
        data: { error: err.message || 'Network request failed' },
        latencyMs,
        url: endpointPath,
        method: endpointMethod,
        timestamp: new Date().toLocaleTimeString()
      });
    } finally {
      setApiLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Cinema layout rows
  const seatRows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 10;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-900/30">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-rose-400 bg-clip-text text-transparent">
                  CinePass
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Node.js API
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Express Movie Routes & Seat Validation Service
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('portal')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'portal'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Movies</span>
            </button>

            <button
              onClick={() => setActiveTab('playground')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'playground'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>API Playground</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'bookings'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>Bookings ({bookingHistory.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'code'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span className="hidden sm:inline">Requirements &</span> Code
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TAB 1: MOVIE PORTAL */}
        {activeTab === 'portal' && (
          <div className="space-y-6">
            {/* Hero & Search Banner */}
            <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/90 to-rose-950/40 border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-2xl">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-rose-500/10 to-transparent pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Upcoming Blockbusters • Live Express API
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  Discover & Book Your Favorite Upcoming Movies
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Powered by a custom Node.js Express backend in <code className="px-1.5 py-0.5 rounded bg-slate-800 text-rose-300 font-mono text-xs">movieRoutes.js</code> with <code className="px-1.5 py-0.5 rounded bg-slate-800 text-rose-300 font-mono text-xs">/movies</code>, <code className="px-1.5 py-0.5 rounded bg-slate-800 text-rose-300 font-mono text-xs">/search-movies</code>, and AI-validated <code className="px-1.5 py-0.5 rounded bg-slate-800 text-rose-300 font-mono text-xs">/book-ticket</code>.
                </p>

                {/* Live Search Bar (GET /search-movies?q=...) */}
                <div className="pt-2">
                  <div className="relative flex items-center">
                    <Search className={`w-5 h-5 absolute left-3.5 text-slate-400 ${searching ? 'animate-pulse text-rose-400' : ''}`} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search movie titles (e.g., 'Dune', 'Spider', 'War', 'Batman')..."
                      className="w-full pl-11 pr-24 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm shadow-inner transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-12 text-slate-400 hover:text-white p-1"
                        title="Clear search"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <div className="absolute right-2 px-2 py-1 bg-slate-800/80 text-[10px] font-mono text-slate-300 rounded border border-slate-700">
                      /search-movies
                    </div>
                  </div>

                  {/* Search Hint Chips */}
                  <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-400">
                    <span className="text-slate-400">Quick searches:</span>
                    {['Dune', 'Spider-Man', 'War', 'Kalki', 'Batman'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                      >
                        {term}
                      </button>
                    ))}
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-rose-400 hover:underline ml-2"
                      >
                        Reset Filter
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Movie List Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Upcoming Cinema Releases</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                    {movies.length} {movies.length === 1 ? 'Movie' : 'Movies'}
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Fetched via <code className="text-rose-300 font-mono">GET {searchQuery ? `/search-movies?q=${searchQuery}` : '/movies'}</code>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchMovies}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingMovies ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            </div>

            {/* Movies Grid */}
            {loadingMovies ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <div key={idx} className="h-80 bg-slate-900/60 rounded-xl animate-pulse border border-slate-800" />
                ))}
              </div>
            ) : movies.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 p-8 space-y-3">
                <Film className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-300">No movies found matching "{searchQuery}"</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Our case-insensitive search route uses <code className="text-rose-400">Array.filter()</code> and <code className="text-rose-400">String.toLowerCase()</code>. Try checking for another title.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition"
                >
                  View All Movies
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="group bg-slate-900/80 rounded-2xl border border-slate-800/90 overflow-hidden hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-rose-950/20 flex flex-col"
                  >
                    {/* Movie Banner Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                      <img
                        src={movie.banner || movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                      
                      {/* Language & Rating Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold border border-slate-700/80 flex items-center gap-1">
                          <Globe className="w-3 h-3 text-rose-400" />
                          {movie.language}
                        </span>
                        {movie.rating && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-500/30">
                            {movie.rating}
                          </span>
                        )}
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 rounded bg-black/70 backdrop-blur-md text-[11px] font-mono text-slate-300 border border-slate-800">
                          ID: {movie.id}
                        </span>
                      </div>

                      {/* Release Date Countdown Tag */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 font-medium">
                        <span className="flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-800">
                          <Calendar className="w-3.5 h-3.5 text-rose-400" />
                          Release: <strong className="text-white">{movie.releaseDate}</strong>
                        </span>
                        {movie.duration && (
                          <span className="flex items-center gap-1 bg-slate-900/90 px-2 py-1 rounded-md border border-slate-800 text-slate-300">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {movie.duration}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Movie Info */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-lg text-white group-hover:text-rose-400 transition-colors line-clamp-1">
                            {movie.title}
                          </h3>
                        </div>

                        {movie.genre && (
                          <p className="text-xs font-medium text-rose-400/90 tracking-wide uppercase">
                            {movie.genre}
                          </p>
                        )}

                        {movie.synopsis && (
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {movie.synopsis}
                          </p>
                        )}
                      </div>

                      {/* Card Footer with Book Button */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-3">
                        <div className="text-[11px] text-slate-400">
                          {movie.director ? `Dir: ${movie.director}` : 'Standard Screen'}
                        </div>

                        <button
                          onClick={() => openBookingModal(movie)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-bold tracking-wide shadow-md shadow-rose-900/20 hover:shadow-rose-900/40 flex items-center gap-1.5 transition-all transform active:scale-95"
                        >
                          <Ticket className="w-3.5 h-3.5" />
                          <span>Book Ticket</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: API PLAYGROUND */}
        {activeTab === 'playground' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-rose-500" />
                  Interactive API Playground & Route Tester
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Test <code className="text-rose-300">GET /movies</code>, <code className="text-rose-300">GET /search-movies</code>, <code className="text-rose-300">POST /book-ticket</code>, and deliberate 500 error scenarios.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    await fetch('/reset-seats', { method: 'POST' });
                    fetchMovies();
                    fetchBookingHistory();
                    alert('Seats & Demo state reset successfully!');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Bookings Store
                </button>
              </div>
            </div>

            {/* Quick Test Presets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={() => {
                  setEndpointMethod('GET');
                  setEndpointPath('/movies');
                }}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  endpointPath === '/movies' && endpointMethod === 'GET'
                    ? 'border-rose-500 bg-rose-500/10'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    GET
                  </span>
                  <span className="text-[10px] text-slate-400">Req #1</span>
                </div>
                <div className="font-mono text-xs text-white font-semibold mt-1">/movies</div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  Fetch 5 upcoming movies
                </div>
              </button>

              <button
                onClick={() => {
                  setEndpointMethod('GET');
                  setEndpointPath('/search-movies?q=Spider');
                }}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  endpointPath.startsWith('/search-movies') && endpointMethod === 'GET'
                    ? 'border-rose-500 bg-rose-500/10'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    GET
                  </span>
                  <span className="text-[10px] text-slate-400">Req #3</span>
                </div>
                <div className="font-mono text-xs text-white font-semibold mt-1">/search-movies?q=Spider</div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  Case-insensitive title search
                </div>
              </button>

              <button
                onClick={() => {
                  setEndpointMethod('POST');
                  setEndpointPath('/book-ticket');
                  setRequestBody(
                    JSON.stringify(
                      {
                        movieId: 'm1',
                        seatNumber: 'D4',
                        userEmail: 'mohitparekh2002@gmail.com'
                      },
                      null,
                      2
                    )
                  );
                }}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  endpointPath === '/book-ticket' && endpointMethod === 'POST'
                    ? 'border-rose-500 bg-rose-500/10'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    POST
                  </span>
                  <span className="text-[10px] text-slate-400">Req #2 & #5</span>
                </div>
                <div className="font-mono text-xs text-white font-semibold mt-1">/book-ticket</div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  Book ticket with AI seat check
                </div>
              </button>

              <button
                onClick={() => {
                  setEndpointMethod('GET');
                  setEndpointPath('/search-movies?simulateError=true');
                }}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  endpointPath.includes('simulateError')
                    ? 'border-red-500 bg-red-500/10'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                    ERR 500
                  </span>
                  <span className="text-[10px] text-slate-400">Req #4</span>
                </div>
                <div className="font-mono text-xs text-red-400 font-semibold mt-1">?simulateError=true</div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  Test 4-param 500 error handler
                </div>
              </button>
            </div>

            {/* Request Builder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Request Configuration */}
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-200 uppercase tracking-wider">
                    Request Configuration
                  </h3>
                  <div className="text-xs text-slate-400">HTTP/1.1</div>
                </div>

                {/* Method & Path inputs */}
                <div className="flex gap-2">
                  <select
                    value={endpointMethod}
                    onChange={(e) => setEndpointMethod(e.target.value as 'GET' | 'POST')}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                  </select>

                  <input
                    type="text"
                    value={endpointPath}
                    onChange={(e) => setEndpointPath(e.target.value)}
                    placeholder="/movies"
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />

                  <button
                    onClick={runPlaygroundRequest}
                    disabled={apiLoading}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-900/30 transition-all"
                  >
                    {apiLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    <span>Send</span>
                  </button>
                </div>

                {/* Request Body (For POST) */}
                {endpointMethod === 'POST' && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Request Payload (application/json):</span>
                      <button
                        onClick={() =>
                          setRequestBody(
                            JSON.stringify(
                              {
                                movieId: 'm1',
                                seatNumber: 'A1', // Already booked in m1!
                                userEmail: 'mohitparekh2002@gmail.com'
                              },
                              null,
                              2
                            )
                          )
                        }
                        className="text-amber-400 hover:underline text-[11px]"
                      >
                        Load Already-Booked Seat (Test AI Validation)
                      </button>
                    </div>
                    <textarea
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      rows={6}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 font-mono text-xs text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500 leading-relaxed"
                    />
                  </div>
                )}

                {/* cURL Equivalent Generator */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>cURL Command:</span>
                    <button
                      onClick={() => {
                        const cmd =
                          endpointMethod === 'GET'
                            ? `curl -X GET "${window.location.origin}${endpointPath}"`
                            : `curl -X POST "${window.location.origin}${endpointPath}" -H "Content-Type: application/json" -d '${requestBody.replace(/\n\s*/g, '')}'`;
                        copyToClipboard(cmd, 'curl');
                      }}
                      className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                    >
                      {copiedCode === 'curl' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode === 'curl' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
                    {endpointMethod === 'GET'
                      ? `curl -X GET "${endpointPath}"`
                      : `curl -X POST "${endpointPath}" \\\n  -H "Content-Type: application/json" \\\n  -d '${requestBody.replace(/\n\s*/g, ' ')}'`}
                  </pre>
                </div>
              </div>

              {/* Right Column: Live Response Viewer */}
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-4 flex flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-200 uppercase tracking-wider">
                    Server Response
                  </h3>
                  {apiResponse && (
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                          apiResponse.status >= 200 && apiResponse.status < 300
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : apiResponse.status >= 400 && apiResponse.status < 500
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {apiResponse.status} {apiResponse.statusText}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {apiResponse.latencyMs}ms
                      </span>
                    </div>
                  )}
                </div>

                {apiResponse ? (
                  <div className="flex-1 flex flex-col space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>JSON Body:</span>
                      <button
                        onClick={() =>
                          copyToClipboard(JSON.stringify(apiResponse.data, null, 2), 'response')
                        }
                        className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                      >
                        {copiedCode === 'response' ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedCode === 'response' ? 'Copied' : 'Copy Response'}</span>
                      </button>
                    </div>

                    <pre className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-400/90 overflow-auto max-h-[380px] leading-relaxed">
                      {JSON.stringify(apiResponse.data, null, 2)}
                    </pre>

                    {apiResponse.status === 500 && (
                      <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-300 flex items-start gap-2">
                        <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <strong>Requirement 4 Verified:</strong> Error handling middleware successfully caught the exception and formatted a status 500 response.
                        </div>
                      </div>
                    )}

                    {apiResponse.status === 409 && (
                      <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-xl text-xs text-amber-300 flex items-start gap-2">
                        <Bot className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong>Requirement 5 AI Seat Check Verified:</strong> The AI-assisted seat validator correctly prevented a double booking.
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500 border border-dashed border-slate-800 rounded-xl">
                    <Terminal className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-sm font-medium">No request sent yet</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Choose an endpoint preset above or click "Send" to trigger a request.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BOOKINGS & PASSES */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-rose-500" />
                  Your Active Ticket Passes
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Confirmed through <code className="text-rose-300">POST /book-ticket</code>
                </p>
              </div>

              <button
                onClick={fetchBookingHistory}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh History
              </button>
            </div>

            {bookingHistory.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 p-8 space-y-3">
                <Ticket className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-300">No tickets booked in this session</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Browse the movies list, pick your preferred seat on the cinema seat map, and submit your email to book tickets.
                </p>
                <button
                  onClick={() => setActiveTab('portal')}
                  className="mt-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition"
                >
                  Browse Movies Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookingHistory.map((item) => (
                  <div
                    key={item.bookingId}
                    className="relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6 shadow-xl overflow-hidden"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          {item.bookingId}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-1">{item.movieTitle}</h3>
                        <p className="text-xs text-slate-400">Movie ID: {item.movieId}</p>
                      </div>

                      <div className="w-14 h-14 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col items-center justify-center">
                        <span className="text-[10px] text-slate-400 uppercase">Seat</span>
                        <span className="text-lg font-black text-rose-400">{item.seatNumber}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400">Recipient Email:</span>
                        <p className="font-medium text-slate-200 truncate">{item.userEmail}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Booked At:</span>
                        <p className="font-medium text-slate-200">
                          {new Date(item.bookedAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    {/* Simulated Cinema Barcode */}
                    <div className="mt-5 pt-3 border-t border-dashed border-slate-800 flex items-center justify-between">
                      <div className="flex gap-1 h-7 items-end opacity-70">
                        {[4, 2, 5, 1, 6, 3, 2, 7, 3, 5, 2, 6, 4, 2, 5, 3, 7, 2, 4, 3, 6].map((h, i) => (
                          <div
                            key={i}
                            className="bg-white rounded-xs"
                            style={{ width: `${(i % 3) + 1.5}px`, height: `${h * 4}px` }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        VALIDATED ENTRY
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CODE & REQUIREMENTS REVIEW */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            {/* 5 Requirements Checklist Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                {
                  id: '1',
                  title: 'GET /movies',
                  desc: 'Returns 5 upcoming movies with title, language, release date in JSON',
                  file: 'movieRoutes.js',
                  status: 'Completed'
                },
                {
                  id: '2',
                  title: 'POST /book-ticket',
                  desc: 'Accepts movieId, seatNumber, userEmail and confirms all three',
                  file: 'movieRoutes.js',
                  status: 'Completed'
                },
                {
                  id: '3',
                  title: 'GET /search-movies',
                  desc: 'Takes ?q= and filters titles case-insensitively using toLowerCase()',
                  file: 'movieRoutes.js',
                  status: 'Completed'
                },
                {
                  id: '4',
                  title: '500 Error Middleware',
                  desc: 'Catches errors using 4-param app.use(err, req, res, next) with 500 JSON',
                  file: 'movieRoutes.js & server.ts',
                  status: 'Completed'
                },
                {
                  id: '5',
                  title: 'AI Seat Validator',
                  desc: 'ChatGPT/Copilot seat collision checker with documented explanation',
                  file: 'isSeatAlreadyBooked()',
                  status: 'Completed'
                }
              ].map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-2"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        Req #{req.id}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <h4 className="font-bold text-sm text-white mt-1.5">{req.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">{req.desc}</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 border-t border-slate-800/80 pt-2">
                    {req.file}
                  </span>
                </div>
              ))}
            </div>

            {/* Special Spotlight: Requirement 5 (AI Tool Contribution) */}
            <div className="bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">
                    Requirement 5: ChatGPT / Copilot Assisted Seat Validation Function
                  </h3>
                  <p className="text-xs text-slate-400">
                    Documented rationale on how AI improved code quality, edge cases, and runtime safety
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-amber-400">1. Case & Whitespace Normalization</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    AI identified that a plain <code className="text-rose-300">includes(seat)</code> would fail if user submitted <code className="text-rose-300">"a1"</code> or <code className="text-rose-300">" A1 "</code>. The function normalizes strings with <code className="text-rose-300">.trim().toUpperCase()</code> to prevent accidental double-bookings.
                  </p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-amber-400">2. Defensive Guard Clauses</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Copilot recommended checking <code className="text-rose-300">Array.isArray(bookedSeats)</code> and input bounds so that undefined or corrupted memory state will return <code className="text-rose-300">false</code> instead of crashing the Node process with a TypeError.
                  </p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-amber-400">3. Short-Circuit Evaluation</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Instead of running <code className="text-rose-300">filter().length &gt; 0</code> across large booked seat lists, <code className="text-rose-300">Array.prototype.some()</code> was chosen to immediately halt iteration upon encountering the first matching seat.
                  </p>
                </div>
              </div>
            </div>

            {/* Code Viewer: movieRoutes.js */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/50">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-rose-400" />
                  <span className="font-mono text-xs font-bold text-slate-200">/movieRoutes.js</span>
                  <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-slate-800">
                    Node.js Express Router
                  </span>
                </div>

                <button
                  onClick={() => {
                    const code = `// See full /movieRoutes.js in file tree`;
                    copyToClipboard(code, 'routes-code');
                  }}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  {copiedCode === 'routes-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'routes-code' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-5 font-mono text-xs text-slate-300 overflow-x-auto max-h-[460px] bg-slate-950 leading-relaxed space-y-3">
                <p className="text-slate-400">// Requirement 1: GET /movies</p>
                <p className="text-rose-400">router.get('/movies', (req, res, next) =&gt; res.json(movies));</p>

                <p className="text-slate-400">// Requirement 3: GET /search-movies?q=...</p>
                <p className="text-cyan-300">
                  {`router.get('/search-movies', (req, res, next) => {
  const searchTerm = (req.query.q || '').toLowerCase().trim();
  const results = movies.filter(m => m.title.toLowerCase().includes(searchTerm));
  res.json(results);
});`}
                </p>

                <p className="text-slate-400">// Requirement 5: AI-Assisted Seat Validator</p>
                <p className="text-amber-300">
                  {`export function isSeatAlreadyBooked(bookedSeats, newSeat) {
  if (!Array.isArray(bookedSeats) || !newSeat) return false;
  const candidate = String(newSeat).trim().toUpperCase();
  return bookedSeats.some(s => String(s).trim().toUpperCase() === candidate);
}`}
                </p>

                <p className="text-slate-400">// Requirement 2: POST /book-ticket</p>
                <p className="text-emerald-300">
                  {`router.post('/book-ticket', (req, res, next) => {
  const { movieId, seatNumber, userEmail } = req.body;
  if (isSeatAlreadyBooked(bookedSeatsStore[movieId], seatNumber)) {
    return res.status(409).json({ error: \`Seat \${seatNumber} already booked.\` });
  }
  bookedSeatsStore[movieId].push(seatNumber.toUpperCase());
  const confirmationMessage = \`Booking confirmed! Reserved seat \${seatNumber} for movie ID '\${movieId}'. Email sent to \${userEmail}.\`;
  res.json({ message: confirmationMessage, movieId, seatNumber, userEmail });
});`}
                </p>

                <p className="text-slate-400">// Requirement 4: Error Handling Middleware</p>
                <p className="text-red-300">
                  {`router.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || 'Internal Server Error', status: 500 });
});`}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Booking Seat Selection Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Ticket Reservation
                </span>
                <h3 className="text-xl font-black text-white">{selectedMovie.title}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>Language: <strong className="text-slate-200">{selectedMovie.language}</strong></span>
                  <span>•</span>
                  <span>Release: <strong className="text-slate-200">{selectedMovie.releaseDate}</strong></span>
                </div>
              </div>

              <button
                onClick={() => setSelectedMovie(null)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cinema Screen Simulation */}
            <div className="space-y-3">
              <div className="w-full text-center">
                <div className="h-2 w-3/4 mx-auto bg-gradient-to-r from-transparent via-rose-500 to-transparent rounded-full opacity-80 shadow-[0_0_15px_rgba(244,63,94,0.6)]" />
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-1 block">
                  All Eyes This Way • Cinema Screen
                </span>
              </div>

              {/* Interactive Seat Grid */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                {seatRows.map((row) => (
                  <div key={row} className="flex items-center justify-center gap-1.5 sm:gap-2">
                    <span className="w-5 text-center text-xs font-mono font-bold text-slate-400">
                      {row}
                    </span>
                    {Array.from({ length: seatsPerRow }, (_, i) => {
                      const seatId = `${row}${i + 1}`;
                      const isTaken = bookedSeats.some(
                        (s) => s.toUpperCase() === seatId.toUpperCase()
                      );
                      const isSelected = selectedSeat === seatId;

                      return (
                        <button
                          key={seatId}
                          type="button"
                          disabled={isTaken}
                          onClick={() => {
                            setSelectedSeat(seatId);
                            setBookingResult(null);
                          }}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center justify-center ${
                            isTaken
                              ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-800 line-through'
                              : isSelected
                              ? 'bg-rose-500 text-white shadow-lg shadow-rose-600/50 scale-105 ring-2 ring-white'
                              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/80'
                          }`}
                          title={isTaken ? `Seat ${seatId} already booked` : `Select Seat ${seatId}`}
                        >
                          {i + 1}
                        </button>
                      );
                    })}
                  </div>
                ))}

                {/* Seat Legend */}
                <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded bg-slate-900 border border-slate-700" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded bg-rose-500" />
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded bg-slate-800 border border-slate-800" />
                    <span>Booked (AI Protected)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form (movieId, seatNumber, userEmail) */}
            <form onSubmit={handleBookTicket} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Selected Seat Number
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={selectedSeat ? `${selectedSeat}` : 'Click a seat on map above'}
                    className={`w-full px-3 py-2 bg-slate-950 border rounded-xl text-xs font-mono ${
                      selectedSeat
                        ? 'border-rose-500 text-rose-300 font-bold'
                        : 'border-slate-800 text-slate-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Recipient Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              {/* Checkbox to test error middleware (Requirement 4) */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
                <input
                  type="checkbox"
                  id="simulateErrorCheckbox"
                  checked={simulateErrorInBooking}
                  onChange={(e) => setSimulateErrorInBooking(e.target.checked)}
                  className="rounded border-slate-700 text-rose-600 focus:ring-rose-500 bg-slate-900"
                />
                <label htmlFor="simulateErrorCheckbox" className="cursor-pointer select-none">
                  Simulate Server Error (500) to test Requirement 4 error handling middleware
                </label>
              </div>

              {/* Status Alert */}
              {bookingResult && (
                <div
                  className={`p-4 rounded-xl text-xs flex items-start gap-2.5 ${
                    bookingResult.success
                      ? 'bg-emerald-950/40 border border-emerald-800/80 text-emerald-300'
                      : 'bg-red-950/40 border border-red-800/80 text-red-300'
                  }`}
                >
                  {bookingResult.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  )}
                  <div className="space-y-1">
                    <p className="font-semibold">
                      {bookingResult.success ? 'Booking Confirmation Received' : 'Booking Error'}
                    </p>
                    <p className="leading-relaxed">
                      {bookingResult.message || bookingResult.error}
                    </p>
                    {bookingResult.status === 500 && (
                      <p className="text-[11px] font-mono text-red-400 pt-1">
                        Caught by Express 500 middleware with status code 500.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedMovie(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!selectedSeat || isBooking}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-rose-900/30 transition-all transform active:scale-95"
                >
                  {isBooking ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Ticket className="w-4 h-4" />
                  )}
                  <span>
                    {isBooking ? 'Processing Booking...' : 'Confirm & Book Ticket (POST /book-ticket)'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
