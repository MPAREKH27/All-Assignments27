// ============================================================
//  routes/q2_restaurants.js
//  Q2 – Food Delivery App : GET all restaurants
// ============================================================
const express  = require("express");
const router   = express.Router();
const db       = require("../data/db");

/**
 * GET /restaurants
 *
 * Fetches all restaurants from the food-delivery database.
 * - 200 : Returns a JSON array of all restaurants
 * - 500 : Returned when a database/server error occurs
 *
 * HINT: try-catch is used to simulate and handle DB failures gracefully.
 */
router.get("/", (req, res) => {
  try {
    // ── Simulate a DB call (could throw in a real DB scenario) ──
    const allRestaurants = db.restaurants;

    // ── Edge case: DB returned empty collection ──────────────
    if (!allRestaurants || allRestaurants.length === 0) {
      return res.status(200).json({
        success : true,
        count   : 0,
        message : "No restaurants found in the database.",
        data    : [],
      });
    }

    // ── Success: return full list ────────────────────────────
    return res.status(200).json({
      success : true,
      count   : allRestaurants.length,
      message : "Restaurants fetched successfully.",
      data    : allRestaurants,
    });

  } catch (error) {
    // ── 500: Database connection / server failure ────────────
    // This block handles real-world issues like DB timeouts,
    // network failures, or unexpected runtime errors.
    console.error("[DB ERROR] Failed to fetch restaurants:", error.message);

    return res.status(500).json({
      success : false,
      message : "Internal Server Error: Unable to connect to the database.",
      error   : error.message,
    });
  }
});

module.exports = router;
