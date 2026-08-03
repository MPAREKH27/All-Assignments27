import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSong, removeSong } from "./playlistSlice";

function Playlist() {
  const songs = useSelector((state) => state.playlist.songs);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const handleAdd = () => {
    if (title.trim() && artist.trim()) {
      dispatch(addSong({ title: title.trim(), artist: artist.trim() }));
      setTitle("");
      setArtist("");
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-md">
      <h2 className="text-2xl font-bold text-white mb-1">Redux Toolkit Playlist</h2>
      <p className="text-gray-400 text-xs mb-4">
        {songs.length} song{songs.length !== 1 ? "s" : ""} · Managed by createSlice
      </p>

      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Song title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 text-sm"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Artist name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="flex-1 px-4 py-2.5 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 text-sm"
          />
          <button
            onClick={handleAdd}
            className="px-5 py-2.5 rounded-xl bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-colors"
          >
            + Add
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {songs.map((song) => (
          <div
            key={song.id}
            className="flex justify-between items-center bg-gray-700 rounded-lg px-4 py-3"
          >
            <div>
              <h4 className="text-white font-semibold text-sm">{song.title}</h4>
              <p className="text-gray-400 text-xs">{song.artist}</p>
            </div>
            <button
              onClick={() => dispatch(removeSong(song.id))}
              className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist;