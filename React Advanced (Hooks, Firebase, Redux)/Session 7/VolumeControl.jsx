import { usePlaylist } from "./PlaylistContext";

function VolumeControl() {
  const { volume, setVolume } = usePlaylist();

  return (
    <div className="bg-gray-800 rounded-2xl p-4 shadow-2xl w-full max-w-md">
      <div className="flex items-center gap-4">
        <span className="text-white text-sm font-semibold">🔊 Volume</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="flex-1 accent-green-500"
        />
        <span className="text-green-400 font-bold text-sm w-10 text-right">
          {volume}%
        </span>
      </div>
    </div>
  );
}

export default VolumeControl;