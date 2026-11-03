import express from 'express';

const router = express.Router();

/**
 * Requirement 1: Hardcoded list of 5 upcoming movies.
 * Each movie has title, language, and release date, plus rich metadata for UI display.
 */
export const movies = [
  {
    id: "m1",
    title: "Dune: Part Three",
    language: "English",
    releaseDate: "2026-12-18",
    release_date: "2026-12-18",
    genre: "Sci-Fi / Adventure",
    duration: "165 mins",
    rating: "UA 16+",
    director: "Denis Villeneuve",
    banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    synopsis: "Paul Atreides confronts the Jihad sweeping the cosmos in the climactic resolution of the Arrakis saga."
  },
  {
    id: "m2",
    title: "Kalki 2898 AD - Part 2",
    language: "Telugu",
    releaseDate: "2026-05-15",
    release_date: "2026-05-15",
    genre: "Mythological Sci-Fi",
    duration: "180 mins",
    rating: "UA",
    director: "Nag Ashwin",
    banner: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
    synopsis: "The futuristic battle of Kashi deepens as Ashwatthama and Bhairava lock horns over the destined avatar."
  },
  {
    id: "m3",
    title: "War 2",
    language: "Hindi",
    releaseDate: "2025-08-14",
    release_date: "2025-08-14",
    genre: "Action Thriller",
    duration: "155 mins",
    rating: "UA 16+",
    director: "Ayan Mukerji",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80",
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    synopsis: "RAW's deadliest operative Major Kabir Dhaliwal meets his fiercest adversary in high-octane global espionage."
  },
  {
    id: "m4",
    title: "Spider-Man: Beyond the Spider-Verse",
    language: "English",
    releaseDate: "2026-07-24",
    release_date: "2026-07-24",
    genre: "Animation / Action",
    duration: "140 mins",
    rating: "U",
    director: "Joaquim Dos Santos, Kemp Powers",
    banner: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&auto=format&fit=crop&q=80",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&auto=format&fit=crop&q=80",
    synopsis: "Miles Morales travels across the multiverse to rescue his father while escaping the Prowler alternate self."
  },
  {
    id: "m5",
    title: "The Batman: Part II",
    language: "English",
    releaseDate: "2026-10-02",
    release_date: "2026-10-02",
    genre: "Crime / Noir / Thriller",
    duration: "170 mins",
    rating: "A",
    director: "Matt Reeves",
    banner: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1200&auto=format&fit=crop&q=80",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=600&auto=format&fit=crop&q=80",
    synopsis: "The Dark Knight uncovers deeply entrenched corruption in Gotham's flooded ruins as new rogue forces arise."
  }
];

// In-memory record of booked seats per movie ID
export const bookedSeatsStore = {
  m1: ["A1", "A2", "B5", "C7", "D3", "E10"],
  m2: ["A3", "B1", "B2", "C4", "E8"],
  m3: ["A5", "B6", "C1", "C2", "D8"],
  m4: ["A1", "B3", "B4", "C9", "D10"],
  m5: ["A4", "B7", "C3", "D5", "E2"]
};

// In-memory list of completed bookings
export const bookingHistory = [];

/**
 * ============================================================================
 * REQUIREMENT 5: AI-GENERATED SEAT VALIDATION FUNCTION (ChatGPT / GitHub Copilot)
 * ============================================================================
 * Prompt provided to AI (ChatGPT / GitHub Copilot):
 * "Write a robust JavaScript/Node.js validation function that checks if a selected
 * seat number is already booked (given an array of booked seat numbers and a new seat number).
 * Ensure it handles case-insensitivity, whitespace trimming, and type safety."
 *
 * How the AI tool helped improve and debug our code:
 * ----------------------------------------------------------------------------
 * 1. Bug Prevention on Formatting Variations:
 *    A standard `bookedSeats.includes(newSeat)` check routinely caused false negatives
 *    when users submitted seats in lowercase ("a1" vs "A1") or with accidental whitespace
 *    (" A1 " vs "A1"). The AI recommended standardizing both the candidate and array
 *    items using `String(seat).trim().toUpperCase()`.
 * 2. Type-Safety & Defensive Guard Clauses:
 *    Copilot flagged that if `bookedSeats` is undefined/null or not an array, invoking
 *    array methods will throw an unhandled TypeError. Adding `Array.isArray(bookedSeats)`
 *    safeguards the route from crashing on corrupt state.
 * 3. Performance & Early Exit:
 *    Instead of filtering the entire array (`bookedSeats.filter(...).length > 0`),
 *    ChatGPT suggested `Array.prototype.some()`, which halts evaluation as soon as the
 *    first matching occupied seat is found.
 * ============================================================================
 */
export function isSeatAlreadyBooked(bookedSeats, newSeat) {
  // Guard check: verify valid array and non-empty seat input
  if (!Array.isArray(bookedSeats) || newSeat === undefined || newSeat === null) {
    return false;
  }

  // Normalize target seat number
  const normalizedCandidate = String(newSeat).trim().toUpperCase();
  if (!normalizedCandidate) {
    return false;
  }

  // Iterate with early termination on match
  return bookedSeats.some((existingSeat) => {
    if (existingSeat === undefined || existingSeat === null) {
      return false;
    }
    return String(existingSeat).trim().toUpperCase() === normalizedCandidate;
  });
}

/**
 * REQUIREMENT 1:
 * GET /movies
 * Returns a hardcoded list of 5 upcoming movies, each with title, language, and release date in JSON format.
 */
router.get('/movies', (req, res, next) => {
  try {
    // Optional error simulation for testing Requirement 4
    if (req.query.simulateError === 'true') {
      throw new Error("Simulated failure in /movies: Database connection timeout.");
    }

    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
});

/**
 * REQUIREMENT 3:
 * GET /search-movies
 * Takes query parameter 'q' and returns movies whose titles include the search term
 * (case-insensitive), matching BookMyShow search behavior.
 * Uses Array.filter() and String.toLowerCase() as requested.
 */
router.get('/search-movies', (req, res, next) => {
  try {
    const query = req.query.q;

    // Optional error simulation for testing Requirement 4
    if (req.query.simulateError === 'true' || query === '__trigger_500__') {
      throw new Error("Simulated search failure in /search-movies: Elastic cluster node unreachable.");
    }

    // If no query string provided, return all upcoming movies
    if (!query || typeof query !== 'string') {
      return res.status(200).json(movies);
    }

    // BookMyShow-style search using Array.filter() and String.toLowerCase()
    const searchTerm = query.toLowerCase().trim();
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm)
    );

    res.status(200).json(filteredMovies);
  } catch (err) {
    next(err);
  }
});

/**
 * REQUIREMENT 2 & REQUIREMENT 5:
 * POST /book-ticket
 * Accepts JSON input with movieId, seatNumber, and userEmail.
 * Validates seat availability using AI-assisted isSeatAlreadyBooked().
 * Responds with a confirmation message including all three details.
 */
router.post('/book-ticket', (req, res, next) => {
  try {
    const { movieId, seatNumber, userEmail, simulateError } = req.body || {};

    // Trigger error test if requested
    if (simulateError === true || seatNumber === 'TRIGGER_ERROR_500') {
      throw new Error("Simulated booking failure in /book-ticket: Payment lock timeout.");
    }

    // Validate presence of required fields
    if (!movieId || !seatNumber || !userEmail) {
      return res.status(400).json({
        success: false,
        error: "Missing required booking fields. Please provide movieId, seatNumber, and userEmail."
      });
    }

    // Simple email format check
    const emailStr = String(userEmail).trim();
    if (!emailStr.includes('@') || !emailStr.includes('.')) {
      return res.status(400).json({
        success: false,
        error: "Invalid email address format provided."
      });
    }

    // Check if movie exists
    const movie = movies.find(m => m.id === movieId || m.title.toLowerCase() === String(movieId).toLowerCase());
    const validMovieId = movie ? movie.id : movieId;
    const movieTitle = movie ? movie.title : `Movie ID ${movieId}`;

    // Initialize seat storage for this movie if not yet present
    if (!bookedSeatsStore[validMovieId]) {
      bookedSeatsStore[validMovieId] = [];
    }

    const currentBookedSeats = bookedSeatsStore[validMovieId];

    // REQUIREMENT 5: Validate if seat is already booked using the AI-assisted function
    const isBooked = isSeatAlreadyBooked(currentBookedSeats, seatNumber);
    if (isBooked) {
      return res.status(409).json({
        success: false,
        error: `Seat ${String(seatNumber).trim().toUpperCase()} is already booked for '${movieTitle}'. Please select a different seat.`,
        seatNumber: String(seatNumber).trim().toUpperCase(),
        movieId: validMovieId
      });
    }

    // Record the newly booked seat
    const normalizedSeat = String(seatNumber).trim().toUpperCase();
    currentBookedSeats.push(normalizedSeat);

    // Build confirmation message including all three details (movieId, seatNumber, userEmail)
    const confirmationMessage = `Booking confirmed! Successfully reserved seat ${normalizedSeat} for movie ID '${validMovieId}' (${movieTitle}). Confirmation email sent to ${emailStr}.`;

    const bookingRecord = {
      bookingId: "CP-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      movieId: validMovieId,
      movieTitle,
      seatNumber: normalizedSeat,
      userEmail: emailStr,
      bookedAt: new Date().toISOString()
    };

    bookingHistory.unshift(bookingRecord);

    // Respond with confirmation message containing all three details
    return res.status(200).json({
      success: true,
      message: confirmationMessage,
      confirmationMessage: confirmationMessage,
      movieId: validMovieId,
      seatNumber: normalizedSeat,
      userEmail: emailStr,
      booking: bookingRecord
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Additional Helper Endpoints for Interactive Portal
 */
router.get('/booked-seats/:movieId', (req, res, next) => {
  try {
    const { movieId } = req.params;
    const seats = bookedSeatsStore[movieId] || [];
    res.status(200).json({ movieId, bookedSeats: seats });
  } catch (err) {
    next(err);
  }
});

router.get('/booking-history', (req, res, next) => {
  try {
    res.status(200).json(bookingHistory);
  } catch (err) {
    next(err);
  }
});

router.post('/reset-seats', (req, res, next) => {
  try {
    bookedSeatsStore.m1 = ["A1", "A2", "B5", "C7", "D3", "E10"];
    bookedSeatsStore.m2 = ["A3", "B1", "B2", "C4", "E8"];
    bookedSeatsStore.m3 = ["A5", "B6", "C1", "C2", "D8"];
    bookedSeatsStore.m4 = ["A1", "B3", "B4", "C9", "D10"];
    bookedSeatsStore.m5 = ["A4", "B7", "C3", "D5", "E2"];
    bookingHistory.length = 0;
    res.status(200).json({ success: true, message: "Seat bookings reset to initial demo state." });
  } catch (err) {
    next(err);
  }
});

/**
 * REQUIREMENT 4:
 * Error handling middleware with four parameters (err, req, res, next).
 * Catches errors in the booking or movie search routes and returns status 500 JSON.
 */
router.use((err, req, res, next) => {
  console.error("[movieRoutes Error Middleware Caught Error]:", err.message);
  res.status(500).json({
    error: err.message || "Internal Server Error in movie route processing.",
    status: 500,
    path: req.originalUrl || req.url,
    timestamp: new Date().toISOString()
  });
});

export default router;
