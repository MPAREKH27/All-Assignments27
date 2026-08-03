import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSong, removeSong } from "./store";

function PlaylistManager() {
  const [songName, setSongName] = useState("");
  const playlist = useSelector((state) => state.playlist);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (songName.trim()) {
      dispatch(addSong(songName.trim()));
      setSongName("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-md">
      <h2 className="text-2xl font-bold text-white mb-1">Redux Playlist</h2>
      <p className="text-gray-400 text-xs mb-4">
        {playlist.length} song{playlist.length !== 1 ? "s" : ""} in store
      </p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter song name..."
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 text-sm"
        />
        <button
          onClick={handleAdd}
          className="px-5 py-3 rounded-xl bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-colors"
        >
          + Add
        </button>
      </div>

      {playlist.length === 0 && (
        <p className="text-gray-500 text-center py-6 text-sm">
          No songs yet. Add one above!
        </p>
      )}

      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {playlist.map((song, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-700 rounded-lg px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xs font-mono">
                {index + 1}.
              </span>
              <span className="text-white text-sm font-semibold">{song}</span>
            </div>
            <button
              onClick={() => dispatch(removeSong(index))}
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

export default PlaylistManager;