// ============================================================
// Session-5 Assignment: Error Handling in JavaScript / Node.js
// ============================================================


// ─────────────────────────────────────────────────────────────
// Q1. Custom Error with getUserById(userId)
//     Throws a custom Error if userId is not a positive number,
//     otherwise returns a fake user object.
// ─────────────────────────────────────────────────────────────

function getUserById(userId) {
  // Validate: must be a number AND a positive integer
  if (typeof userId !== "number" || !Number.isInteger(userId) || userId <= 0) {
    throw new Error("Invalid userId: must be a positive integer.");
  }

  // Fake user database
  const fakeUsers = {
    1: { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    2: { id: 2, name: "Bob Smith",    email: "bob@example.com",   role: "User"  },
    3: { id: 3, name: "Carol White",  email: "carol@example.com", role: "Editor"},
  };

  // Return matching user or a generic placeholder
  return fakeUsers[userId] || { id: userId, name: "Unknown User", email: "unknown@example.com", role: "Guest" };
}

// -- Test Q1 --
console.log("=== Q1: getUserById ===");
try {
  console.log(getUserById(1));          // Valid - Alice Johnson
  console.log(getUserById(-5));         // Throws Error
} catch (err) {
  console.error("Caught Error:", err.message);
}

try {
  console.log(getUserById("abc"));      // Throws Error - string input
} catch (err) {
  console.error("Caught Error:", err.message);
}

console.log();


// ─────────────────────────────────────────────────────────────
// Q2. try/catch with fetchSongLyrics(songName)
//     Simulates a Spotify-like API call that may fail.
//     Logs a custom, user-friendly error message on failure.
// ─────────────────────────────────────────────────────────────

function fetchSongLyrics(songName) {
  if (!songName || songName.trim() === "") {
    throw new Error("Song name cannot be empty.");
  }

  const knownSongs = ["Blinding Lights", "Shape of You", "Bohemian Rhapsody"];
  if (!knownSongs.includes(songName)) {
    // Simulate API returning an error for unknown songs
    throw new Error(`Lyrics not found for "${songName}" on Spotify.`);
  }

  // Fake lyrics snippet
  return `Lyrics for "${songName}": "...I've been runnin' around, always found, yeah..."`;
}

// -- Test Q2 --
console.log("=== Q2: fetchSongLyrics ===");

const songsToFetch = ["Blinding Lights", "Unknown Song", ""];

for (const song of songsToFetch) {
  try {
    const lyrics = fetchSongLyrics(song);
    console.log("Success:", lyrics);
  } catch (err) {
    // Custom user-friendly error message logged on failure
    console.error(`Spotify API Error: Could not fetch lyrics. Reason -> ${err.message}`);
  }
}

console.log();


// ─────────────────────────────────────────────────────────────
// Q3. Async getOrderStatus(orderId) with setTimeout + Promises
//     If orderId is missing -> rejects with an Error.
//     Otherwise simulates a delayed API response.
//     Errors are handled with try/catch + async/await.
// ─────────────────────────────────────────────────────────────

function getOrderStatus(orderId) {
  return new Promise((resolve, reject) => {
    // Guard: reject immediately if orderId is missing/falsy
    if (!orderId) {
      return reject(new Error("orderId is required to fetch order status."));
    }

    // Simulate network delay (1.5 seconds)
    setTimeout(() => {
      const fakeOrders = {
        "ORD-101": { status: "Shipped",    eta: "2 days"  },
        "ORD-202": { status: "Delivered",  eta: "N/A"     },
        "ORD-303": { status: "Processing", eta: "5 days"  },
      };

      if (fakeOrders[orderId]) {
        resolve({ orderId, ...fakeOrders[orderId] });
      } else {
        reject(new Error(`Order "${orderId}" not found in the system.`));
      }
    }, 1500);
  });
}

// Async wrapper using try/catch with await
async function checkOrder(orderId) {
  console.log(`Fetching status for order: ${orderId || "(no id provided)"}...`);
  try {
    const result = await getOrderStatus(orderId);   // await the Promise
    console.log("Order Status:", result);
  } catch (err) {
    console.error("Order Error:", err.message);
  }
}

// -- Test Q3 --
console.log("=== Q3: getOrderStatus (async/await) ===");
(async () => {
  await checkOrder("ORD-101");   // Known order
  await checkOrder("ORD-999");   // Unknown order
  await checkOrder(null);        // Missing orderId
  console.log();
})();


// ─────────────────────────────────────────────────────────────
// Q4. Fix Buggy Code - async function errors & try/catch
//
//  BUGGY ORIGINAL:
//    async function fetchMovieDetails() { throw new Error('Movie not found'); }
//    try { fetchMovieDetails(); } catch (err) { console.log(err.message); }
//
//  WHY IT FAILS:
//    An async function always returns a Promise.
//    The throw inside it becomes a *rejected Promise*, NOT a synchronous
//    exception. A regular try/catch cannot intercept a rejected Promise --
//    it only catches synchronous throws.
//    To catch it you must either:
//      a) use  await  inside an async function, OR
//      b) attach a .catch() handler to the returned Promise.
// ─────────────────────────────────────────────────────────────

async function fetchMovieDetails(movieName = "Inception") {
  // Simulate: throw for unknown movies
  const knownMovies = ["Inception", "Interstellar", "The Matrix"];
  if (!knownMovies.includes(movieName)) {
    throw new Error(`Movie not found: "${movieName}"`);
  }
  return { title: movieName, rating: "8.8/10", genre: "Sci-Fi" };
}

// -- FIX A: using async/await + try/catch --
async function runQ4() {
  console.log("=== Q4: Fixed fetchMovieDetails ===");

  // Case 1 - valid movie
  try {
    const movie = await fetchMovieDetails("Inception");
    console.log("Movie found:", movie);
  } catch (err) {
    console.error("Error:", err.message);
  }

  // Case 2 - unknown movie (error properly caught)
  try {
    const movie = await fetchMovieDetails("Avatar 99");   // await is the KEY fix
    console.log("Movie found:", movie);
  } catch (err) {
    console.error("Error caught correctly:", err.message);
  }

  // -- FIX B (alternative): using .catch() on the Promise --
  fetchMovieDetails("Unknown Film")
    .then((m) => console.log("Movie:", m))
    .catch((err) => console.error(".catch() handler:", err.message));

  console.log();
}

runQ4();


// ─────────────────────────────────────────────────────────────
// Q5. Refactored fetchProductDetails() - Fake Flipkart API
//     Handles BOTH synchronous and asynchronous errors gracefully.
//     Always returns a user-friendly message instead of crashing.
// ─────────────────────────────────────────────────────────────

// -- Fake Flipkart API (simulates async fetch with possible errors) --
function flipkartAPI(productId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate server error for product IDs starting with "ERR"
      if (typeof productId !== "string" || productId.startsWith("ERR")) {
        return reject(new Error("Flipkart server error: product unavailable."));
      }

      const catalog = {
        "FK-001": { name: "boAt Rockerz 450",   price: "Rs.1,299",  rating: 4.3 },
        "FK-002": { name: "Redmi Note 13 Pro",  price: "Rs.24,999", rating: 4.5 },
        "FK-003": { name: "Samsung 32 inch LED TV", price: "Rs.18,499", rating: 4.1 },
      };

      if (catalog[productId]) {
        resolve(catalog[productId]);
      } else {
        reject(new Error(`Product "${productId}" not listed on Flipkart.`));
      }
    }, 1000);
  });
}

// -- Refactored fetch function: graceful sync + async error handling --
async function fetchProductDetails(productId) {
  // Synchronous validation (throws synchronously before any async work)
  if (productId === undefined || productId === null || productId === "") {
    // Instead of crashing, return a user-friendly message object
    return { success: false, message: "Please provide a valid product ID." };
  }

  if (typeof productId !== "string") {
    return { success: false, message: "Product ID must be a string (e.g. 'FK-001')." };
  }

  // Asynchronous call with graceful error handling
  try {
    const product = await flipkartAPI(productId);
    return { success: true, product };
  } catch (asyncErr) {
    // Catch async rejection and return friendly message instead of crashing
    return {
      success: false,
      message: `Could not fetch product details. ${asyncErr.message}`,
    };
  }
}

// -- Test Q5 --
async function runQ5() {
  console.log("=== Q5: fetchProductDetails (Flipkart API) ===");

  const testCases = ["FK-001", "FK-999", "ERR-BAD", null, 12345, ""];

  for (const id of testCases) {
    const result = await fetchProductDetails(id);
    if (result.success) {
      console.log(`[${id}]`, result.product);
    } else {
      console.warn(`[${id}]`, result.message);
    }
  }
}

runQ5();
