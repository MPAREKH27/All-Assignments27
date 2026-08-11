export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  addedAt: string;
}

export interface ActionLog {
  id: string;
  timestamp: string;
  actionType: string;
  payload: any;
  stateAfter: Song[];
}

export type PlaylistState = Song[];

export interface AddSongAction {
  type: 'ADD_SONG';
  payload: string | Song;
}

export interface RemoveSongAction {
  type: 'REMOVE_SONG';
  payload: string; // song title or id
}

export interface ClearPlaylistAction {
  type: 'CLEAR_PLAYLIST';
}

export interface LoadPresetAction {
  type: 'LOAD_PRESET';
  payload: (string | Song)[];
}

export type PlaylistAction =
  | AddSongAction
  | RemoveSongAction
  | ClearPlaylistAction
  | LoadPresetAction;
