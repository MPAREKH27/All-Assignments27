// ============================================================
// Session 4 Assignment — Callbacks, Promises & Async/Await
// ============================================================

// ─────────────────────────────────────────────────────────────
// Q1. getUserProfile using setTimeout + Callback
// ─────────────────────────────────────────────────────────────

const users = [
  { id: 1, username: "alice",   email: "alice@example.com",   role: "admin"  },
  { id: 2, username: "bob",     email: "bob@example.com",     role: "user"   },
  { id: 3, username: "charlie", email: "charlie@example.com", role: "editor" },
];

/**
 * Simulates fetching a user profile from the users array after a 2-second delay.
 * @param {string}   username  - The username to look up.
 * @param {Function} callback  - Called as callback(error, profile).
 */
function getUserProfile(username, callback) {
  console.log(`\n[Q1] Fetching profile for "${username}"...`);

  setTimeout(() => {
    const profile = users.find((u) => u.username === username);

    if (profile) {
      callback(null, profile); // success
    } else {
      callback(new Error(`User "${username}" not found.`), null); // error
    }
  }, 2000);
}

// --- Demo ---
getUserProfile("bob", (err, profile) => {
  if (err) {
    console.error("[Q1] Error:", err.message);
  } else {
    console.log("[Q1] Profile found:", profile);
  }
});

getUserProfile("unknown", (err, profile) => {
  if (err) {
    console.error("[Q1] Error:", err.message);
  } else {
    console.log("[Q1] Profile found:", profile);
  }
});


// ─────────────────────────────────────────────────────────────
// Q2. Zomato-style food order — Callback Hell → Promises
// ─────────────────────────────────────────────────────────────

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Simulates selecting a restaurant (resolves after 1 second).
 * @param {string} restaurantName
 * @returns {Promise<string>}
 */
function selectRestaurant(restaurantName) {
  return delay(1000).then(() => {
    console.log(`\n[Q2] Restaurant selected: ${restaurantName}`);
    return restaurantName;
  });
}

/**
 * Simulates selecting a food item (resolves after 1 second).
 * @param {string} restaurant
 * @param {string} foodItem
 * @returns {Promise<Object>}
 */
function selectFood(restaurant, foodItem) {
  return delay(1000).then(() => {
    console.log(`[Q2] Food selected: ${foodItem} from ${restaurant}`);
    return { restaurant, foodItem };
  });
}

/**
 * Simulates placing the order (resolves after 1 second).
 * @param {Object} orderDetails
 * @returns {Promise<Object>}
 */
function placeOrder(orderDetails) {
  return delay(1000).then(() => {
    const orderId = Math.floor(Math.random() * 90000) + 10000;
    const result  = { ...orderDetails, orderId, status: "Confirmed" };
    console.log(`[Q2] Order placed! Order ID: ${orderId}`, result);
    return result;
  });
}

// --- Demo (chained Promises) ---
selectRestaurant("Pizza Palace")
  .then((restaurant) => selectFood(restaurant, "Margherita Pizza"))
  .then((orderDetails) => placeOrder(orderDetails))
  .then((finalOrder) => console.log("[Q2] Final order summary:", finalOrder))
  .catch((err) => console.error("[Q2] Order failed:", err.message));


// ─────────────────────────────────────────────────────────────
// Q3. Fetch Playlist & Add Song — Callback → Async/Await
// ─────────────────────────────────────────────────────────────

const playlists = [
  { name: "Chill Vibes", songs: ["Blinding Lights", "Levitating"] },
  { name: "Workout",     songs: ["Eye of the Tiger", "Lose Yourself"] },
  { name: "Bollywood",   songs: ["Tum Hi Ho", "Kal Ho Na Ho"] },
];

/**
 * Wraps the playlist fetch in a Promise (simulates async fetch with 1.5s delay).
 * @param {string} playlistName
 * @returns {Promise<Object>}
 */
function fetchPlaylist(playlistName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const playlist = playlists.find((p) => p.name === playlistName);
      if (playlist) {
        resolve(playlist);
      } else {
        reject(new Error(`Playlist "${playlistName}" not found.`));
      }
    }, 1500);
  });
}

/**
 * Wraps adding a song to a playlist in a Promise (1s delay).
 * @param {Object} playlist
 * @param {string} song
 * @returns {Promise<Object>}
 */
function addSongToPlaylist(playlist, song) {
  return new Promise((resolve) => {
    setTimeout(() => {
      playlist.songs.push(song);
      resolve(playlist);
    }, 1000);
  });
}

/**
 * Async/await: fetches a playlist then adds a new song to it.
 * @param {string} playlistName
 * @param {string} newSong
 */
async function updatePlaylist(playlistName, newSong) {
  try {
    console.log(`\n[Q3] Fetching playlist "${playlistName}"...`);
    const playlist = await fetchPlaylist(playlistName);
    console.log(`[Q3] Found playlist:`, playlist);

    console.log(`[Q3] Adding song "${newSong}"...`);
    const updatedPlaylist = await addSongToPlaylist(playlist, newSong);
    console.log(`[Q3] Updated playlist:`, updatedPlaylist);
  } catch (err) {
    console.error("[Q3] Error:", err.message);
  }
}

// --- Demo ---
updatePlaylist("Chill Vibes", "Shape of You");
updatePlaylist("Unknown Playlist", "Some Song"); // triggers error path


// ─────────────────────────────────────────────────────────────
// Q4. getMovieDetails — Promise + Sequential Async/Await Calls
// ─────────────────────────────────────────────────────────────

const moviesDB = [
  { title: "Inception",       year: 2010, director: "Christopher Nolan", rating: 8.8 },
  { title: "The Dark Knight", year: 2008, director: "Christopher Nolan", rating: 9.0 },
  { title: "Interstellar",    year: 2014, director: "Christopher Nolan", rating: 8.6 },
  { title: "Parasite",        year: 2019, director: "Bong Joon-ho",      rating: 8.5 },
];

/**
 * Returns a Promise that resolves with movie info after 1 second.
 * Rejects if the title is not found.
 * @param {string} title
 * @returns {Promise<Object>}
 */
function getMovieDetails(title) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const movie = moviesDB.find(
        (m) => m.title.toLowerCase() === title.toLowerCase()
      );
      if (movie) {
        resolve(movie);
      } else {
        reject(new Error(`Movie "${title}" not found in database.`));
      }
    }, 1000);
  });
}

/**
 * Fetches three movies sequentially using async/await.
 */
async function fetchMoviesSequentially() {
  const titles = ["Inception", "The Dark Knight", "Interstellar"];

  console.log("\n[Q4] Fetching movies sequentially...\n");

  for (const title of titles) {
    try {
      const movie = await getMovieDetails(title);
      console.log(
        `[Q4] "${movie.title}" (${movie.year}) | Dir: ${movie.director} | Rating: ${movie.rating}/10`
      );
    } catch (err) {
      console.error(`[Q4] Error fetching "${title}":`, err.message);
    }
  }

  console.log("[Q4] All movies fetched.");
}

// --- Demo ---
fetchMoviesSequentially();


// ─────────────────────────────────────────────────────────────
// Q5. Cricket Match Scores — Mock API with Promises + Error Handling
//
// AI Prompt used:
//   "Write a Node.js function that fetches cricket match scores
//    from a mock API using Promises. It should simulate an API
//    call with setTimeout, return the match scores, and properly
//    handle errors when a match ID is not found."
//
// The AI generated a basic fetchCricketScore function. I reviewed it,
// added a mock database, random latency, a simulated network failure
// (20% chance), and an async wrapper that continues fetching remaining
// matches even when one fails — demonstrating robust error handling.
// ─────────────────────────────────────────────────────────────

const mockCricketAPI = {
  matches: {
    "IND-vs-AUS-001": {
      match:  "India vs Australia",
      venue:  "MCG, Melbourne",
      date:   "2025-01-15",
      scores: { India: "350/6 (50 overs)", Australia: "348/8 (50 overs)" },
      result: "India won by 2 runs",
    },
    "ENG-vs-PAK-002": {
      match:  "England vs Pakistan",
      venue:  "Lords, London",
      date:   "2025-03-10",
      scores: { England: "287 all out", Pakistan: "245 all out" },
      result: "England won by 42 runs",
    },
    "SA-vs-NZ-003": {
      match:  "South Africa vs New Zealand",
      venue:  "Newlands, Cape Town",
      date:   "2025-05-22",
      scores: { "South Africa": "198/4 (20 overs)", "New Zealand": "183/7 (20 overs)" },
      result: "South Africa won by 15 runs",
    },
  },
};

/**
 * Fetches cricket match scores from the mock API.
 * Resolves with match details after simulated latency (800–1200ms).
 * Rejects if match ID is unknown or a simulated network failure occurs.
 * @param {string} matchId
 * @returns {Promise<Object>}
 */
function fetchCricketScore(matchId) {
  return new Promise((resolve, reject) => {
    console.log(`\n[Q5] Fetching scores for match ID: "${matchId}"...`);

    // Simulate variable network latency
    const latency = Math.floor(Math.random() * 400) + 800;

    setTimeout(() => {
      // Simulate random network failure (20% chance)
      if (Math.random() < 0.2) {
        reject(new Error("Network error: Could not connect to cricket API."));
        return;
      }

      const matchData = mockCricketAPI.matches[matchId];

      if (matchData) {
        resolve(matchData);
      } else {
        reject(new Error(`Match ID "${matchId}" not found in the API.`));
      }
    }, latency);
  });
}

/**
 * Fetches and prints cricket scores for multiple matches.
 * Handles errors gracefully — one failure doesn't stop remaining calls.
 */
async function getCricketScores() {
  const matchIds = [
    "IND-vs-AUS-001",
    "ENG-vs-PAK-002",
    "INVALID-MATCH-999",  // intentional invalid ID — tests error path
    "SA-vs-NZ-003",
  ];

  for (const id of matchIds) {
    try {
      const data = await fetchCricketScore(id);
      console.log(`[Q5] ${data.match} | ${data.date} | ${data.venue}`);
      console.log(`     Scores:`, data.scores);
      console.log(`     Result: ${data.result}`);
    } catch (err) {
      // Proper error handling: log and continue for remaining matches
      console.error(`[Q5] Error for "${id}":`, err.message);
    }
  }

  console.log("\n[Q5] Score fetching complete.");
}

// --- Demo ---
getCricketScores();
