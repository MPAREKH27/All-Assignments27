import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

// Standard Firebase Configuration
// Environment variables can be provided in .env or via VITE_FIREBASE_*
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyForSpotifyApp2026_X",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "spotify-demo-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "spotify-demo-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "spotify-demo-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:demo1234567890"
};

// Initialize Firebase App instance
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Get Auth instance
export const auth: Auth = getAuth(app);
export default app;
