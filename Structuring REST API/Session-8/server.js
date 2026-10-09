// ============================================================
//  server.js  –  Main entry point
//  Session 8 Assignment : Structuring REST API with Express.js
// ============================================================

const express = require("express");
const app     = express();
const PORT    = 8080;

// ── Middleware ───────────────────────────────────────────────
app.use(express.json());                    // Parse incoming JSON bodies

// ── Import all route modules ─────────────────────────────────
const playlistRoutes    = require("./routes/q1_playlist");    // Q1
const restaurantRoutes  = require("./routes/q2_restaurants"); // Q2
const cartRoutes        = require("./routes/q3_cart");        // Q3
const movieRoutes       = require("./routes/q4_movies");      // Q4
const userRoutes        = require("./routes/q5_users");       // Q5

// ── Mount routes ─────────────────────────────────────────────
app.use("/playlists",   playlistRoutes);    // Q1 : Music App playlists
app.use("/restaurants", restaurantRoutes);  // Q2 : Food delivery restaurants
app.use("/cart",        cartRoutes);        // Q3 : Flipkart shopping cart
app.use("/movies",      movieRoutes);       // Q4 : BookMyShow movies
app.use("/users",       userRoutes);        // Q5 : Zomato users

// ── Welcome / Info route ─────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    message : "🎵 Session 8 – REST API Assignment Server is running!",
    routes  : {
      "Q1 – Music App"        : "DELETE /playlists/:id",
      "Q2 – Food Delivery"    : "GET    /restaurants",
      "Q3 – Flipkart Cart"    : "DELETE /cart/:productId",
      "Q4 – BookMyShow"       : "GET    /movies/:id  |  GET /movies",
      "Q5 – Zomato Users"     : "DELETE /users/:id",
    },
  });
});

// ── 404 catch-all for unknown routes ─────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success : false,
    message : `Route "${req.method} ${req.url}" not found on this server.`,
  });
});

// ── Start server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log("=".repeat(55));
  console.log(`  🚀 Server is running at http://localhost:${PORT}`);
  console.log("=".repeat(55));
  console.log("  Available Endpoints:");
  console.log(`  Q1 → DELETE http://localhost:${PORT}/playlists/:id`);
  console.log(`  Q2 → GET    http://localhost:${PORT}/restaurants`);
  console.log(`  Q3 → DELETE http://localhost:${PORT}/cart/:productId`);
  console.log(`  Q4 → GET    http://localhost:${PORT}/movies/:id`);
  console.log(`  Q5 → DELETE http://localhost:${PORT}/users/:id`);
  console.log("=".repeat(55));
});
