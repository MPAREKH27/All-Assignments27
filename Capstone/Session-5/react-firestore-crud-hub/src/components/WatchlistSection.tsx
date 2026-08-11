import React, { useState, useEffect } from 'react';
import { Film, CheckCircle, Clock, Plus, Clapperboard, Filter, Check, Eye } from 'lucide-react';
import { WatchlistItem } from '../types';
import { fetchWatchlistFromFirestore, addWatchlistItemToFirestore, updateWatchlistStatusInFirestore } from '../lib/firebase';

export const WatchlistSection: React.FC = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<'all' | 'watched' | 'not watched'>('all');

  // Form state
  const [movieName, setMovieName] = useState<string>('');
  const [genre, setGenre] = useState<string>('Sci-Fi / Drama');
  const [releaseYear, setReleaseYear] = useState<number>(2025);
  const [initialStatus, setInitialStatus] = useState<'watched' | 'not watched'>('not watched');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const loadWatchlist = async () => {
    setLoading(true);
    const res = await fetchWatchlistFromFirestore();
    setWatchlist(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  const handleToggleStatus = async (item: WatchlistItem) => {
    const nextStatus = item.status === 'watched' ? 'not watched' : 'watched';
    // Optimistic UI update
    setWatchlist(prev => prev.map(m => m.id === item.id ? { ...m, status: nextStatus } : m));

    // Update in Firestore
    await updateWatchlistStatusInFirestore(item.id, nextStatus);
  };

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!movieName.trim()) return;

    setSubmitting(true);
    const newItem = {
      movieName,
      genre: genre || 'Action / Drama',
      releaseYear: releaseYear || 2025,
      status: initialStatus
    };

    const res = await addWatchlistItemToFirestore(newItem);
    setSubmitting(false);

    if (!res.error) {
      setMovieName('');
      setShowAddForm(false);
      await loadWatchlist();
    }
  };

  const filteredWatchlist = watchlist.filter(item => {
    if (filter === 'watched') return item.status === 'watched';
    if (filter === 'not watched') return item.status === 'not watched';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-500/20 text-red-400 rounded-xl border border-red-500/30">
            <Film className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight">BookMyShow Watchlist</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
                Firestore 'watchlists'
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-0.5">
              Req 3: Fetch movie watchlist items from Firestore 'watchlists' and display status (watched / not watched).
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-600/20 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Add Movie
        </button>
      </div>

      {/* Add Movie Form Collapse */}
      {showAddForm && (
        <form onSubmit={handleAddMovie} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-white space-y-4 shadow-xl">
          <h3 className="font-bold text-lg flex items-center gap-2 text-red-400 border-b border-slate-800 pb-2">
            <Clapperboard className="w-5 h-5" />
            Add Movie to Firestore 'watchlists'
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Movie Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Avatar 3 or Oppenheimer"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Genre
              </label>
              <input
                type="text"
                placeholder="e.g., Sci-Fi, Action, Thriller"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Initial Status
              </label>
              <select
                value={initialStatus}
                onChange={(e) => setInitialStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-red-500 text-sm"
              >
                <option value="not watched">Not Watched</option>
                <option value="watched">Watched</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-red-600/20"
            >
              {submitting ? 'Saving...' : 'Add Watchlist Doc'}
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-400 uppercase">Filter Status:</span>
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                filter === 'all'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({watchlist.length})
            </button>
            <button
              onClick={() => setFilter('watched')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                filter === 'watched'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Watched ({watchlist.filter(w => w.status === 'watched').length})
            </button>
            <button
              onClick={() => setFilter('not watched')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                filter === 'not watched'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Not Watched ({watchlist.filter(w => w.status === 'not watched').length})
            </button>
          </div>
        </div>

        <span className="text-xs text-slate-500 font-mono">
          Collection: 'watchlists'
        </span>
      </div>

      {/* BookMyShow Movie Watchlist Cards */}
      {loading ? (
        <div className="p-12 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400">
          <div className="animate-spin w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full mx-auto mb-2" />
          Fetching 'watchlists' collection from Firestore...
        </div>
      ) : filteredWatchlist.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400">
          No watchlist items match the current filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredWatchlist.map((item) => {
            const isWatched = item.status === 'watched';
            return (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 text-white transition-all shadow-md flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={`w-12 h-16 rounded-xl flex flex-col items-center justify-center shrink-0 border ${
                      isWatched
                        ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                        : 'bg-amber-950/40 border-amber-500/30 text-amber-400'
                    }`}
                  >
                    <Clapperboard className="w-6 h-6" />
                    <span className="text-[10px] font-bold mt-1 uppercase">BMS</span>
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-100 text-lg truncate">
                      {item.movieName}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {item.genre || 'Cinema'} {item.releaseYear ? `• ${item.releaseYear}` : ''}
                    </p>

                    {/* Status Pill Badge (Requirement 3: Showing movie name and status) */}
                    <div className="mt-2 inline-flex items-center gap-1.5">
                      {isWatched ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Watched
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                          <Clock className="w-3.5 h-3.5" />
                          Not Watched
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Toggle Button */}
                <button
                  onClick={() => handleToggleStatus(item)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border flex items-center gap-1.5 ${
                    isWatched
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                  }`}
                  title="Toggle status in Firestore (updateDoc)"
                >
                  {isWatched ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      Mark Unwatched
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Mark Watched
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
