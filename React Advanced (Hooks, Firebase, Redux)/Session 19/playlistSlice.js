import { createSlice } from "@reduxjs/toolkit";

let nextId = 4;

const initialState = {
  songs: [
    { id: 1, title: "Levitating", artist: "Dua Lipa" },
    { id: 2, title: "Blinding Lights", artist: "The Weeknd" },
    { id: 3, title: "Kesariya", artist: "Arijit Singh" },
  ],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    addSong: (state, action) => {
      state.songs.push({
        id: nextId++,
        title: action.payload.title,
        artist: action.payload.artist,
      });
    },

    editSong: (state, action) => {
      const { id, title, artist } = action.payload;
      const song = state.songs.find((s) => s.id === id);
      if (song) {
        song.title = title;
        song.artist = artist;
      }
    },

    deleteSong: (state, action) => {
      state.songs = state.songs.filter((s) => s.id !== action.payload);
    },
  },
});

export const { addSong, editSong, deleteSong } = playlistSlice.actions;
export default playlistSlice.reducer;