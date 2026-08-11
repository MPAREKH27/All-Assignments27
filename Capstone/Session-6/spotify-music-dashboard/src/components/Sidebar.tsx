import React from 'react';
import { Home, Search, Library, Heart, Plus, Disc, Music, ShieldCheck } from 'lucide-react';
import { ActiveTab, Playlist } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  playlists: Playlist[];
  selectedPlaylistId: string | null;
  setSelectedPlaylistId: (id: string | null) => void;
  likedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  playlists,
  selectedPlaylistId,
  setSelectedPlaylistId,
  likedCount,
}) => {
  return (
    <aside className="w-64 bg-black text-neutral-400 p-3 flex flex-col gap-2 h-full shrink-0 select-none">
      {/* Brand & Main Navigation Block */}
      <div className="bg-neutral-900/90 rounded-xl p-4 flex flex-col gap-4 border border-neutral-800/50">
        <div className="flex items-center gap-2.5 px-2 py-1 text-white">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-black text-xl shadow-lg shadow-green-500/20">
            <Disc className="w-5 h-5 animate-spin-slow" />
          </div>
          <span className="font-bold text-lg text-white tracking-tight">Spotify</span>
        </div>

        <nav className="flex flex-col gap-1">
          <button
            onClick={() => {
              setActiveTab('home');
              setSelectedPlaylistId(null);
            }}
            id="nav-home-btn"
            className={`flex items-center gap-4 px-3 py-2.5 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
              activeTab === 'home' && !selectedPlaylistId
                ? 'bg-neutral-800 text-white'
                : 'hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            <Home className={`w-5 h-5 ${activeTab === 'home' && !selectedPlaylistId ? 'text-green-500' : ''}`} />
            <span>Home</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('search');
              setSelectedPlaylistId(null);
            }}
            id="nav-search-btn"
            className={`flex items-center gap-4 px-3 py-2.5 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
              activeTab === 'search'
                ? 'bg-neutral-800 text-white'
                : 'hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            <Search className={`w-5 h-5 ${activeTab === 'search' ? 'text-green-500' : ''}`} />
            <span>Search</span>
          </button>
        </nav>
      </div>

      {/* Your Library & Playlists Block */}
      <div className="bg-neutral-900/90 rounded-xl p-3 flex-1 flex flex-col gap-3 overflow-hidden border border-neutral-800/50">
        {/* Library Header */}
        <div className="flex items-center justify-between px-2 pt-1 text-neutral-400">
          <button
            onClick={() => {
              setActiveTab('library');
              setSelectedPlaylistId(null);
            }}
            className={`flex items-center gap-3 font-semibold text-sm transition hover:text-white cursor-pointer ${
              activeTab === 'library' ? 'text-white' : ''
            }`}
          >
            <Library className="w-5 h-5" />
            <span>Your Library</span>
          </button>

          <button 
            className="w-7 h-7 rounded-full hover:bg-neutral-800 hover:text-white flex items-center justify-center transition cursor-pointer"
            title="Create Playlist"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Filter Badges */}
        <div className="flex gap-2 px-1 pt-1">
          <button 
            onClick={() => {
              setActiveTab('liked');
              setSelectedPlaylistId(null);
            }}
            className={`px-3 py-1 text-xs rounded-full font-medium transition cursor-pointer ${
              activeTab === 'liked' ? 'bg-white text-black font-semibold' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            Liked Songs ({likedCount})
          </button>
        </div>

        {/* Playlist List Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-1 pr-1 mt-2">
          {/* Liked Songs Special Row */}
          <button
            onClick={() => {
              setActiveTab('liked');
              setSelectedPlaylistId(null);
            }}
            className={`w-full flex items-center gap-3 p-2 rounded-lg transition text-left cursor-pointer ${
              activeTab === 'liked' ? 'bg-neutral-800 text-white' : 'hover:bg-neutral-800/50'
            }`}
          >
            <div className="w-10 h-10 rounded bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Heart className="w-5 h-5 fill-white text-white" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-white truncate">Liked Songs</span>
              <span className="text-xs text-neutral-400 truncate">Playlist • {likedCount} songs</span>
            </div>
          </button>

          {/* User Playlists */}
          {playlists.map((pl) => {
            const isSelected = selectedPlaylistId === pl.id;
            return (
              <button
                key={pl.id}
                onClick={() => {
                  setSelectedPlaylistId(pl.id);
                  setActiveTab('playlist');
                }}
                className={`w-full flex items-center gap-3 p-2 rounded-lg transition text-left cursor-pointer ${
                  isSelected ? 'bg-neutral-800 text-white' : 'hover:bg-neutral-800/50'
                }`}
              >
                <img
                  src={pl.coverUrl}
                  alt={pl.name}
                  className="w-10 h-10 rounded object-cover shrink-0 shadow-sm"
                />
                <div className="flex flex-col min-w-0">
                  <span className={`text-sm font-semibold truncate ${isSelected ? 'text-green-400' : 'text-neutral-200'}`}>
                    {pl.name}
                  </span>
                  <span className="text-xs text-neutral-400 truncate">
                    Playlist • {pl.tracks.length} tracks
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Auth Badge Footer */}
        <div className="pt-2 border-t border-neutral-800/80 px-2 flex items-center justify-between text-[11px] text-neutral-500">
          <span className="flex items-center gap-1 text-green-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" /> Firebase Auth
          </span>
          <span>v2.4.0</span>
        </div>
      </div>
    </aside>
  );
};
