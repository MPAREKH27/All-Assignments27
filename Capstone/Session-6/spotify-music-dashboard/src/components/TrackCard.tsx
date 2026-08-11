import React from 'react';
import { Play, Pause, Heart } from 'lucide-react';
import { Track } from '../types';

interface TrackCardProps {
  track: Track;
  isPlayingCurrent: boolean;
  onPlayTrack: (track: Track) => void;
  onToggleLike: (trackId: string) => void;
}

export const TrackCard: React.FC<TrackCardProps> = ({
  track,
  isPlayingCurrent,
  onPlayTrack,
  onToggleLike,
}) => {
  return (
    <div className="group relative bg-neutral-900/60 hover:bg-neutral-800/80 p-3.5 rounded-xl transition-all duration-300 flex flex-col gap-3 border border-neutral-800/40 hover:border-neutral-700/60 cursor-pointer shadow-sm hover:shadow-md">
      {/* Cover Image Container */}
      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-neutral-800">
        <img
          src={track.coverUrl}
          alt={track.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Play Button Overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlayTrack(track);
          }}
          className={`absolute right-3 bottom-3 w-11 h-11 rounded-full bg-green-500 text-black flex items-center justify-center shadow-xl shadow-black/50 transition-all duration-300 hover:scale-105 hover:bg-green-400 cursor-pointer ${
            isPlayingCurrent
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
          }`}
          title={isPlayingCurrent ? 'Pause' : 'Play'}
        >
          {isPlayingCurrent ? (
            <Pause className="w-5 h-5 fill-black" />
          ) : (
            <Play className="w-5 h-5 fill-black ml-0.5" />
          )}
        </button>

        {/* Like Button Badge */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(track.id);
          }}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition duration-200 hover:scale-110 cursor-pointer"
          title="Like song"
        >
          <Heart className={`w-4 h-4 ${track.liked ? 'fill-green-500 text-green-500' : 'text-white'}`} />
        </button>
      </div>

      {/* Info Block */}
      <div className="flex flex-col min-w-0">
        <span className={`font-bold text-sm truncate ${isPlayingCurrent ? 'text-green-400' : 'text-white'}`}>
          {track.title}
        </span>
        <span className="text-xs text-neutral-400 truncate mt-0.5 font-medium">
          {track.artist}
        </span>
      </div>
    </div>
  );
};
