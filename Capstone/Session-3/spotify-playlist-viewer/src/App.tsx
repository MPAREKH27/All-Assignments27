import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SpotifyViewer } from './components/SpotifyViewer';
import { FileExplorer } from './components/FileExplorer';
import { ZomatoApiTester } from './components/ZomatoApiTester';
import { AiEnvGenerator } from './components/AiEnvGenerator';
import { AudioPlayer } from './components/AudioPlayer';
import { MOCK_PLAYLISTS } from './data/mockPlaylists';
import { Track, ProjectFile } from './types';
import { printZomatoApiConfig } from './utils/api';

export default function App() {
  const [activeTab, setActiveTab] = useState<'spotify' | 'explorer' | 'zomato' | 'ai-env'>('spotify');
  
  // Track State
  const [currentTrack, setCurrentTrack] = useState<Track | null>(MOCK_PLAYLISTS[0].tracks[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Environment Keys
  const spotifyKey = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SPOTIFY_API_KEY) || 'abc123';
  const zomatoKey = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_ZOMATO_API_KEY) || 'zomato_sec_994827164';
  const zomatoUrl = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_ZOMATO_API_URL) || 'https://api.zomato.com/v2.1';

  // Console Logs State
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    `[App Initialization] Loaded process.env.NEXT_PUBLIC_SPOTIFY_API_KEY = "${spotifyKey}"`,
    `[App Initialization] Loaded NEXT_PUBLIC_ZOMATO_API_KEY = "${zomatoKey}"`,
    `[App Initialization] Loaded NEXT_PUBLIC_ZOMATO_API_URL = "${zomatoUrl}"`
  ]);

  // File Tree Data for Explorer
  const projectFiles: ProjectFile[] = [
    {
      path: '.env.local',
      name: '.env.local',
      type: 'file',
      description: 'Local environment variable file containing NEXT_PUBLIC_ keys',
      content: `# Spotify API Key
NEXT_PUBLIC_SPOTIFY_API_KEY="abc123"

# Zomato API Configuration
NEXT_PUBLIC_ZOMATO_API_KEY="zomato_sec_994827164"
NEXT_PUBLIC_ZOMATO_API_URL="https://api.zomato.com/v2.1"`
    },
    {
      path: 'ai_env_example.txt',
      name: 'ai_env_example.txt',
      type: 'file',
      description: 'ChatGPT prompt and secure .env.local template for OpenAI API & Firebase',
      content: `================================================================================
PROMPT USED (ChatGPT Prompt)
================================================================================
"Act as a senior full-stack developer and security expert. Write a comprehensive, production-ready, and secure .env.local file template for a Next.js (13+ App/Pages router) application that integrates with both the OpenAI API and Firebase (Authentication, Firestore, Storage, Analytics). 

Please observe strict security best practices for environment variables in Next.js:
1. Clearly distinguish between server-only secret keys (which MUST NOT use the NEXT_PUBLIC_ prefix) and client-exposed config values (which require NEXT_PUBLIC_).
2. Add inline comment documentation explaining what each variable is for and where to locate it in the respective developer consoles.
3. Include placeholders for both standard OpenAI keys and optional organization/project identifiers.
4. Provide security guidelines regarding .gitignore, key rotation, and domain restriction."

================================================================================
GENERATED .env.local CONTENT RECEIVED FROM CHATGPT
================================================================================
# ==============================================================================
# SECURE NEXT.JS ENVIRONMENT VARIABLES (.env.local)
# Tech Stack: Next.js + OpenAI API + Firebase (Auth, Firestore, Storage)
# IMPORTANT: DO NOT COMMIT THIS FILE TO GIT REPOSITORY.
# Add .env.local to your .gitignore file.
# ==============================================================================

# 1. OPENAI CONFIGURATION (SERVER-SIDE SECRETS)
OPENAI_API_KEY="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
OPENAI_ORG_ID="org-xxxxxxxxxxxxxxxx"
OPENAI_PROJECT_ID="proj_xxxxxxxxxxxxxxxx"
NEXT_PUBLIC_OPENAI_DEFAULT_MODEL="gpt-4o"

# 2. FIREBASE PUBLIC CONFIGURATION (CLIENT-SIDE)
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyA1234567890abcdefghijklmnopqrstuv"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="spotify-playlist-viewer.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="spotify-playlist-viewer"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="spotify-playlist-viewer.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789012"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789012:web:a1b2c3d4e5f6g7h8i9j0"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-ABC123XYZ"

# 3. FIREBASE ADMIN SDK (SERVER-SIDE SECRETS)
FIREBASE_ADMIN_PROJECT_ID="spotify-playlist-viewer"
FIREBASE_ADMIN_CLIENT_EMAIL="firebase-adminsdk-xxxxx@spotify-playlist-viewer.iam.gserviceaccount.com"
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\\n-----END PRIVATE KEY-----\\n"

# 4. APP BASE URL & ENVIRONMENT
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"`
    },
    {
      path: 'src',
      name: 'src',
      type: 'folder',
      description: 'Main source directory',
      children: [
        {
          path: 'src/components',
          name: 'components',
          type: 'folder',
          description: 'Scalable UI components folder',
          children: [
            {
              path: 'src/components/index.js',
              name: 'index.js',
              type: 'file',
              description: 'Placeholder entry point for scalable UI components',
              content: `/**
 * Components module entry point
 * Scalable component directory placeholder
 */

export const HeaderPlaceholder = () => "Header Component Placeholder";
export const PlaylistCardPlaceholder = () => "Playlist Card Placeholder";
export default {
  moduleName: "components",
  description: "Scalable UI Components Directory",
};`
            }
          ]
        },
        {
          path: 'src/pages',
          name: 'pages',
          type: 'folder',
          description: 'Next.js Pages router folder',
          children: [
            {
              path: 'src/pages/index.js',
              name: 'index.js',
              type: 'file',
              description: 'Primary page that logs process.env.NEXT_PUBLIC_SPOTIFY_API_KEY',
              content: `/**
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

export default IndexPage;`
            }
          ]
        },
        {
          path: 'src/utils',
          name: 'utils',
          type: 'folder',
          description: 'Scalable helper utilities folder',
          children: [
            {
              path: 'src/utils/index.js',
              name: 'index.js',
              type: 'file',
              description: 'Placeholder entry point for helper functions',
              content: `/**
 * Utils module entry point
 * Scalable helper utilities directory placeholder
 */

export * from './api.js';

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return \`\${mins}:\${secs < 10 ? '0' : ''}\${secs}\`;
};

export default {
  moduleName: "utils",
  description: "Scalable Helper Utilities Directory",
};`
            },
            {
              path: 'src/utils/api.js',
              name: 'api.js',
              type: 'file',
              description: 'Function that reads Zomato API variables and logs them to console',
              content: `/**
 * Zomato API Helper Utility
 * Reads Zomato API environment variables and prints configuration to the console.
 */

export function printZomatoApiConfig() {
  const apiKey = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_ZOMATO_API_KEY)
    || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ZOMATO_API_KEY)
    || "zomato_sec_994827164";

  const apiUrl = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_ZOMATO_API_URL)
    || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ZOMATO_API_URL)
    || "https://api.zomato.com/v2.1";

  const timestamp = new Date().toISOString();

  console.log("=========================================");
  console.log("🍽️ ZOMATO API CONFIGURATION LOGGED AT:", timestamp);
  console.log("🔑 NEXT_PUBLIC_ZOMATO_API_KEY:", apiKey);
  console.log("🌐 NEXT_PUBLIC_ZOMATO_API_URL:", apiUrl);
  console.log("=========================================");

  return { apiKey, apiUrl, timestamp, status: "Config successfully loaded from environment" };
}`
            }
          ]
        }
      ]
    }
  ];

  // Triggers
  const handleLogSpotifyKey = () => {
    const timestamp = new Date().toLocaleTimeString();
    const message = `🎵 [${timestamp}] process.env.NEXT_PUBLIC_SPOTIFY_API_KEY = "${spotifyKey}"`;
    console.log('🎵 [Spotify Playlist Viewer]', message);
    setConsoleLogs((prev) => [...prev, message]);
  };

  const handleRunZomatoApi = () => {
    const res = printZomatoApiConfig();
    const timestamp = new Date().toLocaleTimeString();
    const msg1 = `🍽️ [${timestamp}] utils/api.js -> printZomatoApiConfig() invoked!`;
    const msg2 = `🔑 NEXT_PUBLIC_ZOMATO_API_KEY = "${res.apiKey}"`;
    const msg3 = `🌐 NEXT_PUBLIC_ZOMATO_API_URL = "${res.apiUrl}"`;
    setConsoleLogs((prev) => [...prev, msg1, msg2, msg3]);
  };

  const handleNextTrack = () => {
    if (!currentTrack) return;
    const allTracks = MOCK_PLAYLISTS.flatMap((p) => p.tracks);
    const currIdx = allTracks.findIndex((t) => t.id === currentTrack.id);
    const nextIdx = (currIdx + 1) % allTracks.length;
    setCurrentTrack(allTracks[nextIdx]);
  };

  const handlePrevTrack = () => {
    if (!currentTrack) return;
    const allTracks = MOCK_PLAYLISTS.flatMap((p) => p.tracks);
    const currIdx = allTracks.findIndex((t) => t.id === currentTrack.id);
    const prevIdx = (currIdx - 1 + allTracks.length) % allTracks.length;
    setCurrentTrack(allTracks[prevIdx]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        spotifyKey={spotifyKey}
      />

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'spotify' && (
          <SpotifyViewer
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onSelectTrack={(track) => {
              setCurrentTrack(track);
              setIsPlaying(true);
            }}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            spotifyKey={spotifyKey}
            onLogKeyToConsole={handleLogSpotifyKey}
          />
        )}

        {activeTab === 'explorer' && (
          <FileExplorer
            files={projectFiles}
            spotifyKey={spotifyKey}
            onLogKeyToConsole={handleLogSpotifyKey}
            onRunZomatoApi={handleRunZomatoApi}
            consoleLogs={consoleLogs}
          />
        )}

        {activeTab === 'zomato' && (
          <ZomatoApiTester
            onRunZomatoApi={handleRunZomatoApi}
            zomatoKey={zomatoKey}
            zomatoUrl={zomatoUrl}
          />
        )}

        {activeTab === 'ai-env' && (
          <AiEnvGenerator rawContent={projectFiles[1].content || ''} />
        )}
      </main>

      {/* Persistent Audio Player */}
      <AudioPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
      />

    </div>
  );
}
