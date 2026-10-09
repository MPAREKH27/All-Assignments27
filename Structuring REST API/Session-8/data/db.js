// ============================================================
//  db.js  –  In-memory mock database (simulates a real DB)
//  All five exercises share this single data store.
// ============================================================

// ── Q1 : Music-App Playlists ─────────────────────────────────
let playlists = [
  { id: 1, name: "Chill Vibes",       genre: "Lo-fi",   songs: 20 },
  { id: 2, name: "Workout Beats",     genre: "EDM",     songs: 35 },
  { id: 3, name: "Bollywood Hits",    genre: "Hindi",   songs: 50 },
  { id: 4, name: "Classic Rock",      genre: "Rock",    songs: 40 },
  { id: 5, name: "Rainy Day Moods",   genre: "Ambient", songs: 15 },
];

// ── Q2 : Food-Delivery Restaurants ───────────────────────────
let restaurants = [
  { id: 1, name: "Spice Garden",    cuisine: "Indian",    rating: 4.5, deliveryTime: "30 min" },
  { id: 2, name: "Burger Barn",     cuisine: "American",  rating: 4.2, deliveryTime: "25 min" },
  { id: 3, name: "Sushi World",     cuisine: "Japanese",  rating: 4.8, deliveryTime: "40 min" },
  { id: 4, name: "Pizza Palace",    cuisine: "Italian",   rating: 4.3, deliveryTime: "35 min" },
  { id: 5, name: "Dragon Wok",      cuisine: "Chinese",   rating: 4.1, deliveryTime: "20 min" },
];

// ── Q3 : Flipkart-Style Shopping Cart ────────────────────────
let cart = [
  { productId: 101, name: "Samsung Galaxy S24", price: 74999, qty: 1 },
  { productId: 102, name: "boAt Rockerz 450",   price: 1299,  qty: 2 },
  { productId: 103, name: "Laptop Backpack",     price: 999,   qty: 1 },
  { productId: 104, name: "USB-C Hub 7-in-1",    price: 1799,  qty: 3 },
];

// ── Q4 : BookMyShow-Style Movies ─────────────────────────────
let movies = [
  { id: 1, title: "Kalki 2898 AD",  genre: "Sci-Fi",   language: "Telugu", duration: "3h 1m",  rating: 8.2 },
  { id: 2, title: "Stree 2",        genre: "Horror-Comedy", language: "Hindi", duration: "2h 22m", rating: 8.9 },
  { id: 3, title: "Fighter",        genre: "Action",   language: "Hindi", duration: "2h 46m", rating: 6.9 },
  { id: 4, title: "Pushpa 2",       genre: "Action",   language: "Telugu", duration: "3h 20m", rating: 7.8 },
  { id: 5, title: "Dunki",          genre: "Drama",    language: "Hindi", duration: "2h 36m", rating: 6.5 },
];

// ── Q5 : Zomato-Style Users ───────────────────────────────────
let users = [
  { id: 1, name: "Rohit Sharma",   email: "rohit@zomato.com",   phone: "9876543210", city: "Mumbai" },
  { id: 2, name: "Priya Singh",    email: "priya@zomato.com",   phone: "9123456789", city: "Delhi"  },
  { id: 3, name: "Arjun Kapoor",   email: "arjun@zomato.com",   phone: "9988776655", city: "Pune"   },
  { id: 4, name: "Sneha Reddy",    email: "sneha@zomato.com",   phone: "9112233445", city: "Hyderabad" },
];

module.exports = { playlists, restaurants, cart, movies, users };
