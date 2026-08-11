/**
 * Next.js Pages Router Index Page Placeholder
 * Logs NEXT_PUBLIC_SPOTIFY_API_KEY using process.env.NEXT_PUBLIC_SPOTIFY_API_KEY
 */

import { printZomatoApiConfig } from '../utils/api.js';

// Get Spotify API Key from process.env (Next.js) or fallback
const spotifyApiKey = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SPOTIFY_API_KEY) || 'abc123';

// Log variable on module load
console.log('🎵 [Spotify Playlist Viewer] process.env.NEXT_PUBLIC_SPOTIFY_API_KEY:', spotifyApiKey);

export function IndexPage() {
  const spotifyKey = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SPOTIFY_API_KEY) || 'abc123';
  
  console.log('🎵 [Render] Current Spotify API Key:', spotifyKey);

  return {
    title: "Spotify Playlist Viewer Home",
    spotifyApiKey: spotifyKey,
    logKeyToConsole: () => {
      console.log('🎵 [User Trigger] process.env.NEXT_PUBLIC_SPOTIFY_API_KEY:', spotifyKey);
      printZomatoApiConfig();
    }
  };
}

export default IndexPage;
