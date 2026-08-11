import React, { useState, useEffect } from 'react';
import { Track } from '../types';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, Heart, Music } from 'lucide-react';

interface AudioPlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNextTrack,
  onPrevTrack
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    let interval: any;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= currentTrack.durationSeconds) {
            onNextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, onNextTrack]);

  useEffect(() => {
    setProgress(0);
    setIsLiked(false);
  }, [currentTrack?.id]);

  if (!currentTrack) {
    return null;
  }

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = Math.floor(secs % 60);
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-950/95 border-t border-slate-800 text-white z-50 backdrop-blur-md px-4 py-3 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Track Metadata */}
        <div className="flex items-center space-x-3 w-full md:w-1/4">
          <div className="relative group">
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className="w-12 h-12 rounded-lg object-cover border border-slate-800 shadow-md"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                <div className="flex items-end space-x-0.5 h-4">
                  <span className="w-1 bg-emerald-400 animate-bounce h-3 rounded-full"></span>
                  <span className="w-1 bg-emerald-400 animate-bounce h-4 rounded-full delay-100"></span>
                  <span className="w-1 bg-emerald-400 animate-bounce h-2 rounded-full delay-200"></span>
                </div>
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-semibold text-white truncate hover:underline cursor-pointer">
              {currentTrack.title}
            </h4>
            <p className="text-xs text-slate-400 truncate">{currentTrack.artist}</p>
          </div>

          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-1.5 rounded-full hover:bg-slate-800 transition ${
              isLiked ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-emerald-400' : ''}`} />
          </button>
        </div>

        {/* Controls & Scrubber */}
        <div className="flex flex-col items-center w-full md:w-2/4 max-w-xl">
          <div className="flex items-center space-x-4 mb-1">
            <button className="text-slate-400 hover:text-white transition">
              <Shuffle className="w-4 h-4" />
            </button>
            <button onClick={onPrevTrack} className="text-slate-300 hover:text-white transition">
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={onTogglePlay}
              className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/20 transition transform hover:scale-105"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
            </button>

            <button onClick={onNextTrack} className="text-slate-300 hover:text-white transition">
              <SkipForward className="w-5 h-5" />
            </button>
            <button className="text-slate-400 hover:text-white transition">
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Time Scrubber */}
          <div className="flex items-center space-x-2 w-full text-xs text-slate-400 font-mono">
            <span>{formatDuration(progress)}</span>
            <input
              type="range"
              min={0}
              max={currentTrack.durationSeconds}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <span>{formatDuration(currentTrack.durationSeconds)}</span>
          </div>
        </div>

        {/* Right Controls: Volume & Tag */}
        <div className="hidden md:flex items-center justify-end space-x-3 w-1/4">
          <button onClick={() => setIsMuted(!isMuted)} className="text-slate-400 hover:text-white">
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            defaultValue={80}
            className="w-20 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-1 rounded border border-slate-800 font-mono">
            {currentTrack.genre}
          </span>
        </div>

      </div>
    </div>
  );
};
