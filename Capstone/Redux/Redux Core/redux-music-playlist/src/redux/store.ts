import { legacy_createStore as createStore } from 'redux';
import { Song, PlaylistAction, ActionLog } from '../types';
import { PRESET_CATALOG, DEFAULT_COVER } from '../data/presetSongs';

// 1. Action Types
export const ADD_SONG = 'ADD_SONG' as const;
export const REMOVE_SONG = 'REMOVE_SONG' as const;
export const CLEAR_PLAYLIST = 'CLEAR_PLAYLIST' as const;

// Action Creators
export const addSong = (songName: string | Song) => ({
  type: ADD_SONG,
  payload: songName,
});

export const removeSong = (songName: string) => ({
  type: REMOVE_SONG,
  payload: songName,
});

export const clearPlaylist = () => ({
  type: CLEAR_PLAYLIST,
});

// 2 & 5. Reducer Function: playlistReducer
export const initialPlaylistState: Song[] = [];

export function playlistReducer(
  state: Song[] = initialPlaylistState,
  action: PlaylistAction
): Song[] {
  switch (action.type) {
    case ADD_SONG: {
      let newSong: Song;
      if (typeof action.payload === 'string') {
        const info = PRESET_CATALOG[action.payload] || {};
        newSong = {
          id: `song-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          title: action.payload,
          artist: info.artist || 'Popular Artist',
          album: info.album || 'Single',
          duration: info.duration || '3:30',
          coverUrl: info.coverUrl || DEFAULT_COVER,
          addedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      } else {
        newSong = action.payload;
      }
      // Return new array with added song
      return [...state, newSong];
    }

    case REMOVE_SONG: {
      // Step 5: Filter method to remove the song from the playlist array
      const targetNameOrId = action.payload;
      return state.filter(
        (song) => song.title !== targetNameOrId && song.id !== targetNameOrId
      );
    }

    case CLEAR_PLAYLIST: {
      return [];
    }

    default:
      return state;
  }
}

// Global action logs buffer for the live state terminal
export const actionLogs: ActionLog[] = [];
type LogListener = (logs: ActionLog[]) => void;
const listeners: Set<LogListener> = new Set();

export const subscribeToLogs = (listener: LogListener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

function logAction(action: any, stateAfter: Song[]) {
  const entry: ActionLog = {
    id: `log-${Date.now()}-${Math.random()}`,
    timestamp: new Date().toLocaleTimeString(),
    actionType: action.type,
    payload: action.payload,
    stateAfter,
  };
  actionLogs.unshift(entry);
  listeners.forEach((l) => l([...actionLogs]));
}

// Custom store middleware wrapper or enhancer
const loggingReducer = (state: Song[] | undefined, action: any) => {
  const nextState = playlistReducer(state, action);
  if (action.type !== '@@INIT' && !action.type.startsWith('@@redux')) {
    logAction(action, nextState);
  }
  return nextState;
};

// 3. Set up Redux store using createStore from redux
export const store = createStore(loggingReducer);

// Requirement #3 execution: Dispatch two addSong actions initially
console.log('--- Initializing Redux Playlist Store ---');
store.dispatch(addSong('Kesariya'));
store.dispatch(addSong('Shape of You'));
console.log('Updated Redux Store State after initial dispatches:', store.getState());
