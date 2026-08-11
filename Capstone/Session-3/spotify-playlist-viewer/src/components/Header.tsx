import React from 'react';
import { Music, Code2, UtensilsCrossed, Sparkles, Key, CheckCircle2, Terminal } from 'lucide-react';

interface HeaderProps {
  activeTab: 'spotify' | 'explorer' | 'zomato' | 'ai-env';
  setActiveTab: (tab: 'spotify' | 'explorer' | 'zomato' | 'ai-env') => void;
  spotifyKey: string;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, spotifyKey }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 backdrop-blur-md bg-opacity-95 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Music className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
                  spotify-playlist-viewer
                </h1>
                <span className="text-[10px] uppercase tracking-wider font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Next.js App
                </span>
              </div>
              <p className="text-xs text-slate-400">Environment Variables & Architecture Workbench</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setActiveTab('spotify')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'spotify'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Playlist Viewer</span>
            </button>

            <button
              onClick={() => setActiveTab('explorer')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'explorer'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Next.js Structure</span>
            </button>

            <button
              onClick={() => setActiveTab('zomato')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'zomato'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>utils/api.js (Zomato)</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-env')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'ai-env'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>ai_env_example.txt</span>
            </button>
          </nav>

          {/* Environment Key Indicator */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800/80 text-xs text-slate-300">
              <Key className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400">NEXT_PUBLIC_SPOTIFY_API_KEY:</span>
              <code className="text-emerald-400 font-mono font-semibold">{spotifyKey}</code>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-1" />
            </div>
          </div>

        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800/60 text-xs">
          <button
            onClick={() => setActiveTab('spotify')}
            className={`px-2 py-1 rounded ${activeTab === 'spotify' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
          >
            Playlists
          </button>
          <button
            onClick={() => setActiveTab('explorer')}
            className={`px-2 py-1 rounded ${activeTab === 'explorer' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
          >
            Structure
          </button>
          <button
            onClick={() => setActiveTab('zomato')}
            className={`px-2 py-1 rounded ${activeTab === 'zomato' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
          >
            Zomato
          </button>
          <button
            onClick={() => setActiveTab('ai-env')}
            className={`px-2 py-1 rounded ${activeTab === 'ai-env' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
          >
            AI Env
          </button>
        </div>

      </div>
    </header>
  );
};
