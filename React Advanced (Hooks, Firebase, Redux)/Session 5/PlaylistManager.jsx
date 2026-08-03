import { useState, useCallback } from "react";
import SongItem from "./SongItem";

const initialSongs = [
  { id: 1, title: "Levitating", artist: "Dua Lipa", isFavorite: false },
  { id: 2, title: "Blinding Lights", artist: "The Weeknd", isFavorite: false },
  { id: 3, title: "Kesariya", artist: "Arijit Singh", isFavorite: false },
  { id: 4, title: "Shape of You", artist: "Ed Sheeran", isFavorite: false },
  { id: 5, title: "Believer", artist: "Imagine Dragons", isFavorite: false },
  { id: 6, title: "Agar Tum Saath Ho", artist: "Arijit Singh", isFavorite: false },
  { id: 7, title: "Stay", artist: "Justin Bieber", isFavorite: false },
  { id: 8, title: "Raataan Lambiyan", artist: "Jubin Nautiyal", isFavorite: false },
  { id: 9, title: "Peaches", artist: "Justin Bieber", isFavorite: false },
  { id: 10, title: "Tum Hi Ho", artist: "Arijit Singh", isFavorite: false },
];

function PlaylistManager() {
  const [songs, setSongs] = useState(initialSongs);

  const toggleFavorite = useCallback((id) => {
    setSongs((prev) =>
      prev.map((song) =>
        song.id === id ? { ...song, isFavorite: !song.isFavorite } : song
      )
    );
  }, []);

  const favCount = songs.filter((s) => s.isFavorite).length;

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-md">
      <h2 className="text-2xl font-bold text-white mb-1">Playlist Manager</h2>
      <p className="text-gray-400 text-sm mb-4">
        {favCount} of {songs.length} songs marked as favorite
      </p>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {songs.map((song) => (
          <SongItem
            key={song.id}
            song={song}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default PlaylistManager;