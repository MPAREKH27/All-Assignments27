// src/session18/firebase.js
// Firebase config reading API key from environment variables
// NEVER hardcode API keys here — always use import.meta.env.VITE_* (Vite)

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:000:web:xxx",
};

// const app = initializeApp(firebaseConfig);
// export default app;

// Uncomment above lines when you have a real Firebase project
export default firebaseConfig;