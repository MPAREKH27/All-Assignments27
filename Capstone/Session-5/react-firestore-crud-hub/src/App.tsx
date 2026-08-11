import React, { useState } from 'react';
import { PlaylistsSection } from './components/PlaylistsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { WatchlistSection } from './components/WatchlistSection';
import { ChatGPTCodeSection } from './components/ChatGPTCodeSection';
import {
  Music,
  Utensils,
  Film,
  Bot,
  Database,
  Layers,
  Sparkles,
  CheckCircle2,
  ListFilter,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'playlists' | 'reviews' | 'watchlist' | 'chatgpt'>('all');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Banner / Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Logo and title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-amber-500 to-indigo-600 p-0.5 shadow-lg shadow-emerald-500/10">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Database className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  Firestore App Suite
                </h1>
                <p className="text-xs text-slate-400">
                  Playlists • Restaurant Reviews • Movie Watchlist • ChatGPT Refactoring
                </p>
              </div>
            </div>

            {/* Quick Status Badges */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Firestore v11 Active
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                3 Collections Ready
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800/80 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                activeTab === 'all'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              All Apps Dashboard
            </button>

            <button
              onClick={() => setActiveTab('playlists')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                activeTab === 'playlists'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Music className="w-4 h-4 text-emerald-400" />
              1. Spotify Playlists
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                activeTab === 'reviews'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Utensils className="w-4 h-4 text-amber-400" />
              2 & 4. Reviews & Edit
            </button>

            <button
              onClick={() => setActiveTab('watchlist')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                activeTab === 'watchlist'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Film className="w-4 h-4 text-red-400" />
              3. BookMyShow Watchlist
            </button>

            <button
              onClick={() => setActiveTab('chatgpt')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                activeTab === 'chatgpt'
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Bot className="w-4 h-4 text-indigo-400" />
              5. ChatGPT Refactored Code
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* TAB 1: ALL APPS DASHBOARD */}
        {activeTab === 'all' && (
          <div className="space-y-12">
            {/* Overview Cards Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 max-w-3xl space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  All 5 Firestore Requirements Implemented
                </span>
                <h2 className="text-3xl font-black text-white tracking-tight">
                  Complete Firestore Multi-App Suite
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Manage Spotify music playlists with song arrays, publish & edit restaurant reviews with <code className="text-amber-400 bg-slate-950 px-1 py-0.5 rounded font-mono">addDoc()</code> and <code className="text-amber-400 bg-slate-950 px-1 py-0.5 rounded font-mono">updateDoc()</code>, track movies like BookMyShow, and test ChatGPT refactored async/await API calls.
                </p>
              </div>
            </div>

            {/* Section 1: Playlists */}
            <section id="playlists">
              <PlaylistsSection />
            </section>

            <hr className="border-slate-800/80 my-8" />

            {/* Section 2: Restaurant Reviews & Edit */}
            <section id="reviews">
              <ReviewsSection />
            </section>

            <hr className="border-slate-800/80 my-8" />

            {/* Section 3: Movie Watchlist */}
            <section id="watchlist">
              <WatchlistSection />
            </section>

            <hr className="border-slate-800/80 my-8" />

            {/* Section 4: ChatGPT Code Refactoring */}
            <section id="chatgpt">
              <ChatGPTCodeSection />
            </section>
          </div>
        )}

        {/* INDIVIDUAL TABS */}
        {activeTab === 'playlists' && <PlaylistsSection />}
        {activeTab === 'reviews' && <ReviewsSection />}
        {activeTab === 'watchlist' && <WatchlistSection />}
        {activeTab === 'chatgpt' && <ChatGPTCodeSection />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>Firestore Multi-App Suite • React + Firebase Firestore SDK</p>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400">playlists</span>
            <span>•</span>
            <span className="text-amber-400">restaurant_reviews</span>
            <span>•</span>
            <span className="text-red-400">watchlists</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
