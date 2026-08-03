import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "./playlistSlice";

const store = configureStore({
  reducer: {
    playlist: playlistReducer,
  },
});

export default store;