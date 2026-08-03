import React from "react";

const SongItem = React.memo(function SongItem({ song, onToggleFavorite }) {
  console.log(`Rendering: ${song.title}`);

  return (
    <div className="flex justify-between items-center bg-gray-700 rounded-lg px-4 py-3">
      <div>
        <h4 className="text-white font-semibold text-sm">{song.title}</h4>
        <p className="text-gray-400 text-xs">{song.artist}</p>
      </div>

      <button
        onClick={() => onToggleFavorite(song.id)}
        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
          song.isFavorite
            ? "bg-yellow-500 text-white"
            : "bg-gray-600 text-gray-300 hover:bg-gray-500"
        }`}
      >
        {song.isFavorite ? "★ Favorite" : "☆ Mark Fav"}
      </button>
    </div>
  );
});

export default SongItem;