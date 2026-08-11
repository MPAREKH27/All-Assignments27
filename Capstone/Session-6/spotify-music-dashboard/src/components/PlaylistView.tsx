import React from 'react';
import { Play, Pause, Clock, Heart, Music, Sparkles } from 'lucide-react';
import { Playlist, Track } from '../types';

interface PlaylistViewProps {
  playlist: Playlist;
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPlaylist: (playlist: Playlist) => void;
  onPlayTrack: (track: Track) => void;
  onToggleLike: (trackId: string) => void;
}

export const PlaylistView: React.FC<PlaylistViewProps> = ({
  playlist,
  currentTrack,
  isPlaying,
  onPlayPlaylist,
  onPlayTrack,
  onToggleLike,
}) => {
  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const totalDuration = playlist.tracks.reduce((acc, t) => acc + (t.duration || 0), 0);
  const totalMins = Math.floor(totalDuration / 60);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Hero Banner Header */}
      <div className="flex flex-col md:flex-row items-end gap-6 pt-6 pb-4 px-2">
        <img
          src={playlist.coverUrl}
          alt={playlist.name}
          className="w-48 h-48 md:w-56 md:h-56 rounded-xl object-cover shadow-2xl shadow-black/80 border border-neutral-800"
        />

        <div className="flex flex-col gap-2 min-w-0">
          <span className="text-xs uppercase font-extrabold tracking-wider text-green-400">
            Playlist
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
            {playlist.name}
          </h1>
          <p className="text-sm text-neutral-300 font-medium mt-1 max-w-xl">
            {playlist.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-neutral-400 mt-2">
            <span className="font-semibold text-white">Spotify</span>
            <span>•</span>
            <span>{playlist.tracks.length} songs,</span>
            <span>about {totalMins} min</span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-4 px-2 py-2">
        <button
          onClick={() => onPlayPlaylist(playlist)}
          id="playlist-play-all-btn"
          className="w-14 h-14 rounded-full bg-green-500 hover:scale-105 text-black flex items-center justify-center shadow-lg shadow-green-500/20 transition cursor-pointer"
          title="Play playlist"
        >
          {isPlaying && currentTrack && playlist.tracks.some(t => t.id === currentTrack.id) ? (
            <Pause className="w-6 h-6 fill-black" />
          ) : (
            <Play className="w-6 h-6 fill-black ml-1" />
          )}
        </button>
      </div>

      {/* Track Table List */}
      <div className="flex flex-col w-full text-left text-neutral-400 text-sm">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-neutral-800 text-xs uppercase font-semibold text-neutral-500 tracking-wider">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-6 md:col-span-5">Title</div>
          <div className="hidden md:block md:col-span-4">Album</div>
          <div className="col-span-5 md:col-span-2 text-right flex items-center justify-end gap-1">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        {/* Tracks Rows */}
        <div className="flex flex-col mt-2">
          {playlist.tracks.map((track, idx) => {
            const isCurrent = currentTrack?.id === track.id;
            return (
              <div
                key={track.id}
                onClick={() => onPlayTrack(track)}
                className={`group grid grid-cols-12 gap-4 px-4 py-2.5 rounded-lg items-center transition cursor-pointer ${
                  isCurrent ? 'bg-neutral-800/80 text-green-400' : 'hover:bg-neutral-800/50 text-neutral-300'
                }`}
              >
                {/* Index / Play icon */}
                <div className="col-span-1 text-center text-sm font-medium">
                  {isCurrent && isPlaying ? (
                    <div className="flex items-end justify-center gap-0.5 h-4">
                      <span className="w-1 h-3 bg-green-500 animate-bounce"></span>
                      <span className="w-1 h-4 bg-green-500 animate-bounce delay-100"></span>
                      <span className="w-1 h-2 bg-green-500 animate-bounce delay-200"></span>
                    </div>
                  ) : (
                    <span className="group-hover:hidden">{idx + 1}</span>
                  )}
                  <Play className={`w-4 h-4 hidden group-hover:inline-block ${isCurrent ? 'text-green-500 fill-green-500' : 'text-white'}`} />
                </div>

                {/* Title & Artist */}
                <div className="col-span-6 md:col-span-5 flex items-center gap-3 min-w-0">
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-10 h-10 rounded object-cover shrink-0 shadow-sm"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className={`font-semibold truncate text-sm ${isCurrent ? 'text-green-400' : 'text-white'}`}>
                      {track.title}
                    </span>
                    <span className="text-xs text-neutral-400 truncate font-medium">
                      {track.artist}
                    </span>
                  </div>
                </div>

                {/* Album Name */}
                <div className="hidden md:block md:col-span-4 truncate text-xs text-neutral-400 font-medium">
                  {track.album}
                </div>

                {/* Duration & Like button */}
                <div className="col-span-5 md:col-span-2 text-right flex items-center justify-end gap-3 text-xs font-mono">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLike(track.id);
                    }}
                    className="text-neutral-400 hover:text-green-500 transition cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${track.liked ? 'fill-green-500 text-green-500' : ''}`} />
                  </button>
                  <span>{formatDuration(track.duration)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
