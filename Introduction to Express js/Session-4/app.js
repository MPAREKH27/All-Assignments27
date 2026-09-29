// ─────────────────────────────────────────────
//  app.js  –  Entry point
//  Sets up Express server with MVC structure
// ─────────────────────────────────────────────

const express = require("express");
const app     = express();
const PORT    = 3000;

// ── Middleware ────────────────────────────────
// Parse incoming JSON request bodies
// (Required for POST route to read req.body)
app.use(express.json());

// ── Routes ────────────────────────────────────
const playlistRoutes = require("./routes/playlistRoutes");
app.use("/playlists", playlistRoutes);

// ── Root route ────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "🎵 Spotify Playlist API",
    endpoints: {
      "GET  /playlists":  "Fetch all playlists",
      "POST /playlists":  "Create a new playlist  { name, songs }",
    },
  });
});

// ── Start server ──────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
