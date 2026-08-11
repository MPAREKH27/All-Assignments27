import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSong } from '../redux/store';
import { PRESET_CATALOG } from '../data/presetSongs';
import { Song } from '../types';
import { Plus, Music2, Sparkles, Check } from 'lucide-react';

export const AddSongForm: React.FC = () => {
  const dispatch = useDispatch();
  const playlist = useSelector((state: Song[]) => state);

  const [customTitle, setCustomTitle] = useState('');
  const [customArtist, setCustomArtist] = useState('');
  const [customAlbum, setCustomAlbum] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const popularSongs = Object.keys(PRESET_CATALOG);

  const handleQuickAdd = (songName: string) => {
    dispatch(addSong(songName));
    setLastAdded(songName);
    setTimeout(() => setLastAdded(null), 2000);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    if (customArtist.trim() || customAlbum.trim()) {
      // Add custom Song object
      const newSongObj: Song = {
        id: `custom-${Date.now()}`,
        title: customTitle.trim(),
        artist: customArtist.trim() || 'Independent Artist',
        album: customAlbum.trim() || 'Single',
        duration: `${Math.floor(Math.random() * 2) + 2}:${Math.floor(Math.random() * 50 + 10)}`,
        coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
        addedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      dispatch(addSong(newSongObj));
    } else {
      // Step 1: Dispatch string name as payload
      dispatch(addSong(customTitle.trim()));
    }

    setLastAdded(customTitle.trim());
    setCustomTitle('');
    setCustomArtist('');
    setCustomAlbum('');
    setTimeout(() => setLastAdded(null), 2500);
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 md:p-6 mb-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Dispatch <code className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded text-xs">addSong(payload)</code>
            </h2>
            <p className="text-xs text-zinc-400">
              Add new tracks to your Redux store playlist state
            </p>
          </div>
        </div>

        {lastAdded && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium border border-emerald-500/30 animate-fade-in">
            <Check className="w-3.5 h-3.5" />
            Dispatched addSong('{lastAdded}')
          </div>
        )}
      </div>

      {/* Quick Add Preset Buttons */}
      <div className="mb-5">
        <div className="text-xs font-semibold text-zinc-400 mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Quick Add Tracks (Preset Catalog):
        </div>
        <div className="flex flex-wrap gap-2">
          {popularSongs.map((songName) => {
            const isAlreadyInPlaylist = playlist.some(
              (s) => s.title.toLowerCase() === songName.toLowerCase()
            );

            return (
              <button
                key={songName}
                onClick={() => handleQuickAdd(songName)}
                id={`quick-add-${songName.toLowerCase().replace(/\s+/g, '-')}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition border ${
                  isAlreadyInPlaylist
                    ? 'bg-zinc-800/80 text-zinc-300 border-zinc-700/80 hover:bg-zinc-700 hover:border-emerald-500/40'
                    : 'bg-zinc-900 text-zinc-200 border-zinc-700/60 hover:border-emerald-500 hover:text-emerald-300 hover:bg-emerald-950/30'
                }`}
              >
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                <span>{songName}</span>
                {isAlreadyInPlaylist && (
                  <span className="text-[10px] text-zinc-400 bg-zinc-800 px-1.5 py-0.2 rounded">
                    x{playlist.filter((s) => s.title === songName).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Add Input Form */}
      <form onSubmit={handleAddCustom} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Music2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Enter song name (e.g. 'Kesariya', 'Shape of You', or custom title)..."
              id="song-title-input"
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-950/80 border border-zinc-800 focus:border-emerald-500 rounded-xl text-white text-sm placeholder-zinc-500 outline-none transition shadow-inner"
            />
          </div>

          <button
            type="submit"
            disabled={!customTitle.trim()}
            id="add-song-btn"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-black font-bold text-sm flex items-center justify-center gap-2 transition active:scale-95 shadow-md shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            Add Song
          </button>
        </div>

        {/* Optional artist/album fields toggle */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-zinc-400 hover:text-emerald-400 transition underline underline-offset-4"
          >
            {showAdvanced ? '- Hide extra details' : '+ Add artist & album details (optional)'}
          </button>
        </div>

        {showAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-zinc-800/60 animate-fade-in">
            <input
              type="text"
              value={customArtist}
              onChange={(e) => setCustomArtist(e.target.value)}
              placeholder="Artist Name (optional)"
              className="px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-xs placeholder-zinc-500 outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              value={customAlbum}
              onChange={(e) => setCustomAlbum(e.target.value)}
              placeholder="Album Name (optional)"
              className="px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-xs placeholder-zinc-500 outline-none focus:border-emerald-500"
            />
          </div>
        )}
      </form>
    </div>
  );
};
