import React, { useState, useEffect } from 'react';
import { Music, Plus, Play, Sparkles, Disc, Trash2, ListMusic } from 'lucide-react';
import { Playlist } from '../types';
import { fetchPlaylistsFromFirestore, addPlaylistToFirestore } from '../lib/firebase';

export const PlaylistsSection: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Form state for creating new playlist
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [songInput, setSongInput] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);
  const [playingSong, setPlayingSong] = useState<string | null>(null);

  const loadPlaylists = async () => {
    setLoading(true);
    const result = await fetchPlaylistsFromFirestore();
    setPlaylists(result.data);
    setError(result.error);
    if (result.data.length > 0 && !activePlaylist) {
      setActivePlaylist(result.data[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPlaylists();
  }, []);

  const handleCreatePlaylist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Parse song titles from comma or newline separated string
    const songTitles = songInput
      .split(/[\n,]+/)
      .map(s => s.trim())
      .filter(Boolean);

    const newPlaylistData = {
      name,
      songTitles: songTitles.length > 0 ? songTitles : ['Untitled Track 1', 'Untitled Track 2'],
      description: description || 'User curated Spotify-style playlist.',
      coverGradient: 'from-emerald-500 to-green-900'
    };

    const res = await addPlaylistToFirestore(newPlaylistData);
    if (!res.error) {
      setName('');
      setSongInput('');
      setDescription('');
      setShowAddModal(false);
      await loadPlaylists();
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <Music className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight">Spotify Playlists</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Firestore 'playlists' collection
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-0.5">
              Req 1: Store and fetch custom playlists with arrays of song titles using Firestore.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Add New Playlist
        </button>
      </div>

      {/* Main Grid: Playlist Cards & Active Player View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Playlist List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <ListMusic className="w-4 h-4 text-emerald-400" />
            Saved Playlists ({playlists.length})
          </h3>

          {loading ? (
            <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
              <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-2" />
              <p className="text-slate-400 text-sm">Fetching 'playlists' from Firestore...</p>
            </div>
          ) : playlists.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
              <Disc className="w-10 h-10 text-slate-600 mx-auto mb-2" />
              <p className="text-slate-300 font-medium">No playlists found</p>
              <p className="text-slate-500 text-xs mt-1">Create your first playlist document in Firestore.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {playlists.map((pl) => {
                const isActive = activePlaylist?.id === pl.id;
                return (
                  <div
                    key={pl.id}
                    onClick={() => setActivePlaylist(pl)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border ${
                      isActive
                        ? 'bg-slate-800 border-emerald-500/50 shadow-lg shadow-emerald-500/5'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${pl.coverGradient || 'from-emerald-600 to-indigo-900'} flex items-center justify-center text-white shrink-0 shadow-md`}>
                        <Disc className={`w-6 h-6 ${isActive ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-slate-100 truncate">{pl.name}</h4>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          {pl.songTitles.length} song{pl.songTitles.length !== 1 ? 's' : ''} • {pl.songTitles.slice(0, 2).join(', ')}...
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Playlist Player & Song Array Viewer */}
        <div className="lg:col-span-2">
          {activePlaylist ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              {/* Cover Banner */}
              <div className={`p-8 bg-gradient-to-r ${activePlaylist.coverGradient || 'from-emerald-700 to-slate-900'} text-white relative`}>
                <div className="flex items-end gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-slate-950/40 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl shrink-0">
                    <Music className="w-12 h-12 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">Playlist Document</span>
                    <h3 className="text-3xl font-extrabold mt-1">{activePlaylist.name}</h3>
                    <p className="text-slate-200 text-sm mt-2 max-w-xl">{activePlaylist.description}</p>
                    <p className="text-xs text-emerald-200 mt-2 font-mono">
                      Firestore ID: {activePlaylist.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Song Titles Array List */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Song Titles Array ({activePlaylist.songTitles.length})
                  </span>
                  <span className="text-xs text-emerald-400 font-mono">
                    document.songTitles: string[]
                  </span>
                </div>

                <div className="space-y-2">
                  {activePlaylist.songTitles.map((song, idx) => {
                    const isPlaying = playingSong === song;
                    return (
                      <div
                        key={idx}
                        onClick={() => setPlayingSong(song)}
                        className={`group flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all ${
                          isPlaying
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                            : 'bg-slate-800/40 hover:bg-slate-800 text-slate-200 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="w-6 text-center text-xs font-mono text-slate-500 group-hover:text-emerald-400">
                            {idx + 1}
                          </span>
                          <button className="w-8 h-8 rounded-full bg-slate-800 group-hover:bg-emerald-500 group-hover:text-slate-950 flex items-center justify-center transition-colors">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </button>
                          <div>
                            <p className="font-medium text-sm">{song}</p>
                            <p className="text-xs text-slate-400">Track #{idx + 1} • Spotify Audio Stream</p>
                          </div>
                        </div>

                        {isPlaying && (
                          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            Playing
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              Select a playlist to view details
            </div>
          )}
        </div>
      </div>

      {/* Add Playlist Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                New Firestore Playlist Document
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreatePlaylist} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Playlist Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Coding Roadtrip Mix"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Song Titles (Comma or Newline Separated) *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g.&#10;Midnight City - M83&#10;Get Lucky - Daft Punk&#10;Starlight - Muse"
                  value={songInput}
                  onChange={(e) => setSongInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm font-mono"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Will be saved as an array of song strings in Firestore (`songTitles`).
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Short description of this playlist"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-semibold rounded-xl cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  Save to Firestore
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
