import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, 
  Volume2, VolumeX, Heart, ListMusic, Maximize2 
} from 'lucide-react';
import { Track } from '../types';

interface PlayerBarProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPauseToggle: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onToggleLike: (trackId: string) => void;
}

export const PlayerBar: React.FC<PlayerBarProps> = ({
  currentTrack,
  isPlaying,
  onPlayPauseToggle,
  onNextTrack,
  onPrevTrack,
  onToggleLike,
}) => {
  const [progress, setProgress] = useState(0); // in seconds
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      onNextTrack();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onNextTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTrack) {
      if (audio.src !== currentTrack.audioUrl) {
        audio.src = currentTrack.audioUrl;
        audio.currentTime = 0;
      }

      if (isPlaying) {
        audio.play().catch((err) => console.log('Audio playback prevented:', err));
      } else {
        audio.pause();
      }
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setProgress(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  if (!currentTrack) {
    return null;
  }

  const duration = currentTrack.duration || 180;

  return (
    <div className="h-24 bg-black border-t border-neutral-800 px-4 flex items-center justify-between text-white shrink-0 select-none z-40">
      {/* Left: Track Info */}
      <div className="flex items-center gap-3.5 w-1/4 min-w-[180px]">
        <img
          src={currentTrack.coverUrl}
          alt={currentTrack.title}
          className="w-14 h-14 rounded-md object-cover shadow-md border border-neutral-800 shrink-0"
        />
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-white truncate hover:underline cursor-pointer">
            {currentTrack.title}
          </span>
          <span className="text-xs text-neutral-400 truncate hover:underline cursor-pointer">
            {currentTrack.artist}
          </span>
        </div>
        <button
          onClick={() => onToggleLike(currentTrack.id)}
          className="ml-2 text-neutral-400 hover:text-green-500 transition cursor-pointer"
          title="Like song"
        >
          <Heart className={`w-5 h-5 ${currentTrack.liked ? 'fill-green-500 text-green-500' : ''}`} />
        </button>
      </div>

      {/* Middle: Controls & Progress */}
      <div className="flex flex-col items-center gap-1.5 w-2/4 max-w-xl">
        {/* Buttons */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => setIsShuffle(!isShuffle)}
            className={`transition cursor-pointer ${isShuffle ? 'text-green-500' : 'text-neutral-400 hover:text-white'}`}
            title="Shuffle"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            onClick={onPrevTrack}
            className="text-neutral-300 hover:text-white transition cursor-pointer"
            title="Previous"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={onPlayPauseToggle}
            id="player-play-pause-btn"
            className="w-9 h-9 rounded-full bg-white hover:scale-105 text-black flex items-center justify-center transition shadow-lg cursor-pointer"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-black text-black" />
            ) : (
              <Play className="w-5 h-5 fill-black text-black ml-0.5" />
            )}
          </button>

          <button
            onClick={onNextTrack}
            className="text-neutral-300 hover:text-white transition cursor-pointer"
            title="Next"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsRepeat(!isRepeat)}
            className={`transition cursor-pointer ${isRepeat ? 'text-green-500' : 'text-neutral-400 hover:text-white'}`}
            title="Repeat"
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full flex items-center gap-2 text-xs text-neutral-400">
          <span className="w-10 text-right">{formatTime(progress)}</span>
          <div className="relative flex-1 flex items-center group">
            <input
              type="range"
              min={0}
              max={duration}
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-green-500 hover:h-1.5 transition-all"
            />
          </div>
          <span className="w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Volume & Extras */}
      <div className="flex items-center justify-end gap-3 w-1/4 min-w-[160px]">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="text-neutral-400 hover:text-white transition cursor-pointer"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={isMuted ? 0 : volume}
          onChange={(e) => {
            setVolume(Number(e.target.value));
            setIsMuted(false);
          }}
          className="w-20 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-green-500 hover:h-1.5 transition-all"
        />

        <button className="text-neutral-400 hover:text-white transition cursor-pointer" title="Queue">
          <ListMusic className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
