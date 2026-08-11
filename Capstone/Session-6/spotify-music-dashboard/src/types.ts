export interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl: string;
  duration: number; // in seconds
  genre: string;
  liked?: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  tracks: Track[];
  createdBy?: string;
}

export type ActiveTab = 'home' | 'search' | 'library' | 'liked' | 'playlist';
