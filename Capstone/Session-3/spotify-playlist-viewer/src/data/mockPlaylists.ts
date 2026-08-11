import { Playlist } from '../types';

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'deep-focus-2026',
    name: 'Deep Focus & Ambient Coding',
    description: 'Minimalist ambient, synthwave, and instrumental beats engineered for uninterrupted flow state.',
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80',
    creator: 'Spotify Sound Engineering',
    followersCount: 1428900,
    tracks: [
      {
        id: 'track-1',
        title: 'Cybernetic Echoes',
        artist: 'Syntax & Null',
        album: 'Terminal Horizon',
        coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80',
        durationSeconds: 214,
        popularity: 92,
        genre: 'Synthwave',
        releaseYear: 2026
      },
      {
        id: 'track-2',
        title: 'Algorithmic Pulse',
        artist: 'Binary Drift',
        album: 'Substack Sessions',
        coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80',
        durationSeconds: 188,
        popularity: 88,
        genre: 'Ambient',
        releaseYear: 2025
      },
      {
        id: 'track-3',
        title: 'Async Waves',
        artist: 'Promise.all()',
        album: 'Event Loop',
        coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
        durationSeconds: 245,
        popularity: 95,
        genre: 'Lo-Fi Chill',
        releaseYear: 2026
      },
      {
        id: 'track-4',
        title: 'Neon Recursion',
        artist: 'Bytecode Trio',
        album: 'Stack Overflow',
        coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80',
        durationSeconds: 196,
        popularity: 84,
        genre: 'Chillhop',
        releaseYear: 2026
      },
      {
        id: 'track-5',
        title: 'Midnight Git Commit',
        artist: 'DevOps Collective',
        album: 'Main Branch',
        coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&auto=format&fit=crop&q=80',
        durationSeconds: 230,
        popularity: 91,
        genre: 'Ambient',
        releaseYear: 2025
      }
    ]
  },
  {
    id: 'top-hits-2026',
    name: 'Global Top Hits 2026',
    description: 'The hottest chart-topping tracks streaming worldwide right now.',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    creator: 'Spotify Charts',
    followersCount: 8920150,
    tracks: [
      {
        id: 'hit-1',
        title: 'Starlight Avenue',
        artist: 'Luna Vane',
        album: 'Neon Velvet',
        coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&auto=format&fit=crop&q=80',
        durationSeconds: 202,
        popularity: 98,
        genre: 'Electropop',
        releaseYear: 2026
      },
      {
        id: 'hit-2',
        title: 'Midnight Frequency',
        artist: 'Solaris',
        album: 'Solaris Unplugged',
        coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80',
        durationSeconds: 175,
        popularity: 96,
        genre: 'Indie Pop',
        releaseYear: 2026
      },
      {
        id: 'hit-3',
        title: 'Golden Skyline',
        artist: 'The Sunset Club',
        album: 'Coast to Coast',
        coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&auto=format&fit=crop&q=80',
        durationSeconds: 228,
        popularity: 94,
        genre: 'Tropical House',
        releaseYear: 2026
      }
    ]
  },
  {
    id: 'lofi-cafe',
    name: 'Lo-Fi Cafe & Rainy Days',
    description: 'Warm vinyl crackles, soft keys, and peaceful acoustic guitars for relaxing and studying.',
    coverUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80',
    creator: 'ChilledCow Vibes',
    followersCount: 3410220,
    tracks: [
      {
        id: 'lofi-1',
        title: 'Raindrops on Glass',
        artist: 'Coffee House Beats',
        album: 'Sunday Morning',
        coverUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&auto=format&fit=crop&q=80',
        durationSeconds: 165,
        popularity: 89,
        genre: 'Lo-Fi Hip Hop',
        releaseYear: 2025
      },
      {
        id: 'lofi-2',
        title: 'Warm Espresso',
        artist: 'Acoustic Nook',
        album: 'Barista Melodies',
        coverUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&auto=format&fit=crop&q=80',
        durationSeconds: 182,
        popularity: 90,
        genre: 'Jazz Hop',
        releaseYear: 2026
      }
    ]
  }
];
