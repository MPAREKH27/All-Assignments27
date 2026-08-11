export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  durationSeconds: number;
  popularity: number; // 0 - 100
  genre: string;
  releaseYear: number;
  previewAudioUrl?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  creator: string;
  followersCount: number;
  tracks: Track[];
}

export interface ProjectFile {
  path: string;
  name: string;
  type: 'file' | 'folder';
  description: string;
  content?: string;
  children?: ProjectFile[];
}

export interface LogEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  source: string;
  message: string;
  details?: any;
}
