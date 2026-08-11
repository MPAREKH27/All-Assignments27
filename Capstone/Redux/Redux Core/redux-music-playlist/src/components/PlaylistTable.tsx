import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSong, addSong } from '../redux/store';
import { Song } from '../types';
import {
  Play,
  Pause,
  Trash2,
  Clock,
  Music,
  Search,
  Disc,
  Disc3,
  AlertCircle
} from 'lucide-react';

interface PlaylistTableProps {
  currentPlayingId: string | null;
  setCurrentPlayingId: (id: string | null) => void;
}

export const PlaylistTable: React.FC<PlaylistTableProps> = ({
  currentPlayingId,
  setCurrentPlayingId,
}) => {
  // Requirement #4: useSelector to get songs list from Redux store
  const playlist = useSelector((state: Song[]) => state);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [lastRemovedTitle, setLastRemovedTitle] = useState<string | null>(null);

  // Filter list based on search term
  const filteredPlaylist = playlist.filter((song) => {
    const q = searchQuery.toLowerCase();
    return (
      song.title.toLowerCase().includes(q) ||
      song.artist.toLowerCase().includes(q) ||
      song.album.toLowerCase().includes(q)
    );
  });

  // Requirement #5: Dispatch removeSong when user clicks 'Remove' button
  const handleRemove = (song: Song, e: React.MouseEvent) => {
    e.stopPropagation();
    // Dispatch removeSong with song name as payload
    dispatch(removeSong(song.title));

    setLastRemovedTitle(song.title);
    if (currentPlayingId === song.id) {
      setCurrentPlayingId(null);
    }
    setTimeout(() => setLastRemovedTitle(null), 2500);
  };

  const togglePlayTrack = (songId: string) => {
    if (currentPlayingId === songId) {
      setCurrentPlayingId(null);
    } else {
      setCurrentPlayingId(songId);
    }
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 md:p-6 shadow-xl relative">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Music className="w-5 h-5 text-emerald-400" />
            Playlist Songs ({playlist.length})
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Rendered from Redux store state using <code className="text-emerald-400">useSelector()</code>
          </p>
        </div>

        {/* Search Input */}
        {playlist.length > 0 && (
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in playlist..."
              className="w-full pl-9 pr-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-xs placeholder-zinc-500 outline-none focus:border-emerald-500 transition"
            />
          </div>
        )}
      </div>

      {/* Removed notification feedback */}
      {lastRemovedTitle && (
        <div className="mb-4 p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-red-400" />
            <span>
              Dispatched <strong>removeSong('{lastRemovedTitle}')</strong> — track removed from Redux state!
            </span>
          </div>
          <button
            onClick={() => dispatch(addSong(lastRemovedTitle))}
            className="text-[11px] underline font-semibold text-red-200 hover:text-white"
          >
            Undo Add Back
          </button>
        </div>
      )}

      {/* Empty State */}
      {playlist.length === 0 ? (
        <div className="py-12 px-4 text-center bg-zinc-950/50 rounded-xl border border-dashed border-zinc-800">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-3 text-zinc-600">
            <Disc className="w-8 h-8 text-emerald-500/60 animate-spin-slow" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Your Playlist is Empty</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto mb-5">
            There are currently no songs in the Redux store state. Dispatch an <code className="text-emerald-400">addSong</code> action above or restore the sample tracks.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                dispatch(addSong('Kesariya'));
                dispatch(addSong('Shape of You'));
              }}
              id="empty-restore-btn"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl transition shadow-md"
            >
              Add 'Kesariya' & 'Shape of You'
            </button>
          </div>
        </div>
      ) : filteredPlaylist.length === 0 ? (
        <div className="py-8 text-center text-zinc-400 text-xs">
          No songs found matching "{searchQuery}"
        </div>
      ) : (
        /* Songs Table */
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-400">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-800 uppercase font-semibold text-[11px] tracking-wider">
                <th className="py-3 px-3 w-12 text-center">#</th>
                <th className="py-3 px-3">Title</th>
                <th className="py-3 px-3 hidden md:table-cell">Album</th>
                <th className="py-3 px-3 hidden lg:table-cell">Added</th>
                <th className="py-3 px-3 text-right">
                  <Clock className="w-3.5 h-3.5 inline ml-auto" />
                </th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredPlaylist.map((song, index) => {
                const isPlaying = currentPlayingId === song.id;

                return (
                  <tr
                    key={song.id || index}
                    onClick={() => togglePlayTrack(song.id)}
                    className={`group hover:bg-zinc-800/60 transition cursor-pointer ${
                      isPlaying ? 'bg-emerald-950/20 text-emerald-300' : ''
                    }`}
                  >
                    {/* Index / Play Icon */}
                    <td className="py-3 px-3 text-center font-medium text-zinc-500">
                      <div className="w-6 h-6 flex items-center justify-center mx-auto">
                        {isPlaying ? (
                          <div className="flex items-end justify-center gap-0.5 h-3.5 w-3.5">
                            <span className="w-1 bg-emerald-400 animate-bounce h-full rounded-full" />
                            <span className="w-1 bg-emerald-400 animate-bounce h-2/3 rounded-full [animation-delay:0.2s]" />
                            <span className="w-1 bg-emerald-400 animate-bounce h-4/5 rounded-full [animation-delay:0.4s]" />
                          </div>
                        ) : (
                          <>
                            <span className="group-hover:hidden">{index + 1}</span>
                            <Play className="w-4 h-4 text-white hidden group-hover:block fill-current" />
                          </>
                        )}
                      </div>
                    </td>

                    {/* Title + Cover + Artist */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={song.coverUrl}
                          alt={song.title}
                          className="w-10 h-10 rounded-md object-cover shadow-sm border border-zinc-800 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className={`font-semibold truncate text-sm ${isPlaying ? 'text-emerald-400' : 'text-white group-hover:text-emerald-300'}`}>
                            {song.title}
                          </div>
                          <div className="text-zinc-400 truncate text-xs">
                            {song.artist}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Album */}
                    <td className="py-3 px-3 hidden md:table-cell text-zinc-400 truncate max-w-[150px]">
                      {song.album}
                    </td>

                    {/* Added At */}
                    <td className="py-3 px-3 hidden lg:table-cell text-zinc-500 text-[11px]">
                      {song.addedAt}
                    </td>

                    {/* Duration */}
                    <td className="py-3 px-3 text-right font-mono text-zinc-400 text-xs">
                      {song.duration}
                    </td>

                    {/* Remove Action Button (Step 5) */}
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={(e) => handleRemove(song, e)}
                        id={`remove-btn-${song.title.toLowerCase().replace(/\s+/g, '-')}-${index}`}
                        title={`Remove '${song.title}' from playlist (Step 5)`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-red-600/90 text-zinc-300 hover:text-white text-xs font-semibold border border-zinc-700/60 hover:border-red-500 transition shadow-sm active:scale-95"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
