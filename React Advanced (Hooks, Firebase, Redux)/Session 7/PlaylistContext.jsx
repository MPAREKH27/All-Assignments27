import { createContext, useReducer, useMemo, useContext, useState } from "react";

const PlaylistContext = createContext();

const initialSongs = [
  { id: 1, title: "Levitating", artist: "Dua Lipa", plays: 0 },
  { id: 2, title: "Blinding Lights", artist: "The Weeknd", plays: 0 },
  { id: 3, title: "Kesariya", artist: "Arijit Singh", plays: 0 },
  { id: 4, title: "Shape of You", artist: "Ed Sheeran", plays: 0 },
  { id: 5, title: "Stay", artist: "Justin Bieber", plays: 0 },
];

function playlistReducer(state, action) {
  switch (action.type) {
    case "PLAY":
      return state.map((s) =>
        s.id === action.id ? { ...s, plays: s.plays + 1 } : s
      );
    case "ADD_SONG":
      return [...state, action.song];
    default:
      return state;
  }
}

export function PlaylistProvider({ children }) {
  const [songs, dispatch] = useReducer(playlistReducer, initialSongs);
  const [volume, setVolume] = useState(80);

  const playSong = (id) => dispatch({ type: "PLAY", id });
  const addSong = (song) => dispatch({ type: "ADD_SONG", song });

  const contextValue = useMemo(
    () => ({ songs, volume, setVolume, playSong, addSong }),
    [songs, volume, playSong, addSong]
  );

  return (
    <PlaylistContext.Provider value={contextValue}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  return useContext(PlaylistContext);
}