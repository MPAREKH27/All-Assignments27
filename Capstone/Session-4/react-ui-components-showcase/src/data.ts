import { Playlist, SocialLink, FieldDefinition } from './types';

// Generated Asset Images from Gemini Image Gen Tool
import lofiCover from './assets/images/lofi_chill_cover_1786435793397.jpg';
import topHitsCover from './assets/images/tophits_2026_cover_1786435814283.jpg';
import stadiumCover from './assets/images/stadium_anthems_cover_1786435831399.jpg';

/** 1. 3 Music Playlists data passed into PlaylistCard via props */
export const SPOTIFY_PLAYLISTS: Playlist[] = [
  {
    id: '1',
    title: 'Top Hits 2026 India',
    coverUrl: topHitsCover,
    songCount: 50,
    description: 'The hottest chartbusters from Bollywood, Punjabi Pop, and South Cinema.',
    creator: 'Spotify Editorial',
    tags: ['Bollywood', 'Pop', 'Trending'],
    songs: [
      { title: 'Kesariya 2.0', artist: 'Arijit Singh', duration: '3:28' },
      { title: 'Chaleya Beats', artist: 'Anirudh Ravichander', duration: '3:10' },
      { title: 'Lover Remix', artist: 'Diljit Dosanjh', duration: '2:55' },
    ],
  },
  {
    id: '2',
    title: 'Late Night Lo-Fi Chill',
    coverUrl: lofiCover,
    songCount: 38,
    description: 'Relaxing ambient beats & soothing synthwaves for deep focus and study.',
    creator: 'Lofi Girl India',
    tags: ['Instrumental', 'Chill', 'Study'],
    songs: [
      { title: 'Midnight Chai', artist: 'ChilledCow Beats', duration: '2:14' },
      { title: 'Rainy Monsoon Dusk', artist: 'Kunal Music', duration: '2:40' },
      { title: 'Monsoon Cafe', artist: 'Sitar Chillout', duration: '3:05' },
    ],
  },
  {
    id: '3',
    title: 'IPL Stadium Anthems',
    coverUrl: stadiumCover,
    songCount: 24,
    description: 'High-energy cricket stadium chants, trumpet solos & match win anthems.',
    creator: 'IPL Official',
    tags: ['Cricket', 'High Energy', 'Workout'],
    songs: [
      { title: 'Whistle Podu Theme', artist: 'CSK Band', duration: '3:45' },
      { title: 'Ee Sala Cup Namde Chant', artist: 'RCB Choir', duration: '2:30' },
      { title: 'Duniya Hila Denge', artist: 'MI Brass Unit', duration: '3:12' },
    ],
  },
];

/** 2. Flipkart Footer Social Media Links array passed via props */
export const FLIPKART_SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'fb',
    name: 'Facebook',
    platform: 'facebook',
    url: 'https://facebook.com',
  },
  {
    id: 'tw',
    name: 'X (Twitter)',
    platform: 'twitter',
    url: 'https://twitter.com',
  },
  {
    id: 'ig',
    name: 'Instagram',
    platform: 'instagram',
    url: 'https://instagram.com',
  },
  {
    id: 'yt',
    name: 'YouTube',
    platform: 'youtube',
    url: 'https://youtube.com',
  },
  {
    id: 'li',
    name: 'LinkedIn',
    platform: 'linkedin',
    url: 'https://linkedin.com',
  },
];

/** 3. Field Definitions Array for Dynamic Form (IPL Fantasy League 'Sign Up') */
export const IPL_FANTASY_FIELD_DEFINITIONS: FieldDefinition[] = [
  {
    name: 'fullName',
    label: 'Full Name',
    type: 'text',
    placeholder: 'e.g. Virat Kohli',
    required: true,
    helpText: 'As per your government ID for prize payouts',
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'e.g. virat@fantasyipl.com',
    required: true,
  },
  {
    name: 'favoriteTeam',
    label: 'Favorite IPL Franchise',
    type: 'select',
    required: true,
    placeholder: 'Select your team',
    options: [
      { label: 'Royal Challengers Bengaluru (RCB)', value: 'RCB' },
      { label: 'Chennai Super Kings (CSK)', value: 'CSK' },
      { label: 'Mumbai Indians (MI)', value: 'MI' },
      { label: 'Kolkata Knight Riders (KKR)', value: 'KKR' },
      { label: 'Rajasthan Royals (RR)', value: 'RR' },
      { label: 'Sunrisers Hyderabad (SRH)', value: 'SRH' },
      { label: 'Delhi Capitals (DC)', value: 'DC' },
      { label: 'Gujarat Titans (GT)', value: 'GT' },
    ],
  },
  {
    name: 'captainRole',
    label: 'Preferred Captain Pick Strategy',
    type: 'radio',
    required: true,
    options: [
      { label: 'Opening Batsman (2x Points)', value: 'BAT' },
      { label: 'Pace All-Rounder', value: 'ALL' },
      { label: 'Spin Specialist Wicket-taker', value: 'BOWL' },
    ],
  },
  {
    name: 'squadName',
    label: 'Fantasy Squad Team Name',
    type: 'text',
    placeholder: 'e.g. Bengaluru XI Warriors',
    required: true,
  },
  {
    name: 'managerBio',
    label: 'Manager Bio / Strategy Note',
    type: 'textarea',
    placeholder: 'Briefly describe your team strategy (e.g., Heavy power-hitters in death overs)',
  },
  {
    name: 'acceptTerms',
    label: 'I accept IPL Fantasy Rules, FairPlay terms, and age 18+ eligibility guidelines',
    type: 'checkbox',
    required: true,
  },
];
