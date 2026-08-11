import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Song } from '../types';
import { addSong, clearPlaylist } from '../redux/store';
import { Play, Shuffle, Trash2, Music, Sparkles, Code2, Disc } from 'lucide-react';

interface SpotifyHeaderProps {
  currentPlayingId: string | null;
  setCurrentPlayingId: (id: string | null) => void;
  toggleInspector: () => void;
  showInspector: boolean;
}

export const SpotifyHeader: React.FC<SpotifyHeaderProps> = ({
  currentPlayingId,
  setCurrentPlayingId,
  toggleInspector,
  showInspector,
}) => {
  const playlist = useSelector((state: Song[]) => state);
  const dispatch = useDispatch();

  const handlePlayAll = () => {
    if (playlist.length > 0) {
      if (currentPlayingId) {
        setCurrentPlayingId(null);
      } else {
        setCurrentPlayingId(playlist[0].id);
      }
    }
  };

  const handleRestoreDefaults = () => {
    dispatch(addSong('Kesariya'));
    dispatch(addSong('Shape of You'));
  };

  // Calculate total duration in seconds roughly
  const totalMinutes = playlist.reduce((acc, song) => {
    const parts = song.duration.split(':');
    const mins = parseInt(parts[0] || '3', 10);
    const secs = parseInt(parts[1] || '30', 10);
    return acc + mins * 60 + secs;
  }, 0);

  const formattedTotalTime = `${Math.floor(totalMinutes / 60)} min ${totalMinutes % 60} sec`;

  return (
    <div className="relative bg-gradient-to-b from-emerald-900/80 via-zinc-900/90 to-zinc-950 p-6 md:p-8 rounded-2xl shadow-2xl overflow-hidden border border-emerald-500/20 mb-8">
      {/* Background glow circle */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6">
        {/* Cover Collage / Main Cover */}
        <div className="relative group w-44 h-44 md:w-52 md:h-52 bg-zinc-800 rounded-xl shadow-2xl overflow-hidden flex-shrink-0 border border-zinc-700/50 flex items-center justify-center">
          {playlist.length > 0 ? (
            <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
              {playlist.slice(0, 4).map((song, idx) => (
                <img
                  key={song.id || idx}
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ))}
              {playlist.length < 4 &&
                Array.from({ length: 4 - playlist.length }).map((_, i) => (
                  <div key={i} className="bg-zinc-800 flex items-center justify-center">
                    <Music className="w-8 h-8 text-zinc-600" />
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-zinc-500 p-4 text-center">
              <Disc className="w-16 h-16 mb-2 animate-spin-slow text-emerald-500/60" />
              <span className="text-xs font-medium">Empty Playlist</span>
            </div>
          )}
        </div>

        {/* Playlist Info */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Redux State Management
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            My Redux Playlist
          </h1>

          <p className="text-zinc-400 text-sm max-w-xl leading-relaxed">
            A dynamic music playlist store built with <span className="text-emerald-400 font-semibold">Redux</span>, <span className="text-emerald-400 font-semibold">createStore</span>, and <span className="text-emerald-400 font-semibold">React-Redux</span>. Easily dispatch actions to add and remove tracks.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-zinc-400 font-medium pt-1">
            <span className="text-white font-bold">Created for Redux Demo</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">{playlist.length} {playlist.length === 1 ? 'song' : 'songs'}</span>
            <span>•</span>
            <span>{formattedTotalTime}</span>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-4">
            <button
              onClick={handlePlayAll}
              disabled={playlist.length === 0}
              id="play-all-btn"
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all transform active:scale-95 shadow-lg ${
                currentPlayingId
                  ? 'bg-emerald-400 text-black hover:bg-emerald-300 shadow-emerald-500/25'
                  : 'bg-emerald-500 text-black hover:bg-emerald-400 hover:scale-105 shadow-emerald-500/30'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Play className={`w-5 h-5 fill-current ${currentPlayingId ? 'animate-pulse' : ''}`} />
              {currentPlayingId ? 'Pause Playing' : 'Play Playlist'}
            </button>

            {playlist.length === 0 && (
              <button
                onClick={handleRestoreDefaults}
                id="restore-defaults-btn"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Add 'Kesariya' & 'Shape of You'
              </button>
            )}

            {playlist.length > 0 && (
              <button
                onClick={() => dispatch(clearPlaylist())}
                id="clear-playlist-btn"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-zinc-800/80 hover:bg-red-500/20 text-zinc-300 hover:text-red-400 text-xs font-semibold border border-zinc-700/80 hover:border-red-500/30 transition"
              >
                <Trash2 className="w-4 h-4" />
                Clear Playlist
              </button>
            )}

            <button
              onClick={toggleInspector}
              id="redux-inspector-toggle-btn"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition border ${
                showInspector
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
              }`}
            >
              <Code2 className="w-4 h-4 text-emerald-400" />
              {showInspector ? 'Hide Redux DevTools' : 'View Redux Code & DevTools'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
