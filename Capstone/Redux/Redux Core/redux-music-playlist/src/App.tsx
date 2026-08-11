import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { SpotifyHeader } from './components/SpotifyHeader';
import { AddSongForm } from './components/AddSongForm';
import { PlaylistTable } from './components/PlaylistTable';
import { ReduxStateInspector } from './components/ReduxStateInspector';
import { PlayerBar } from './components/PlayerBar';
import { Disc, Code2, Sparkles, Github } from 'lucide-react';

function PlaylistAppContent() {
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [showInspector, setShowInspector] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-28 selection:bg-emerald-500 selection:text-black">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 px-4 md:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
              <Disc className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
                Redux Playlist Manager
              </span>
              <span className="text-[11px] text-zinc-400 block -mt-0.5">
                React-Redux • createStore • Reducers & Actions
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowInspector(!showInspector)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-xs text-zinc-300 font-semibold transition"
            >
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{showInspector ? 'Hide DevTools' : 'Show DevTools'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        {/* Spotify Header Banner */}
        <SpotifyHeader
          currentPlayingId={currentPlayingId}
          setCurrentPlayingId={setCurrentPlayingId}
          toggleInspector={() => setShowInspector(!showInspector)}
          showInspector={showInspector}
        />

        {/* Step-by-step Inspector & Code Walkthrough */}
        {showInspector && <ReduxStateInspector />}

        {/* Add Song Form (Step 1 & 2) */}
        <AddSongForm />

        {/* Playlist Table (Step 4 & 5) */}
        <PlaylistTable
          currentPlayingId={currentPlayingId}
          setCurrentPlayingId={setCurrentPlayingId}
        />
      </main>

      {/* Bottom Spotify Player Controls */}
      <PlayerBar
        currentPlayingId={currentPlayingId}
        setCurrentPlayingId={setCurrentPlayingId}
      />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PlaylistAppContent />
    </Provider>
  );
}
