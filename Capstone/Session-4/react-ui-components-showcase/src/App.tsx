import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PlaylistCard } from './components/PlaylistCard';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { DynamicForm } from './components/DynamicForm';
import { SPOTIFY_PLAYLISTS, FLIPKART_SOCIAL_LINKS, IPL_FANTASY_FIELD_DEFINITIONS } from './data';
import { Playlist } from './types';
import {
  Ticket,
  Play,
  Pause,
  Music,
  Code2,
  Sparkles,
  Utensils,
  ShoppingBag,
  Trophy,
  Check,
  ChevronRight,
  Layers,
  Info,
} from 'lucide-react';

export default function App() {
  // 1. Zomato Navbar State (Controls active link prop)
  const [activeNavTab, setActiveNavTab] = useState<string>('Home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartCount, setCartCount] = useState<number>(3);

  // 2. Spotify Playlist Playing State
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // 4. Modal State (Book Ticket)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Inspector mode toggle to showcase prop usage
  const [showPropInspector, setShowPropInspector] = useState<boolean>(false);

  const handlePlayPlaylist = (playlist: Playlist) => {
    if (currentPlaylist?.id === playlist.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentPlaylist(playlist);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* 1. Component #1: Zomato Style Navbar */}
      <div className="sticky top-0 z-40">
        <Navbar
          activeLink={activeNavTab}
          onLinkChange={(linkId) => setActiveNavTab(linkId)}
          cartCount={cartCount}
          location="Connaught Place, New Delhi"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Top Banner Notice & Mode Toggle */}
      <div className="bg-gradient-to-r from-red-900/60 via-slate-900 to-indigo-950 border-b border-slate-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">
              Active Nav Prop:{' '}
              <span className="px-2 py-0.5 bg-red-500/20 text-red-400 font-bold rounded-md border border-red-500/30">
                "{activeNavTab}"
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPropInspector(!showPropInspector)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 focus:outline-none ${
                showPropInspector
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              {showPropInspector ? 'Hide Prop Inspector' : 'Show Component Props'}
            </button>

            <button
              id="open-ticket-modal-nav-btn"
              onClick={() => setIsModalOpen(true)}
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg shadow-md transition-all flex items-center gap-1.5"
            >
              <Ticket className="w-3.5 h-3.5" />
              Book Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Main Showcase Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Component #1 Zomato Interactive Context Banner */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs font-bold">
                <Utensils className="w-3.5 h-3.5" /> Component #1: Zomato Food Delivery Navbar
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Active Page View:{' '}
                <span className="text-red-500 underline underline-offset-4">{activeNavTab}</span>
              </h1>
              <p className="text-slate-400 text-sm">
                The Navbar component accepts <code className="text-red-400 bg-slate-950 px-1.5 py-0.5 rounded font-mono text-xs">activeLink</code> and <code className="text-red-400 bg-slate-950 px-1.5 py-0.5 rounded font-mono text-xs">onLinkChange</code> props. Click any item below or in the top header to change the highlighted state dynamically.
              </p>
            </div>

            {/* Quick Link Buttons */}
            <div className="flex flex-wrap gap-2">
              {['Home', 'Orders', 'Cart', 'Profile'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveNavTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeNavTab === tab
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 ring-2 ring-red-400'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Component Prop Code Inspector Box */}
          {showPropInspector && (
            <div className="mt-6 pt-6 border-t border-slate-800/80 animate-in fade-in duration-200">
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-xs space-y-2 overflow-x-auto text-emerald-400">
                <p className="text-slate-500 font-sans">// 1. Zomato Navbar Usage with Props:</p>
                <p>{`<Navbar`}</p>
                <p>{`  activeLink="${activeNavTab}"`}</p>
                <p>{`  onLinkChange={(linkId) => setActiveNavTab(linkId)}`}</p>
                <p>{`  cartCount={${cartCount}}`}</p>
                <p>{`  location="Connaught Place, New Delhi"`}</p>
                <p>{`/>`}</p>
              </div>
            </div>
          )}
        </section>

        {/* Component #2: Spotify Playlist Cards */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold mb-2">
                <Music className="w-3.5 h-3.5" /> Component #2: Spotify Music Playlist Cards
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Featured Playlists (Rendered via Props)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Renders 3 distinct playlists by passing custom data objects as props to the reusable <code className="text-emerald-400 bg-slate-900 px-1 py-0.5 rounded">PlaylistCard</code> component.
              </p>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>3 Playlists loaded via props</span>
            </div>
          </div>

          {/* 3 Spotify Playlist Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SPOTIFY_PLAYLISTS.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                onPlay={handlePlayPlaylist}
                isPlaying={currentPlaylist?.id === playlist.id && isPlaying}
              />
            ))}
          </div>

          {/* Code Inspector Box for Spotify Playlists */}
          {showPropInspector && (
            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto space-y-1">
              <p className="text-slate-500 font-sans">// 2. Spotify Playlist Card Usage mapping props:</p>
              <p>{`{SPOTIFY_PLAYLISTS.map((playlist) => (`}</p>
              <p>{`  <PlaylistCard`}</p>
              <p>{`    key={playlist.id}`}</p>
              <p>{`    playlist={playlist}`}</p>
              <p>{`    onPlay={(p) => playMusic(p)}`}</p>
              <p>{`  />`}</p>
              <p>{`))}`}</p>
            </div>
          )}
        </section>

        {/* Component #4: BookMyShow Modal Trigger Banner */}
        <section className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-pink-950/80 border border-rose-900/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 border border-rose-500/30 rounded-full text-rose-300 text-xs font-bold">
                <Ticket className="w-3.5 h-3.5" /> Component #4: BookMyShow Reusable Modal
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Book Movie & Event Tickets
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                A reusable Modal component that pops up when triggered, closes on outside backdrop click or close button, and manages visibility using local state passed via close function props.
              </p>
            </div>

            <button
              id="open-ticket-modal-cta-btn"
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-rose-600/30 hover:scale-105 transition-all flex items-center gap-2.5 shrink-0"
            >
              <Ticket className="w-5 h-5" />
              Book Ticket Now
            </button>
          </div>

          {/* Code Inspector Box for Modal */}
          {showPropInspector && (
            <div className="mt-6 pt-6 border-t border-slate-800 bg-slate-950 rounded-2xl p-4 font-mono text-xs text-rose-400 overflow-x-auto">
              <p className="text-slate-500 font-sans">// 4. Reusable Modal State & Props Pattern:</p>
              <p>{`const [isOpen, setIsOpen] = useState(false);`}</p>
              <p>{`<Modal`}</p>
              <p>{`  isOpen={isOpen}`}</p>
              <p>{`  onClose={() => setIsOpen(false)}`}</p>
              <p>{`  title="Book Movie & Event Tickets"`}</p>
              <p>{`/>`}</p>
            </div>
          )}
        </section>

        {/* Component #5: Generic Dynamic Form (IPL Fantasy League) */}
        <section className="space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold">
              <Trophy className="w-3.5 h-3.5" /> Component #5: Generic Dynamic Form Scaffold
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Dynamic IPL Fantasy League 'Sign Up' Form
            </h2>
            <p className="text-xs text-slate-400">
              Passes an array of field definitions (<code className="text-indigo-400 bg-slate-900 px-1 py-0.5 rounded">IPL_FANTASY_FIELD_DEFINITIONS</code>) into a generic <code className="text-indigo-400 bg-slate-900 px-1 py-0.5 rounded">DynamicForm</code> component that renders inputs dynamically.
            </p>
          </div>

          <DynamicForm
            fields={IPL_FANTASY_FIELD_DEFINITIONS}
            onSubmit={(data) => {
              console.log('Submitted Fantasy Sign Up:', data);
            }}
          />

          {/* Code Inspector Box for Dynamic Form */}
          {showPropInspector && (
            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-xs text-indigo-400 overflow-x-auto space-y-1">
              <p className="text-slate-500 font-sans">// 5. Generic Dynamic Form Scaffold Props:</p>
              <p>{`<DynamicForm`}</p>
              <p>{`  fields={IPL_FANTASY_FIELD_DEFINITIONS}`}</p>
              <p>{`  onSubmit={(formData) => handleSignUp(formData)}`}</p>
              <p>{`  title="IPL Fantasy League - Sign Up"`}</p>
              <p>{`/>`}</p>
            </div>
          )}
        </section>

      </main>

      {/* Floating Audio Player Bar if a playlist is selected */}
      {currentPlaylist && (
        <div className="sticky bottom-0 z-30 bg-slate-900/95 border-t border-emerald-500/30 backdrop-blur-md px-4 py-3 shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={currentPlaylist.coverUrl}
                alt={currentPlaylist.title}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-700"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{currentPlaylist.title}</p>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <Music className="w-3 h-3" /> Playing 1 of {currentPlaylist.songCount} songs • By {currentPlaylist.creator}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-slate-950 translate-x-0.5" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Component #3: Flipkart Shopping App Footer (Accepts socialLinks prop array) */}
      <Footer
        socialLinks={FLIPKART_SOCIAL_LINKS}
        companyName="Flipkart Internet Private Limited"
        supportPhone="1800-208-9898"
      />

      {/* Reusable Modal Component Target (Component #4) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Book Movie & Event Tickets"
      />
    </div>
  );
}
