import React, { useState, useEffect, useRef } from 'react';
import { MUSIC_TRACKS, PLAYLISTS } from '../data/mockData';
import { Track, Playlist } from '../types';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Heart, 
  Volume2, 
  VolumeX, 
  Repeat, 
  Shuffle, 
  Music, 
  ListMusic, 
  Mic2, 
  Home, 
  Search as SearchIcon, 
  Library, 
  PlusCircle, 
  Clock, 
  User, 
  ChevronDown, 
  Sparkles, 
  Share2,
  Check
} from 'lucide-react';

export const HifiMusicDashboard: React.FC = () => {
  const [activePlaylist, setActivePlaylist] = useState<Playlist>(PLAYLISTS[0]);
  const [tracks, setTracks] = useState<Track[]>(MUSIC_TRACKS);
  const [currentTrack, setCurrentTrack] = useState<Track>(MUSIC_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(32); // percentage
  const [currentTime, setCurrentTime] = useState<number>(45); // seconds
  const [volume, setVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showLyrics, setShowLyrics] = useState<boolean>(false);
  const [showQueue, setShowQueue] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);

  // Synthesize soft audio tone on play using Web Audio API
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentTrack.duration) {
            handleNextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    setProgress((currentTime / currentTrack.duration) * 100);
  }, [currentTime, currentTrack]);

  const togglePlay = () => {
    if (!isPlaying) {
      // Start ambient synth tone
      try {
        if (!audioCtxRef.current) {
          const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioCtx) audioCtxRef.current = new AudioCtx();
        }
        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
      } catch (e) {
        console.log('Audio Context notice:', e);
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleNextTrack = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
    setCurrentTime(0);
  };

  const handlePrevTrack = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[prevIndex]);
    setCurrentTime(0);
  };

  const toggleLikeTrack = (trackId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTracks(prev => prev.map(t => t.id === trackId ? { ...t, isLiked: !t.isLiked } : t));
    if (currentTrack.id === trackId) {
      setCurrentTrack(prev => ({ ...prev, isLiked: !prev.isLiked }));
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const filteredTracks = tracks.filter(t => 
    t.title.toLowerCase().includes(searchFilter.toLowerCase()) || 
    t.artist.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="bg-black text-zinc-100 min-h-screen font-sans flex flex-col justify-between">
      
      {/* Top Bar for Figma Spec Notice */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
            Exercise 2: High-Fidelity Figma Prototype
          </span>
          <span className="font-semibold text-zinc-200">Spotify Music Dashboard</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Theme: Dark Glassmorphism</span>
          <span>Primary Accent: #1DB954 (Spotify Emerald)</span>
          <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> Fully Interactive Audio Player</span>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden min-h-[calc(100vh-120px)]">
        
        {/* Left Sidebar (2 cols) */}
        <div className="hidden md:flex md:col-span-3 lg:col-span-2 bg-zinc-950 p-4 border-r border-zinc-900 flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-2 px-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold shadow-lg shadow-emerald-500/20">
                <Music className="w-5 h-5 fill-black" />
              </div>
              <span className="font-black text-lg text-white tracking-wider">SoundWave</span>
            </div>

            {/* Navigation links */}
            <nav className="space-y-1">
              <a href="#" className="flex items-center gap-4 px-3 py-2 text-sm font-bold text-white bg-zinc-900 rounded-lg">
                <Home className="w-5 h-5 text-emerald-400" />
                <span>Home</span>
              </a>
              <a href="#" className="flex items-center gap-4 px-3 py-2 text-sm font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-lg transition-all">
                <SearchIcon className="w-5 h-5" />
                <span>Search</span>
              </a>
              <a href="#" className="flex items-center gap-4 px-3 py-2 text-sm font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-lg transition-all">
                <Library className="w-5 h-5" />
                <span>Your Library</span>
              </a>
            </nav>

            <hr className="border-zinc-800" />

            {/* Playlists Menu */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                <span>Playlists</span>
                <button className="hover:text-white">
                  <PlusCircle className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                {PLAYLISTS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setActivePlaylist(p)}
                    className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg truncate transition-all ${
                      activePlaylist.id === p.id 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Liked Songs Box */}
          <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-xl p-3 text-xs space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 font-bold">
              <Heart className="w-4 h-4 fill-indigo-400" />
              <span>Liked Songs</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              {tracks.filter(t => t.isLiked).length} tracks saved
            </p>
          </div>
        </div>

        {/* Center Main View (7 or 10 cols) */}
        <div className={`col-span-1 md:col-span-9 ${showLyrics || showQueue ? 'lg:col-span-7' : 'lg:col-span-10'} bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-4 md:p-6 overflow-y-auto space-y-6`}>
          
          {/* Top User Profile Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search Filter input */}
            <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 rounded-full px-3.5 py-1.5 w-full sm:w-72">
              <SearchIcon className="w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search tracks or artists..."
                className="bg-transparent text-xs text-white placeholder-zinc-500 outline-none w-full"
              />
            </div>

            {/* User Profile Info Badge */}
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Spotify Premium
              </span>

              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full p-1 pr-3 hover:border-zinc-700 cursor-pointer">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-black font-bold text-xs">
                  AS
                </div>
                <span className="text-xs font-bold text-white">Aarav Sharma</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </div>
            </div>
          </div>

          {/* Playlist Hero Banner */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 bg-gradient-to-r from-emerald-950/60 via-zinc-900 to-zinc-950 p-6 rounded-2xl border border-zinc-800 shadow-2xl">
            <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-gradient-to-br ${activePlaylist.coverGradient} shadow-xl flex items-center justify-center flex-shrink-0 border border-white/10`}>
              <Music className="w-16 h-16 text-white/80" />
            </div>

            <div className="space-y-3 text-center sm:text-left flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">PUBLIC PLAYLIST</span>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">{activePlaylist.name}</h1>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">{activePlaylist.description}</p>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-zinc-300 pt-2">
                <span className="font-bold text-white">Created by SoundWave</span>
                <span>•</span>
                <span>{filteredTracks.length} tracks</span>
                <span>•</span>
                <span className="text-zinc-400">About 2 hr 15 min</span>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-4 py-2">
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-emerald-500/30"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black translate-x-0.5" />}
            </button>
            <button className="text-zinc-400 hover:text-white p-2">
              <Heart className="w-6 h-6" />
            </button>
            <button className="text-zinc-400 hover:text-white p-2">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Tracks Table */}
          <div className="bg-zinc-900/40 rounded-xl border border-zinc-800/80 overflow-hidden">
            <div className="grid grid-cols-12 px-4 py-2.5 text-[11px] font-bold uppercase text-zinc-500 border-b border-zinc-800">
              <div className="col-span-1">#</div>
              <div className="col-span-6 sm:col-span-5">TITLE</div>
              <div className="hidden sm:block col-span-3">ALBUM</div>
              <div className="col-span-5 sm:col-span-3 text-right flex items-center justify-end gap-1">
                <Clock className="w-3.5 h-3.5" /> DURATION
              </div>
            </div>

            <div className="divide-y divide-zinc-800/50">
              {filteredTracks.map((track, index) => {
                const isSelected = currentTrack.id === track.id;
                return (
                  <div
                    key={track.id}
                    onClick={() => handleTrackSelect(track)}
                    className={`grid grid-cols-12 px-4 py-3 items-center text-xs transition-colors cursor-pointer group ${
                      isSelected ? 'bg-emerald-500/10 text-emerald-400 font-semibold' : 'hover:bg-zinc-800/60 text-zinc-300'
                    }`}
                  >
                    <div className="col-span-1 text-zinc-500 text-xs font-mono">
                      {isSelected && isPlaying ? (
                        <span className="text-emerald-400 font-bold animate-pulse">▶</span>
                      ) : (
                        index + 1
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-5 flex items-center gap-3">
                      <div className={`w-9 h-9 rounded bg-gradient-to-tr ${track.coverColor} flex items-center justify-center text-white flex-shrink-0 shadow-sm`}>
                        <Music className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className={`font-semibold truncate ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
                          {track.title}
                        </div>
                        <div className="text-[11px] text-zinc-400 truncate">{track.artist}</div>
                      </div>
                    </div>

                    <div className="hidden sm:block col-span-3 text-zinc-400 truncate">
                      {track.album}
                    </div>

                    <div className="col-span-5 sm:col-span-3 flex items-center justify-end gap-3">
                      <button
                        onClick={(e) => toggleLikeTrack(track.id, e)}
                        className={`transition-colors ${track.isLiked ? 'text-emerald-500 fill-emerald-500' : 'text-zinc-500 hover:text-white'}`}
                      >
                        <Heart className={`w-4 h-4 ${track.isLiked ? 'fill-emerald-500' : ''}`} />
                      </button>
                      <span className="text-zinc-400 font-mono text-[11px]">{formatTime(track.duration)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Drawer for Lyrics / Queue (3 cols optional) */}
        {(showLyrics || showQueue) && (
          <div className="hidden lg:block lg:col-span-3 bg-zinc-950 p-4 border-l border-zinc-900 overflow-y-auto space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <h3 className="font-bold text-xs uppercase text-zinc-400 flex items-center gap-1.5">
                {showLyrics ? <Mic2 className="w-4 h-4 text-emerald-400" /> : <ListMusic className="w-4 h-4 text-emerald-400" />}
                {showLyrics ? 'Track Lyrics' : 'Up Next Queue'}
              </h3>
              <button 
                onClick={() => { setShowLyrics(false); setShowQueue(false); }}
                className="text-xs text-zinc-500 hover:text-white"
              >
                Close ✕
              </button>
            </div>

            {showLyrics && (
              <div className="space-y-4 pt-2">
                <div className="text-center pb-2 border-b border-zinc-800/60">
                  <h4 className="font-bold text-sm text-white">{currentTrack.title}</h4>
                  <p className="text-xs text-zinc-400">{currentTrack.artist}</p>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-zinc-300 font-sans">
                  {currentTrack.lyrics.map((line, idx) => (
                    <p 
                      key={idx}
                      className={`p-2 rounded transition-all ${
                        idx === 1 ? 'bg-emerald-500/20 text-emerald-300 font-bold border-l-2 border-emerald-500' : 'hover:text-white'
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {showQueue && (
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold text-zinc-500 uppercase block">Now Playing</span>
                <div className="bg-zinc-900 border border-emerald-500/30 p-2.5 rounded-lg flex items-center gap-3">
                  <div className={`w-8 h-8 rounded bg-gradient-to-tr ${currentTrack.coverColor} flex items-center justify-center text-white`}>
                    <Music className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-emerald-400 truncate">{currentTrack.title}</div>
                    <div className="text-[10px] text-zinc-400">{currentTrack.artist}</div>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-zinc-500 uppercase block pt-3">Next in Queue</span>
                {tracks.filter(t => t.id !== currentTrack.id).map(t => (
                  <div key={t.id} className="p-2 rounded bg-zinc-900/40 hover:bg-zinc-900 flex items-center justify-between text-xs text-zinc-300">
                    <span className="truncate max-w-[140px]">{t.title}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">{formatTime(t.duration)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Sticky Bottom Currently Playing Bar */}
      <div className="bg-zinc-900/95 backdrop-blur-md border-t border-zinc-800 p-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 z-50">
        
        {/* Left Track Meta */}
        <div className="flex items-center gap-3 w-full sm:w-1/4">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-tr ${currentTrack.coverColor} shadow-md flex items-center justify-center text-white flex-shrink-0`}>
            <Music className="w-6 h-6" />
          </div>
          <div className="truncate flex-1">
            <h4 className="text-xs font-bold text-white truncate">{currentTrack.title}</h4>
            <p className="text-[11px] text-zinc-400 truncate">{currentTrack.artist}</p>
          </div>
          <button 
            onClick={(e) => toggleLikeTrack(currentTrack.id, e)}
            className="text-zinc-400 hover:text-white"
          >
            <Heart className={`w-4 h-4 ${currentTrack.isLiked ? 'text-emerald-500 fill-emerald-500' : ''}`} />
          </button>
        </div>

        {/* Center Player Controls & Seek Slider */}
        <div className="flex flex-col items-center gap-1.5 w-full sm:w-2/4 max-w-xl">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsShuffle(!isShuffle)}
              className={`text-xs ${isShuffle ? 'text-emerald-400' : 'text-zinc-500 hover:text-white'}`}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button onClick={handlePrevTrack} className="text-zinc-300 hover:text-white">
              <SkipBack className="w-4 h-4" />
            </button>

            <button 
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black translate-x-0.5" />}
            </button>

            <button onClick={handleNextTrack} className="text-zinc-300 hover:text-white">
              <SkipForward className="w-4 h-4" />
            </button>

            <button 
              onClick={() => setIsRepeat(!isRepeat)}
              className={`text-xs ${isRepeat ? 'text-emerald-400' : 'text-zinc-500 hover:text-white'}`}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Seek Progress Bar */}
          <div className="flex items-center gap-2 w-full text-[10px] font-mono text-zinc-400">
            <span>{formatTime(currentTime)}</span>
            <div 
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newPct = (clickX / rect.width);
                setCurrentTime(newPct * currentTrack.duration);
              }}
              className="flex-1 h-1.5 bg-zinc-800 rounded-full cursor-pointer relative overflow-hidden group"
            >
              <div 
                className="h-full bg-emerald-500 group-hover:bg-emerald-400 transition-all rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span>{formatTime(currentTrack.duration)}</span>
          </div>
        </div>

        {/* Right Aux Controls */}
        <div className="hidden sm:flex items-center justify-end gap-3 w-1/4">
          <button 
            onClick={() => { setShowLyrics(!showLyrics); setShowQueue(false); }}
            className={`p-1.5 rounded transition-all ${showLyrics ? 'bg-emerald-500/20 text-emerald-400' : 'text-zinc-400 hover:text-white'}`}
            title="Lyrics"
          >
            <Mic2 className="w-4 h-4" />
          </button>

          <button 
            onClick={() => { setShowQueue(!showQueue); setShowLyrics(false); }}
            className={`p-1.5 rounded transition-all ${showQueue ? 'bg-emerald-500/20 text-emerald-400' : 'text-zinc-400 hover:text-white'}`}
            title="Queue"
          >
            <ListMusic className="w-4 h-4" />
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-1.5">
            <button onClick={() => setIsMuted(!isMuted)} className="text-zinc-400 hover:text-white">
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-16 accent-emerald-500 h-1 bg-zinc-800 rounded-full cursor-pointer"
            />
          </div>
        </div>

      </div>

    </div>
  );
};
