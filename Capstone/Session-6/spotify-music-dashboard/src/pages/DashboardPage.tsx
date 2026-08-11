import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { PlayerBar } from '../components/PlayerBar';
import { TrackCard } from '../components/TrackCard';
import { PlaylistView } from '../components/PlaylistView';
import { SAMPLE_TRACKS, SAMPLE_PLAYLISTS, GENRE_CATEGORIES } from '../data/musicData';
import { ActiveTab, Track, Playlist } from '../types';
import { Play, Heart, Sparkles, Music, Radio, Disc, Search } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);

  const [tracks, setTracks] = useState<Track[]>(SAMPLE_TRACKS);
  const [playlists] = useState<Playlist[]>(SAMPLE_PLAYLISTS);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(SAMPLE_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Time based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleToggleLike = (trackId: string) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, liked: !t.liked } : t))
    );
  };

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handlePlayPlaylist = (playlist: Playlist) => {
    if (playlist.tracks.length > 0) {
      setCurrentTrack(playlist.tracks[0]);
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[prevIndex]);
    setIsPlaying(true);
  };

  // Filtered tracks for search tab
  const filteredTracks = tracks.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const likedTracks = tracks.filter((t) => t.liked);

  const selectedPlaylist = playlists.find((p) => p.id === selectedPlaylistId);

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden select-none">
      {/* App Body: Sidebar + Main Content */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          playlists={playlists}
          selectedPlaylistId={selectedPlaylistId}
          setSelectedPlaylistId={setSelectedPlaylistId}
          likedCount={likedTracks.length}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-neutral-950 rounded-xl my-3 mr-3 overflow-hidden border border-neutral-900 shadow-2xl relative">
          {/* Header Navbar */}
          <Header
            activeTab={activeTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* Scrollable View Container */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4">
            {/* 1. PLAYLIST DETAIL VIEW */}
            {activeTab === 'playlist' && selectedPlaylist ? (
              <PlaylistView
                playlist={selectedPlaylist}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onPlayPlaylist={handlePlayPlaylist}
                onPlayTrack={handlePlayTrack}
                onToggleLike={handleToggleLike}
              />
            ) : activeTab === 'liked' ? (
              /* 2. LIKED SONGS VIEW */
              <PlaylistView
                playlist={{
                  id: 'liked-playlist',
                  name: 'Liked Songs',
                  description: 'Your collection of favorite tracks.',
                  coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
                  tracks: likedTracks,
                }}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onPlayPlaylist={handlePlayPlaylist}
                onPlayTrack={handlePlayTrack}
                onToggleLike={handleToggleLike}
              />
            ) : activeTab === 'search' ? (
              /* 3. SEARCH VIEW */
              <div className="flex flex-col gap-6 pb-12">
                <h2 className="text-2xl font-black text-white tracking-tight">Browse All</h2>

                {searchQuery ? (
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-neutral-400 font-medium">
                      Results for &quot;<span className="text-white">{searchQuery}</span>&quot;
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {filteredTracks.map((t) => (
                        <TrackCard
                          key={t.id}
                          track={t}
                          isPlayingCurrent={currentTrack?.id === t.id && isPlaying}
                          onPlayTrack={handlePlayTrack}
                          onToggleLike={handleToggleLike}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {GENRE_CATEGORIES.map((cat) => (
                      <div
                        key={cat.name}
                        onClick={() => setSearchQuery(cat.name)}
                        className={`${cat.color} relative aspect-video p-4 rounded-xl overflow-hidden cursor-pointer shadow-md hover:scale-[1.02] transition-transform`}
                      >
                        <span className="text-lg font-black text-white leading-tight">
                          {cat.name}
                        </span>
                        <img
                          src={cat.img}
                          alt={cat.name}
                          className="w-20 h-20 absolute -bottom-2 -right-2 rotate-25 rounded-md object-cover shadow-lg"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : activeTab === 'library' ? (
              /* 4. LIBRARY VIEW */
              <div className="flex flex-col gap-6 pb-12">
                <h2 className="text-2xl font-black text-white tracking-tight">Your Library</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {tracks.map((t) => (
                    <TrackCard
                      key={t.id}
                      track={t}
                      isPlayingCurrent={currentTrack?.id === t.id && isPlaying}
                      onPlayTrack={handlePlayTrack}
                      onToggleLike={handleToggleLike}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* 5. HOME DASHBOARD VIEW */
              <div className="flex flex-col gap-8 pb-12">
                {/* Greeting Header */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Welcome back</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                    {getGreeting()}
                  </h1>
                </div>

                {/* Quick Jump 6-Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {playlists.slice(0, 6).map((pl) => (
                    <div
                      key={pl.id}
                      onClick={() => {
                        setSelectedPlaylistId(pl.id);
                        setActiveTab('playlist');
                      }}
                      className="group bg-neutral-900/80 hover:bg-neutral-800/90 rounded-lg overflow-hidden flex items-center gap-4 transition duration-200 cursor-pointer shadow-sm border border-neutral-800/50 pr-4"
                    >
                      <img
                        src={pl.coverUrl}
                        alt={pl.name}
                        className="w-16 h-16 object-cover shrink-0"
                      />
                      <span className="font-bold text-sm text-white truncate flex-1">
                        {pl.name}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPlaylist(pl);
                        }}
                        className="w-10 h-10 rounded-full bg-green-500 text-black opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center shadow-lg shadow-black/50 shrink-0"
                      >
                        <Play className="w-4 h-4 fill-black ml-0.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Made For You Section */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Made For You</h2>
                      <p className="text-xs text-neutral-400 font-medium">
                        Personalized tracks based on your session listening habits
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('library')}
                      className="text-xs font-bold text-neutral-400 hover:text-white transition cursor-pointer"
                    >
                      Show all
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {tracks.slice(0, 5).map((t) => (
                      <TrackCard
                        key={t.id}
                        track={t}
                        isPlayingCurrent={currentTrack?.id === t.id && isPlaying}
                        onPlayTrack={handlePlayTrack}
                        onToggleLike={handleToggleLike}
                      />
                    ))}
                  </div>
                </div>

                {/* Recently Played Section */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Recently Played</h2>
                      <p className="text-xs text-neutral-400 font-medium">
                        Jump back into your recent synthwave & focus sessions
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {tracks.slice(3).map((t) => (
                      <TrackCard
                        key={t.id}
                        track={t}
                        isPlayingCurrent={currentTrack?.id === t.id && isPlaying}
                        onPlayTrack={handlePlayTrack}
                        onToggleLike={handleToggleLike}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Bottom Sticky Player Bar */}
      <PlayerBar
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPauseToggle={() => setIsPlaying(!isPlaying)}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
        onToggleLike={handleToggleLike}
      />
    </div>
  );
};
