import { usePlaylist } from "./PlaylistContext";

let renderCount = 0;

function Playlist() {
  const { songs, playSong } = usePlaylist();
  renderCount++;

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-md">
      <h2 className="text-2xl font-bold text-white mb-1">Spotify Playlist</h2>
      <p className="text-gray-400 text-xs mb-4">
        Rendered {renderCount} times (memoized — only re-renders when songs/volume change)
      </p>

      <div className="space-y-2">
        {songs.map((song) => (
          <div
            key={song.id}
            className="flex justify-between items-center bg-gray-700 rounded-lg px-4 py-3"
          >
            <div>
              <h4 className="text-white font-semibold text-sm">{song.title}</h4>
              <p className="text-gray-400 text-xs">{song.artist}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xs">{song.plays} plays</span>
              <button
                onClick={() => playSong(song.id)}
                className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-xs font-semibold hover:bg-green-600 transition-colors"
              >
                ▶ Play
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist;