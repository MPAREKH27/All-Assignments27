import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Song } from '../types';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Heart,
  Shuffle,
  Repeat,
  Music2,
  Disc
} from 'lucide-react';

interface PlayerBarProps {
  currentPlayingId: string | null;
  setCurrentPlayingId: (id: string | null) => void;
}

export const PlayerBar: React.FC<PlayerBarProps> = ({
  currentPlayingId,
  setCurrentPlayingId,
}) => {
  const playlist = useSelector((state: Song[]) => state);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const activeSong = playlist.find((s) => s.id === currentPlayingId) || (currentPlayingId ? playlist[0] : null);

  useEffect(() => {
    if (currentPlayingId && playlist.length > 0) {
      setIsPlaying(true);
      setProgress(0);
    } else {
      setIsPlaying(false);
    }
  }, [currentPlayingId, playlist.length]);

  // Simulate playback timer
  useEffect(() => {
    let timer: any;
    if (isPlaying && activeSong) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Auto skip to next song
            const currentIndex = playlist.findIndex((s) => s.id === activeSong.id);
            const nextSong = playlist[(currentIndex + 1) % playlist.length];
            if (nextSong) {
              setCurrentPlayingId(nextSong.id);
            }
            return 0;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeSong, playlist, setCurrentPlayingId]);

  if (!activeSong && playlist.length === 0) return null;

  const currentSong = activeSong || playlist[0];

  const handleNext = () => {
    if (playlist.length === 0) return;
    const idx = playlist.findIndex((s) => s.id === currentSong?.id);
    const nextIdx = (idx + 1) % playlist.length;
    setCurrentPlayingId(playlist[nextIdx].id);
  };

  const handlePrev = () => {
    if (playlist.length === 0) return;
    const idx = playlist.findIndex((s) => s.id === currentSong?.id);
    const prevIdx = idx <= 0 ? playlist.length - 1 : idx - 1;
    setCurrentPlayingId(playlist[prevIdx].id);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800/80 px-4 py-3 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Song Info */}
        <div className="flex items-center gap-3 w-1/4 min-w-[180px]">
          {currentSong ? (
            <>
              <div className="relative group w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-zinc-800">
                <img
                  src={currentSong.coverUrl}
                  alt={currentSong.title}
                  className="w-full h-full object-cover"
                />
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Disc className="w-5 h-5 text-emerald-400 animate-spin" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                  {currentSong.title}
                </div>
                <div className="text-[11px] text-zinc-400 truncate">
                  {currentSong.artist}
                </div>
              </div>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`ml-2 p-1.5 rounded-full hover:bg-zinc-800 transition ${
                  isLiked ? 'text-emerald-400' : 'text-zinc-500 hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </>
          ) : (
            <div className="text-xs text-zinc-500 italic flex items-center gap-2">
              <Music2 className="w-4 h-4" /> Select a track to play
            </div>
          )}
        </div>

        {/* Center: Controls & Scrubber */}
        <div className="flex-1 max-w-xl flex flex-col items-center gap-1.5">
          {/* Action buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {}}
              className="text-zinc-500 hover:text-white transition"
              title="Shuffle"
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrev}
              disabled={playlist.length === 0}
              className="text-zinc-300 hover:text-white transition disabled:opacity-40"
              title="Previous"
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={() => {
                if (!currentPlayingId && playlist.length > 0) {
                  setCurrentPlayingId(playlist[0].id);
                } else {
                  setIsPlaying(!isPlaying);
                }
              }}
              disabled={playlist.length === 0}
              id="player-play-pause-btn"
              className="w-9 h-9 rounded-full bg-emerald-500 text-black hover:bg-emerald-400 flex items-center justify-center transition active:scale-95 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={handleNext}
              disabled={playlist.length === 0}
              className="text-zinc-300 hover:text-white transition disabled:opacity-40"
              title="Next"
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={() => {}}
              className="text-zinc-500 hover:text-white transition"
              title="Repeat"
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full flex items-center gap-2 text-[10px] font-mono text-zinc-500">
            <span>
              {currentSong
                ? `0:${Math.floor((progress * 2.5) / 10).toString().padStart(2, '0')}`
                : '0:00'}
            </span>
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newPct = (clickX / rect.width) * 100;
                setProgress(Math.max(0, Math.min(100, newPct)));
              }}
              className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden cursor-pointer group"
            >
              <div
                className="h-full bg-emerald-500 group-hover:bg-emerald-400 transition-all rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span>{currentSong?.duration || '3:30'}</span>
          </div>
        </div>

        {/* Right: Volume */}
        <div className="hidden md:flex items-center justify-end gap-2 w-1/4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-zinc-400 hover:text-white transition"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-20 h-1 accent-emerald-500 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
