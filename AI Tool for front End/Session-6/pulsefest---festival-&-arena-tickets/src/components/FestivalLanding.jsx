import React, { useState, useEffect } from 'react';
import { FESTIVALS_DATA, FESTIVAL_CATEGORIES, CITIES } from '../data/festivals';
import { Festival } from '../types';
import { TicketBookingModal } from './TicketBookingModal';
import { WireframeModal } from './WireframeModal';
import {
  Ticket,
  Search,
  MapPin,
  Calendar,
  Zap,
  Flame,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Music,
  Users,
  Radio,
  FileText,
  Layout,
  Star,
  Trophy,
  SlidersHorizontal,
  Info
} from 'lucide-react';

export default function FestivalLanding() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Festivals');
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFestivalForBooking, setActiveFestivalForBooking] = useState<Festival | null>(null);
  const [showWireframeModal, setShowWireframeModal] = useState<boolean>(false);
  const [showContentInfoModal, setShowContentInfoModal] = useState<boolean>(false);

  // Live Countdown Timer state till night festival kickoff
  const [timeLeft, setTimeLeft] = useState({
    days: 48,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        return { ...prev, seconds: 59, minutes: prev.minutes > 0 ? prev.minutes - 1 : 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter festivals based on category, city, and search
  const filteredFestivals = FESTIVALS_DATA.filter(fest => {
    const matchesCategory = selectedCategory === 'All Festivals' || fest.category === selectedCategory;
    const matchesCity = selectedCity === 'All Cities' || fest.city === selectedCity;
    const matchesSearch =
      fest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fest.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fest.featuredHeadliners.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesCity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* 1. TOP ANNOUNCEMENT TICKER (IPL MATCHDAY HYPE BANNER) */}
      <div className="bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 text-black py-2 px-4 text-xs font-black tracking-widest uppercase flex items-center justify-between overflow-hidden shadow-md">
        <div className="flex items-center gap-3 animate-pulse whitespace-nowrap">
          <span className="bg-black text-amber-400 px-2 py-0.5 rounded text-[10px]">LIVE ARENA HYPE</span>
          <span>⚡ SUNBURN STADIUM ARENA MUMBAI: 94% TICKETS SOLD OUT!</span>
          <span>•</span>
          <span>🔥 ARIJIT SINGH DELHI NIGHT: VIP SKYBOX PASSES LIMITED</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px] shrink-0 font-bold">
          <button
            onClick={() => setShowWireframeModal(true)}
            className="flex items-center gap-1 bg-black/20 hover:bg-black/30 text-black px-2.5 py-0.5 rounded transition-colors cursor-pointer"
          >
            <Layout className="w-3.5 h-3.5" /> Wireframe Spec (Figma/Uizard AI)
          </button>
          <button
            onClick={() => setShowContentInfoModal(true)}
            className="flex items-center gap-1 bg-black/20 hover:bg-black/30 text-black px-2.5 py-0.5 rounded transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" /> View landing-content.txt
          </button>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION (BookMyShow + IPL Vibe Navbar) */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Vibe Badge */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-600 flex items-center justify-center text-black font-black text-xl shadow-lg shadow-amber-500/20 transform -rotate-3">
              <Zap className="w-7 h-7 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white uppercase italic">
                  PULSE<span className="text-amber-400">FEST</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-extrabold bg-gradient-to-r from-red-500 to-amber-500 text-black px-2 py-0.5 rounded-full uppercase">
                  IPL Matchday Arena
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium hidden sm:block">
                Powered by BookMyShow Ticket Network
              </p>
            </div>
          </div>

          {/* Location Selector (BookMyShow Style) */}
          <div className="hidden md:flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3.5 py-2 rounded-xl">
            <MapPin className="w-4 h-4 text-amber-400" />
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className="bg-transparent text-sm font-bold text-zinc-200 focus:outline-none cursor-pointer"
            >
              {CITIES.map(city => (
                <option key={city} value={city} className="bg-zinc-900 text-white">
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Header Search Bar */}
          <div className="flex-1 max-w-xs relative hidden lg:block">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search DJ, Artist, City or Venue..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-amber-500/50 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none transition-all"
            />
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowWireframeModal(true)}
              className="flex md:hidden p-2 text-amber-400 bg-amber-400/10 rounded-xl border border-amber-400/20 cursor-pointer"
              title="View Wireframe"
            >
              <Layout className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveFestivalForBooking(FESTIVALS_DATA[0])}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Passes</span>
            </button>
          </div>

        </div>
      </header>

      {/* 3. HERO SECTION (Nightlife Music Festival Theme using hero-image.png & ChatGPT content) */}
      <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950 py-12 lg:py-20">
        
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-image.png"
            alt="Nightlife Music Festival Crowd with Stage Lights"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35 filter contrast-125 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>

        {/* Hero Grid Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left 7 Columns: ChatGPT Headline & Description + Live Countdown */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Matchday Hype Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-amber-300 backdrop-blur-md">
                <Flame className="w-4 h-4 text-red-500 animate-bounce" />
                <span>BOOKMYSHOW x IPL MUSIC ARENA 2026</span>
              </div>

              {/* Headline (ChatGPT Content from landing-content.txt) */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none uppercase italic drop-shadow-lg">
                Feel the Arena Surge — <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 bg-clip-text text-transparent">Live Music Meets IPL Matchday Energy!</span>
              </h1>

              {/* Short Description (<30 words ChatGPT Content from landing-content.txt) */}
              <p className="text-base sm:text-lg text-zinc-300 font-medium max-w-xl leading-relaxed">
                Book exclusive festival passes, VIP lounge access, and stadium headliner seats instantly with real-time seat maps and electrifying night stage vibes.
              </p>

              {/* Countdown Timer Widget */}
              <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-4 backdrop-blur-md max-w-md">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> SUNBURN STADIUM ARENA KICKOFF COUNTDOWN
                </p>
                <div className="grid grid-cols-4 gap-3 text-center">
                  <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                    <span className="block text-2xl font-black text-amber-400">{timeLeft.days}</span>
                    <span className="text-[10px] text-zinc-400 uppercase font-bold">DAYS</span>
                  </div>
                  <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                    <span className="block text-2xl font-black text-white">{timeLeft.hours}</span>
                    <span className="text-[10px] text-zinc-400 uppercase font-bold">HOURS</span>
                  </div>
                  <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                    <span className="block text-2xl font-black text-white">{timeLeft.minutes}</span>
                    <span className="text-[10px] text-zinc-400 uppercase font-bold">MINS</span>
                  </div>
                  <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                    <span className="block text-2xl font-black text-red-500 animate-pulse">{timeLeft.seconds}</span>
                    <span className="text-[10px] text-zinc-400 uppercase font-bold">SECS</span>
                  </div>
                </div>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => setActiveFestivalForBooking(FESTIVALS_DATA[0])}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-black font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Ticket className="w-5 h-5" />
                  <span>EXPLORE STADIUM SEATS & PASSES</span>
                </button>

                <button
                  onClick={() => setShowWireframeModal(true)}
                  className="px-6 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Layout className="w-4 h-4 text-cyan-400" />
                  <span>VIEW WIREFRAME SPEC</span>
                </button>
              </div>

              {/* Key Highlights Bar */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400 pt-4">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Genuine Ticket Guarantee
                </span>
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Direct QR Gate Entry
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" /> 250,000+ Fans Attending
                </span>
              </div>

            </div>

            {/* Right 5 Columns: Interactive Quick Booking Card */}
            <div className="lg:col-span-5">
              <div className="bg-zinc-900/90 border border-amber-500/40 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-red-500/20 text-red-400 px-3 py-1 rounded-full border border-red-500/30 flex items-center gap-1.5">
                    <Flame className="w-3 h-3" /> FEATURED MATCHDAY SHOW
                  </span>
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-md">
                    OCT 24-26 • MUMBAI
                  </span>
                </div>

                {/* Festival Hero Card Graphic */}
                <div className="relative h-48 rounded-2xl overflow-hidden mb-5 border border-zinc-800">
                  <img
                    src="/hero-image.png"
                    alt="Sunburn Arena Stage"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-black text-white italic">SUNBURN STADIUM ARENA</h3>
                      <p className="text-xs text-zinc-300 font-medium">DY Patil Stadium, Navi Mumbai</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-zinc-400 block uppercase font-bold">STARTING AT</span>
                      <span className="text-xl font-black text-amber-400">₹1,999</span>
                    </div>
                  </div>
                </div>

                {/* Headliners Tags */}
                <div className="mb-5 space-y-2">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">FEATURED HEADLINERS</p>
                  <div className="flex flex-wrap gap-2">
                    {['DJ Snake', 'Martin Garrix', 'Nucleya', 'KSHMR'].map(artist => (
                      <span key={artist} className="bg-zinc-950 border border-zinc-800 text-zinc-200 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                        <Music className="w-3 h-3 text-amber-400" /> {artist}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stadium Roar Meter */}
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 mb-5">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-bold text-zinc-300 flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" /> IPL Stadium Roar Meter
                    </span>
                    <span className="font-black text-amber-400">98% HYPE INTENSITY</span>
                  </div>
                  <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden p-0.5">
                    <div className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 rounded-full w-[98%] animate-pulse" />
                  </div>
                </div>

                {/* Book Action */}
                <button
                  onClick={() => setActiveFestivalForBooking(FESTIVALS_DATA[0])}
                  className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>SELECT SEATS & BOOK PASSES</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CATEGORY FILTERS & SEARCH BAR (BookMyShow Experience) */}
      <section className="py-8 bg-zinc-900/40 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Pill Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
              {FESTIVAL_CATEGORIES.map(category => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Mobile Search & City Filter Stack */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search festivals..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>

              <div className="md:hidden">
                <select
                  value={selectedCity}
                  onChange={e => setSelectedCity(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 text-xs font-bold text-amber-400 py-2 px-3 rounded-xl focus:outline-none"
                >
                  {CITIES.map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. TRENDING FESTIVALS & ARENA SHOWS GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              ⚡ LIVE STADIUM ARENAS
            </span>
            <h2 className="text-3xl font-black text-white mt-2 uppercase italic">
              Trending Music Festivals ({filteredFestivals.length})
            </h2>
          </div>
          <p className="text-xs text-zinc-400 hidden sm:block font-medium">
            BookMyShow Verified • Instant Seat Passes
          </p>
        </div>

        {/* Festival Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFestivals.map(festival => (
            <div
              key={festival.id}
              className="bg-zinc-900/60 border border-zinc-800/90 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Image & Vibe Tag Header */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={festival.heroImage}
                    alt={festival.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  
                  {/* Tagline Badge */}
                  <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-zinc-800 text-[10px] font-bold text-amber-400">
                    {festival.iplMatchVibeTag}
                  </div>

                  {/* Roar Percentage */}
                  <div className="absolute bottom-3 right-3 bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-current" /> {festival.roarLevel}% HYPE
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                      {festival.category} • {festival.city}
                    </span>
                    <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors uppercase italic">
                      {festival.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{festival.tagline}</p>
                  </div>

                  {/* Venue & Date */}
                  <div className="space-y-1.5 text-xs text-zinc-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="truncate">{festival.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{festival.date}</span>
                    </div>
                  </div>

                  {/* Headliners List */}
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">HEADLINERS</p>
                    <div className="flex flex-wrap gap-1.5">
                      {festival.featuredHeadliners.map(artist => (
                        <span key={artist} className="bg-zinc-950 text-zinc-300 px-2 py-0.5 rounded text-[11px] border border-zinc-800">
                          {artist}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Action Footer */}
              <div className="p-6 pt-0 border-t border-zinc-800/50 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block">STARTING FROM</span>
                  <span className="text-lg font-black text-amber-400">₹{festival.startingPrice.toLocaleString('en-IN')}</span>
                </div>
                <button
                  onClick={() => setActiveFestivalForBooking(festival)}
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-amber-400 hover:text-black text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>BOOK SEATS</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 6. IPL STADIUM MATCHDAY VIBE EXPERIENCE HIGHLIGHTS */}
      <section className="py-16 bg-zinc-900/30 border-t border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              ⚡ STADIUM EXPERIENCE
            </span>
            <h2 className="text-3xl font-black text-white mt-3 uppercase italic">
              Why PulseFest Beats Standard Concerts
            </h2>
            <p className="text-sm text-zinc-400 mt-2">
              Combining BookMyShow ticketing convenience with high-voltage IPL stadium matchday roar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Pyrotechnics & Flame Cannons</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Stadium-grade confetti bursts, laser light grids, and synced LED wristband pyros for every drop.
              </p>
            </div>

            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">IPL Fan Pit Front Stage</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Dedicated front-row fan enclosure right up against the DJ deck with exclusive merch wristbands.
              </p>
            </div>

            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Verified Instant QR Gate Pass</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Zero waiting at turnstiles. Instant QR code delivered to WhatsApp and Apple/Google Wallet.
              </p>
            </div>

            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
                <Star className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">VIP Skybox Corporate Pavilion</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Air-conditioned luxury suites with unlimited gourmet buffet, premium drinks, and artist lounge passes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-12 text-zinc-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-zinc-800/80 pb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center text-black font-black text-lg">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-xl font-black text-white italic uppercase">PULSEFEST</span>
                <p className="text-[11px] text-zinc-400">BookMyShow x IPL Music Festival Network</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-zinc-300 font-medium">
              <button onClick={() => setShowWireframeModal(true)} className="hover:text-amber-400 transition-colors cursor-pointer">
                Wireframe Spec (festival-landing-wireframe.png)
              </button>
              <button onClick={() => setShowContentInfoModal(true)} className="hover:text-amber-400 transition-colors cursor-pointer">
                ChatGPT Content (landing-content.txt)
              </button>
              <a href="#festivals" className="hover:text-amber-400 transition-colors">
                Stadium Shows
              </a>
              <a href="#seats" className="hover:text-amber-400 transition-colors">
                VIP Skybox
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-zinc-400 gap-4">
            <p>© 2026 PulseFest Music Arena Ticketing Platform. Inspired by BookMyShow & IPL stadium energy.</p>
            <p className="flex items-center gap-2">
              <span>All assets exported & generated:</span>
              <span className="text-amber-400 font-semibold">hero-image.png</span> •
              <span className="text-cyan-400 font-semibold">festival-landing-wireframe.png</span>
            </p>
          </div>
        </div>
      </footer>

      {/* TICKET BOOKING MODAL */}
      {activeFestivalForBooking && (
        <TicketBookingModal
          festival={activeFestivalForBooking}
          onClose={() => setActiveFestivalForBooking(null)}
        />
      )}

      {/* WIREFRAME MODAL */}
      {showWireframeModal && (
        <WireframeModal onClose={() => setShowWireframeModal(false)} />
      )}

      {/* CONTENT INFO MODAL (landing-content.txt inspector) */}
      {showContentInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 p-6 rounded-2xl space-y-4 text-zinc-100">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" /> landing-content.txt (ChatGPT Output)
              </h3>
              <button onClick={() => setShowContentInfoModal(false)} className="text-zinc-400 hover:text-white cursor-pointer">
                ✕
              </button>
            </div>

            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-3 font-mono text-xs">
              <div>
                <span className="text-amber-400 font-bold block">HEADLINE:</span>
                <p className="text-white mt-1">Feel the Arena Surge — Live Music Meets IPL Matchday Energy!</p>
              </div>
              <div className="pt-2 border-t border-zinc-800">
                <span className="text-amber-400 font-bold block">SHORT DESCRIPTION (&lt;30 words):</span>
                <p className="text-zinc-300 mt-1">
                  Book exclusive festival passes, VIP lounge access, and stadium headliner seats instantly with real-time seat maps and electrifying night stage vibes.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowContentInfoModal(false)}
              className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
