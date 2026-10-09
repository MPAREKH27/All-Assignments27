// ============================================================
//  routes/q4_movies.js
//  Q4 – BookMyShow-Style App : GET single movie by ID
// ============================================================
const express  = require("express");
const router   = express.Router();
const db       = require("../data/db");

/**
 * GET /movies/:id
 *
 * Fetches the details of a single movie by its ID.
 * - 200 : Movie found → returns movie object
 * - 404 : Movie not found → error message
 */
router.get("/:id", (req, res) => {
  const id    = parseInt(req.params.id);                // Parse ID from URL param
  const movie = db.movies.find(m => m.id === id);      // Search in our data store

  // ── 404: Movie doesn't exist ─────────────────────────────
  if (!movie) {
    return res.status(404).json({
      success : false,
      message : `Movie with ID ${id} was not found. Please check the ID and try again.`,
    });
  }

  // ── 200: Return movie details ────────────────────────────
  return res.status(200).json({
    success : true,
    message : "Movie details fetched successfully.",
    data    : movie,
  });
});

/**
 * GET /movies
 *
 * Bonus: Fetch all movies (helpful for testing which IDs are available).
 */
router.get("/", (req, res) => {
  return res.status(200).json({
    success : true,
    count   : db.movies.length,
    message : "All movies fetched successfully.",
    data    : db.movies,
  });
});

module.exports = router;
