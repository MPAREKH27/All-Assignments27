import { createStore } from "redux";

const ADD_SONG = "ADD_SONG";
const REMOVE_SONG = "REMOVE_SONG";

export function addSong(name) {
  return { type: ADD_SONG, payload: name };
}

export function removeSong(index) {
  return { type: REMOVE_SONG, payload: index };
}

const initialState = {
  playlist: [],
};

function playlistReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SONG:
      return {
        ...state,
        playlist: [...state.playlist, action.payload],
      };

    case REMOVE_SONG:
      return {
        ...state,
        playlist: state.playlist.filter((_, i) => i !== action.payload),
      };

    default:
      return state;
  }
}

const store = createStore(playlistReducer);

export default store;