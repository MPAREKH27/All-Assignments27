import { Song } from '../types';

export const PRESET_CATALOG: Record<string, Partial<Song>> = {
  'Kesariya': {
    artist: 'Arijit Singh, Pritam',
    album: 'Brahmāstra',
    duration: '4:28',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80',
  },
  'Shape of You': {
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    duration: '3:53',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80',
  },
  'Blinding Lights': {
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80',
  },
  'Levitating': {
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: '3:23',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&auto=format&fit=crop&q=80',
  },
  'Starboy': {
    artist: 'The Weeknd ft. Daft Punk',
    album: 'Starboy',
    duration: '3:50',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
  },
  'Pasoori': {
    artist: 'Ali Sethi, Shae Gill',
    album: 'Coke Studio Season 14',
    duration: '3:44',
    coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&auto=format&fit=crop&q=80',
  },
  'As It Was': {
    artist: 'Harry Styles',
    album: "Harry's House",
    duration: '2:47',
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80',
  },
  'Unstoppable': {
    artist: 'Sia',
    album: 'This Is Acting',
    duration: '3:37',
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&auto=format&fit=crop&q=80',
  }
};

export const DEFAULT_COVER = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80';
