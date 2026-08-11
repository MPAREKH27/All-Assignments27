import React, { useState } from 'react';
import { MOCK_PLAYLISTS } from '../data/mockPlaylists';
import { Track, Playlist } from '../types';
import { Play, Pause, Search, Music, Key, CheckCircle2, Terminal, Disc, Sparkles, Filter, ListMusic } from 'lucide-react';

interface SpotifyViewerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onSelectTrack: (track: Track) => void;
  onTogglePlay: () => void;
  spotifyKey: string;
  onLogKeyToConsole: () => void;
}

export const SpotifyViewer: React.FC<SpotifyViewerProps> = ({
  currentTrack,
  isPlaying,
  onSelectTrack,
  onTogglePlay,
  spotifyKey,
  onLogKeyToConsole,
}) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>(MOCK_PLAYLISTS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeGenreFilter, setActiveGenreFilter] = useState<string>('All');

  const genres = ['All', ...Array.from(new Set(selectedPlaylist.tracks.map((t) => t.genre)))];

  const filteredTracks = selectedPlaylist.tracks.filter((track) => {
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.album.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = activeGenreFilter === 'All' || track.genre === activeGenreFilter;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="space-y-6 pb-28">
      
      {/* Banner / Environment Verification Notice */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/20 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Key className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white">Spotify API Environment Key Active</h2>
                <span className="flex items-center space-x-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Reading <code className="text-emerald-300 font-mono bg-slate-950/80 px-1.5 py-0.5 rounded border border-slate-800">process.env.NEXT_PUBLIC_SPOTIFY_API_KEY</code> = <span className="font-mono text-emerald-400 font-bold">"{spotifyKey}"</span>
              </p>
            </div>
          </div>

          <button
            onClick={onLogKeyToConsole}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-700 shadow-md transition transform active:scale-95"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Log Key in Browser Console</span>
          </button>
        </div>
      </div>

      {/* Playlist Carousel & Selection Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <ListMusic className="w-5 h-5 text-emerald-400" />
            <span>Featured Playlists</span>
          </h3>
          <span className="text-xs text-slate-400">Select a playlist to inspect tracks</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_PLAYLISTS.map((playlist) => {
            const isSelected = selectedPlaylist.id === playlist.id;
            return (
              <div
                key={playlist.id}
                onClick={() => setSelectedPlaylist(playlist)}
                className={`group cursor-pointer rounded-2xl p-4 border transition-all ${
                  isSelected
                    ? 'bg-slate-800/80 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/50'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/40 hover:border-slate-700'
                }`}
              >
                <div className="flex space-x-4">
                  <div className="relative shrink-0">
                    <img
                      src={playlist.coverUrl}
                      alt={playlist.name}
                      className="w-20 h-20 rounded-xl object-cover border border-slate-800 shadow-md"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <Disc className="w-8 h-8 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded">
                      {playlist.tracks.length} Tracks
                    </span>
                    <h4 className="text-sm font-bold text-white truncate mt-1 group-hover:text-emerald-400 transition">
                      {playlist.name}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {playlist.description}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-2 font-medium">
                      By {playlist.creator} • {(playlist.followersCount / 1000000).toFixed(1)}M followers
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Playlist Detailed View */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        
        {/* Top Controls: Search & Genre Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">{selectedPlaylist.name}</h3>
            <p className="text-xs text-slate-400 mt-1">{selectedPlaylist.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search track, artist..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Genre Filter */}
            <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setActiveGenreFilter(genre)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                    activeGenreFilter === genre
                      ? 'bg-emerald-500 text-slate-950 font-semibold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Track Table / Cards */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="pb-3 w-12 text-center">#</th>
                <th className="pb-3">Title & Artist</th>
                <th className="pb-3 hidden md:table-cell">Album</th>
                <th className="pb-3 text-center hidden sm:table-cell">Popularity</th>
                <th className="pb-3 text-right">Duration</th>
                <th className="pb-3 text-center w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredTracks.map((track, idx) => {
                const isCurrent = currentTrack?.id === track.id;
                return (
                  <tr
                    key={track.id}
                    className={`group hover:bg-slate-800/40 transition cursor-pointer ${
                      isCurrent ? 'bg-slate-800/60 border-l-2 border-emerald-500' : ''
                    }`}
                  >
                    {/* Track Number / Play Button */}
                    <td className="py-3 text-center">
                      <button
                        onClick={() => {
                          if (isCurrent) {
                            onTogglePlay();
                          } else {
                            onSelectTrack(track);
                          }
                        }}
                        className="w-8 h-8 rounded-full hover:bg-emerald-500 text-slate-400 hover:text-slate-950 flex items-center justify-center transition mx-auto"
                      >
                        {isCurrent && isPlaying ? (
                          <Pause className="w-4 h-4 text-emerald-400 group-hover:text-slate-950 fill-current" />
                        ) : (
                          <Play className="w-4 h-4 text-slate-400 group-hover:text-slate-950 fill-current ml-0.5" />
                        )}
                      </button>
                    </td>

                    {/* Title & Artist */}
                    <td className="py-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={track.coverUrl}
                          alt={track.title}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-800"
                        />
                        <div>
                          <p className={`font-semibold text-sm ${isCurrent ? 'text-emerald-400' : 'text-white'}`}>
                            {track.title}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">{track.artist}</p>
                        </div>
                      </div>
                    </td>

                    {/* Album */}
                    <td className="py-3 text-slate-400 hidden md:table-cell">
                      {track.album}
                    </td>

                    {/* Popularity Bar */}
                    <td className="py-3 text-center hidden sm:table-cell">
                      <div className="inline-flex items-center space-x-2">
                        <div className="w-16 h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full"
                            style={{ width: `${track.popularity}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{track.popularity}%</span>
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="py-3 text-right font-mono text-slate-400">
                      {Math.floor(track.durationSeconds / 60)}:
                      {(track.durationSeconds % 60).toString().padStart(2, '0')}
                    </td>

                    {/* Action */}
                    <td className="py-3 text-center">
                      <button
                        onClick={() => {
                          onSelectTrack(track);
                        }}
                        className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 text-xs font-medium transition"
                      >
                        Play Track
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredTracks.length === 0 && (
            <div className="py-12 text-center text-slate-500 text-xs">
              No tracks found matching "{searchQuery}". Try a different search term.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
