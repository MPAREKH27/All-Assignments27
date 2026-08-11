import React from 'react';
import { Play, Disc, Music, ListMusic, Heart } from 'lucide-react';
import { Playlist } from '../types';

interface PlaylistCardProps {
  /** Playlist data passed as prop */
  playlist: Playlist;
  /** Callback when play button or card is clicked */
  onPlay?: (playlist: Playlist) => void;
  /** Currently active/playing status */
  isPlaying?: boolean;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({
  playlist,
  onPlay,
  isPlaying = false,
}) => {
  const [liked, setLiked] = React.useState(false);

  return (
    <div
      id={`playlist-card-${playlist.id}`}
      className="group relative bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800/80 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/20 hover:-translate-y-1 flex flex-col justify-between"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-950 mb-4 group/img">
        <img
          src={playlist.coverUrl}
          alt={playlist.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-950/70 backdrop-blur-md rounded-full text-[11px] font-medium text-emerald-400 border border-emerald-500/20">
            <ListMusic className="w-3.5 h-3.5" />
            {playlist.songCount} Songs
          </span>

          <button
            id={`like-btn-${playlist.id}`}
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            className="pointer-events-auto p-1.5 rounded-full bg-slate-950/60 hover:bg-slate-950/90 backdrop-blur-md text-slate-300 hover:text-emerald-400 transition-colors focus:outline-none"
            aria-label="Like playlist"
          >
            <Heart className={`w-4 h-4 transition-colors ${liked ? 'fill-emerald-500 text-emerald-500' : ''}`} />
          </button>
        </div>

        {/* Floating Hover Play Button */}
        <button
          id={`play-btn-${playlist.id}`}
          onClick={() => onPlay?.(playlist)}
          className={`absolute bottom-3 right-3 w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/40 transition-all duration-300 transform focus:outline-none ${
            isPlaying
              ? 'scale-100 opacity-100 bg-emerald-400 ring-4 ring-emerald-500/30'
              : 'scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 hover:scale-110 hover:bg-emerald-400'
          }`}
          aria-label={`Play ${playlist.title}`}
        >
          {isPlaying ? (
            <Disc className="w-6 h-6 animate-spin text-slate-950" />
          ) : (
            <Play className="w-6 h-6 fill-slate-950 text-slate-950 translate-x-0.5" />
          )}
        </button>
      </div>

      {/* Content Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors line-clamp-1">
            {playlist.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {playlist.description}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-medium text-slate-300 truncate">
            <Music className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            By {playlist.creator}
          </span>
          <button
            onClick={() => onPlay?.(playlist)}
            className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-2 shrink-0"
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
};
