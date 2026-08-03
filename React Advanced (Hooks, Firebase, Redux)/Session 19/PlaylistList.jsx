import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSong, editSong, deleteSong } from "./playlistSlice";

function PlaylistList({ user, onLogout }) {
  const songs = useSelector((state) => state.playlist.songs);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editArtist, setEditArtist] = useState("");

  const handleAdd = () => {
    if (title.trim() && artist.trim()) {
      dispatch(addSong({ title: title.trim(), artist: artist.trim() }));
      setTitle("");
      setArtist("");
    }
  };

  const startEdit = (song) => {
    setEditingId(song.id);
    setEditTitle(song.title);
    setEditArtist(song.artist);
  };

  const saveEdit = () => {
    if (editTitle.trim() && editArtist.trim()) {
      dispatch(
        editSong({
          id: editingId,
          title: editTitle.trim(),
          artist: editArtist.trim(),
        })
      );
      setEditingId(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Playlist Manager</h2>
          <p className="text-gray-400 text-xs">
            Welcome, <span className="text-purple-400">{user}</span> ·{" "}
            {songs.length} song{songs.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={onLogout}
          className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

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
            placeholder="Artist"
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

      <div className="space-y-2 max-h-[350px] overflow-y-auto">
        {songs.map((song) => (
          <div
            key={song.id}
            className="bg-gray-700 rounded-lg px-4 py-3"
          >
            {editingId === song.id ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-600 text-white text-sm border border-purple-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={editArtist}
                  onChange={(e) => setEditArtist(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                  className="w-full px-3 py-2 rounded-lg bg-gray-600 text-white text-sm border border-purple-500 focus:outline-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="flex-1 py-1.5 rounded-lg bg-green-500 text-white text-xs font-semibold hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex-1 py-1.5 rounded-lg bg-gray-500 text-white text-xs font-semibold hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-white font-semibold text-sm">
                    {song.title}
                  </h4>
                  <p className="text-gray-400 text-xs">{song.artist}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(song)}
                    className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteSong(song.id))}
                    className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaylistList;