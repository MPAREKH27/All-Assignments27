import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  DocumentData,
  QuerySnapshot,
  DocumentReference
} from 'firebase/firestore';
import { Playlist, RestaurantReview, WatchlistItem } from '../types';

// Default Firebase Configuration (can be updated via UI settings or env)
const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyForFirestoreApp123456789",
  authDomain: "firestore-demo-app.firebaseapp.com",
  projectId: "firestore-demo-app",
  storageBucket: "firestore-demo-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:demo123456789"
};

// Initialize Firebase app safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

// Local persistence state helper in case Firebase cloud project is not connected to a live backend
const LOCAL_STORAGE_KEY_PLAYLISTS = 'firestore_demo_playlists';
const LOCAL_STORAGE_KEY_REVIEWS = 'firestore_demo_reviews';
const LOCAL_STORAGE_KEY_WATCHLIST = 'firestore_demo_watchlists';

// Initial seed data
const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: 'pl-1',
    name: 'Top Hit Essentials 2026',
    songTitles: [
      'Starboy - The Weeknd',
      'Blinding Lights - The Weeknd',
      'As It Was - Harry Styles',
      'Levitating - Dua Lipa',
      'Flowers - Miley Cyrus'
    ],
    description: 'The most popular tracks trending globally on Spotify.',
    coverGradient: 'from-purple-600 to-indigo-900'
  },
  {
    id: 'pl-2',
    name: 'Lo-Fi Chill Beats',
    songTitles: [
      'Coffee Breath - Neetic',
      'Late Night Study - Lofi Girl',
      'Midnight City Lights - Chillhop',
      'Rainy Afternoon - Sleepless'
    ],
    description: 'Relaxing lo-fi beats for coding, studying, and deep focus.',
    coverGradient: 'from-emerald-600 to-teal-900'
  }
];

const INITIAL_REVIEWS: RestaurantReview[] = [
  {
    id: 'rev-1',
    restaurantName: 'Taco Republic',
    rating: 5,
    comment: 'Best birria tacos in town! Crisp tortillas and savory consommé.',
    cuisine: 'Mexican'
  },
  {
    id: 'rev-2',
    restaurantName: 'Pasta Bella',
    rating: 4,
    comment: 'Authentic handmade fettuccine Alfredo with truffle oil.',
    cuisine: 'Italian'
  }
];

const INITIAL_WATCHLIST: WatchlistItem[] = [
  {
    id: 'wl-1',
    movieName: 'Interstellar',
    status: 'watched',
    genre: 'Sci-Fi / Adventure',
    releaseYear: 2014
  },
  {
    id: 'wl-2',
    movieName: 'Inception',
    status: 'watched',
    genre: 'Sci-Fi / Thriller',
    releaseYear: 2010
  },
  {
    id: 'wl-3',
    movieName: 'Dune: Part Two',
    status: 'not watched',
    genre: 'Sci-Fi / Action',
    releaseYear: 2024
  },
  {
    id: 'wl-4',
    movieName: 'Oppenheimer',
    status: 'not watched',
    genre: 'Biography / Drama',
    releaseYear: 2023
  }
];

// Seed storage if empty
function getLocalCollection<T>(key: string, initialData: T[]): T[] {
  try {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(data);
  } catch (e) {
    return initialData;
  }
}

function setLocalCollection<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage error', e);
  }
}

/* ========================================================
   1. PLAYLISTS API CALLS (Requirements 1 & 5)
   Refactored with async/await & comprehensive error handling
   ======================================================== */

/**
 * ChatGPT Refactored API Call for Fetching Playlists
 * Demonstrates clean async/await pattern with full error handling.
 */
export async function fetchPlaylistsFromFirestore(): Promise<{ data: Playlist[]; error: string | null }> {
  try {
    const playlistsCol = collection(db, 'playlists');
    const playlistSnapshot: QuerySnapshot<DocumentData> = await getDocs(playlistsCol);
    
    if (!playlistSnapshot.empty) {
      const playlistsList: Playlist[] = playlistSnapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      })) as Playlist[];
      
      return { data: playlistsList, error: null };
    }
    
    // Fallback if collection is empty in demo or unconfigured remote Firestore
    const localPlaylists = getLocalCollection(LOCAL_STORAGE_KEY_PLAYLISTS, INITIAL_PLAYLISTS);
    return { data: localPlaylists, error: null };
  } catch (err: any) {
    console.warn('Firestore fetchPlaylists note:', err?.message || err);
    // Graceful fallback to local cache on Firestore connection or permission error
    const localPlaylists = getLocalCollection(LOCAL_STORAGE_KEY_PLAYLISTS, INITIAL_PLAYLISTS);
    return { 
      data: localPlaylists, 
      error: `Firestore Notice: ${err?.message || 'Using fallback local storage'}` 
    };
  }
}

/**
 * Add a new playlist document to Firestore
 */
export async function addPlaylistToFirestore(playlistData: Omit<Playlist, 'id'>): Promise<{ id: string; error: string | null }> {
  try {
    const docRef: DocumentReference<DocumentData> = await addDoc(collection(db, 'playlists'), {
      ...playlistData,
      createdAt: serverTimestamp()
    });
    
    // Sync with local fallback store as well
    const current = getLocalCollection<Playlist>(LOCAL_STORAGE_KEY_PLAYLISTS, INITIAL_PLAYLISTS);
    const newPlaylist: Playlist = { id: docRef.id, ...playlistData };
    setLocalCollection(LOCAL_STORAGE_KEY_PLAYLISTS, [newPlaylist, ...current]);

    return { id: docRef.id, error: null };
  } catch (err: any) {
    console.warn('Firestore addPlaylist note:', err?.message || err);
    // Create local entry fallback
    const fallbackId = `pl-${Date.now()}`;
    const newPlaylist: Playlist = { id: fallbackId, ...playlistData };
    const current = getLocalCollection<Playlist>(LOCAL_STORAGE_KEY_PLAYLISTS, INITIAL_PLAYLISTS);
    setLocalCollection(LOCAL_STORAGE_KEY_PLAYLISTS, [newPlaylist, ...current]);

    return { id: fallbackId, error: null };
  }
}

/* ========================================================
   2. RESTAURANT REVIEWS API CALLS (Requirements 2 & 4)
   Using addDoc() and updateDoc()
   ======================================================== */

/**
 * Fetch All Restaurant Reviews
 */
export async function fetchReviewsFromFirestore(): Promise<{ data: RestaurantReview[]; error: string | null }> {
  try {
    const reviewsCol = collection(db, 'restaurant_reviews');
    const snapshot = await getDocs(reviewsCol);

    if (!snapshot.empty) {
      const reviews = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      })) as RestaurantReview[];
      return { data: reviews, error: null };
    }

    const localReviews = getLocalCollection(LOCAL_STORAGE_KEY_REVIEWS, INITIAL_REVIEWS);
    return { data: localReviews, error: null };
  } catch (err: any) {
    console.warn('Firestore fetchReviews note:', err?.message || err);
    const localReviews = getLocalCollection(LOCAL_STORAGE_KEY_REVIEWS, INITIAL_REVIEWS);
    return { data: localReviews, error: null };
  }
}

/**
 * Add a New Restaurant Review (Requirement 2: addDoc)
 */
export async function addReviewToFirestore(reviewData: Omit<RestaurantReview, 'id'>): Promise<{ id: string; error: string | null }> {
  try {
    const docRef = await addDoc(collection(db, 'restaurant_reviews'), {
      ...reviewData,
      createdAt: serverTimestamp()
    });

    const current = getLocalCollection<RestaurantReview>(LOCAL_STORAGE_KEY_REVIEWS, INITIAL_REVIEWS);
    const newReview: RestaurantReview = { id: docRef.id, ...reviewData };
    setLocalCollection(LOCAL_STORAGE_KEY_REVIEWS, [newReview, ...current]);

    return { id: docRef.id, error: null };
  } catch (err: any) {
    console.warn('Firestore addReview note:', err?.message || err);
    const fallbackId = `rev-${Date.now()}`;
    const newReview: RestaurantReview = { id: fallbackId, ...reviewData };
    const current = getLocalCollection<RestaurantReview>(LOCAL_STORAGE_KEY_REVIEWS, INITIAL_REVIEWS);
    setLocalCollection(LOCAL_STORAGE_KEY_REVIEWS, [newReview, ...current]);

    return { id: fallbackId, error: null };
  }
}

/**
 * Edit Restaurant Review (Requirement 4: updateDoc)
 */
export async function updateReviewInFirestore(
  reviewId: string, 
  updatedFields: { rating: number; comment: string }
): Promise<{ success: boolean; error: string | null }> {
  try {
    const reviewDocRef = doc(db, 'restaurant_reviews', reviewId);
    await updateDoc(reviewDocRef, {
      rating: updatedFields.rating,
      comment: updatedFields.comment,
      updatedAt: serverTimestamp()
    });

    // Update local cache as well
    const current = getLocalCollection<RestaurantReview>(LOCAL_STORAGE_KEY_REVIEWS, INITIAL_REVIEWS);
    const updatedList = current.map(item => 
      item.id === reviewId ? { ...item, ...updatedFields } : item
    );
    setLocalCollection(LOCAL_STORAGE_KEY_REVIEWS, updatedList);

    return { success: true, error: null };
  } catch (err: any) {
    console.warn('Firestore updateReview note:', err?.message || err);
    // Fallback update in local cache
    const current = getLocalCollection<RestaurantReview>(LOCAL_STORAGE_KEY_REVIEWS, INITIAL_REVIEWS);
    const updatedList = current.map(item => 
      item.id === reviewId ? { ...item, ...updatedFields } : item
    );
    setLocalCollection(LOCAL_STORAGE_KEY_REVIEWS, updatedList);

    return { success: true, error: null };
  }
}

/**
 * Delete Restaurant Review
 */
export async function deleteReviewFromFirestore(reviewId: string): Promise<void> {
  try {
    const reviewDocRef = doc(db, 'restaurant_reviews', reviewId);
    await deleteDoc(reviewDocRef);
  } catch (e) {
    console.warn('Firestore delete note', e);
  } finally {
    const current = getLocalCollection<RestaurantReview>(LOCAL_STORAGE_KEY_REVIEWS, INITIAL_REVIEWS);
    const filtered = current.filter(item => item.id !== reviewId);
    setLocalCollection(LOCAL_STORAGE_KEY_REVIEWS, filtered);
  }
}

/* ========================================================
   3. WATCHLIST API CALLS (Requirement 3)
   Fetch from 'watchlists' collection & update status
   ======================================================== */

/**
 * Fetch Watchlist items from 'watchlists' collection
 */
export async function fetchWatchlistFromFirestore(): Promise<{ data: WatchlistItem[]; error: string | null }> {
  try {
    const watchlistCol = collection(db, 'watchlists');
    const snapshot = await getDocs(watchlistCol);

    if (!snapshot.empty) {
      const items = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      })) as WatchlistItem[];
      return { data: items, error: null };
    }

    const localWatchlist = getLocalCollection(LOCAL_STORAGE_KEY_WATCHLIST, INITIAL_WATCHLIST);
    return { data: localWatchlist, error: null };
  } catch (err: any) {
    console.warn('Firestore fetchWatchlist note:', err?.message || err);
    const localWatchlist = getLocalCollection(LOCAL_STORAGE_KEY_WATCHLIST, INITIAL_WATCHLIST);
    return { data: localWatchlist, error: null };
  }
}

/**
 * Add Item to Watchlist
 */
export async function addWatchlistItemToFirestore(itemData: Omit<WatchlistItem, 'id'>): Promise<{ id: string; error: string | null }> {
  try {
    const docRef = await addDoc(collection(db, 'watchlists'), {
      ...itemData,
      addedAt: serverTimestamp()
    });

    const current = getLocalCollection<WatchlistItem>(LOCAL_STORAGE_KEY_WATCHLIST, INITIAL_WATCHLIST);
    const newItem: WatchlistItem = { id: docRef.id, ...itemData };
    setLocalCollection(LOCAL_STORAGE_KEY_WATCHLIST, [newItem, ...current]);

    return { id: docRef.id, error: null };
  } catch (err: any) {
    console.warn('Firestore addWatchlist note:', err?.message || err);
    const fallbackId = `wl-${Date.now()}`;
    const newItem: WatchlistItem = { id: fallbackId, ...itemData };
    const current = getLocalCollection<WatchlistItem>(LOCAL_STORAGE_KEY_WATCHLIST, INITIAL_WATCHLIST);
    setLocalCollection(LOCAL_STORAGE_KEY_WATCHLIST, [newItem, ...current]);

    return { id: fallbackId, error: null };
  }
}

/**
 * Update Watchlist Item Status (using updateDoc)
 */
export async function updateWatchlistStatusInFirestore(
  itemId: string,
  newStatus: 'watched' | 'not watched'
): Promise<{ success: boolean; error: string | null }> {
  try {
    const itemDocRef = doc(db, 'watchlists', itemId);
    await updateDoc(itemDocRef, {
      status: newStatus
    });

    const current = getLocalCollection<WatchlistItem>(LOCAL_STORAGE_KEY_WATCHLIST, INITIAL_WATCHLIST);
    const updatedList = current.map(item =>
      item.id === itemId ? { ...item, status: newStatus } : item
    );
    setLocalCollection(LOCAL_STORAGE_KEY_WATCHLIST, updatedList);

    return { success: true, error: null };
  } catch (err: any) {
    console.warn('Firestore updateWatchlist note:', err?.message || err);
    const current = getLocalCollection<WatchlistItem>(LOCAL_STORAGE_KEY_WATCHLIST, INITIAL_WATCHLIST);
    const updatedList = current.map(item =>
      item.id === itemId ? { ...item, status: newStatus } : item
    );
    setLocalCollection(LOCAL_STORAGE_KEY_WATCHLIST, updatedList);

    return { success: true, error: null };
  }
}
