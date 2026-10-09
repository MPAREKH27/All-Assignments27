const express = require("express");
const app = express();
const PORT = 3000;

// ── Middleware ─────────────────────────────────────
app.use(express.json()); // parse JSON request bodies

// ── Routes ─────────────────────────────────────────
const playlistRoutes = require("./routes/playlistRoutes");
app.use("/", playlistRoutes);

// ── 404 catch-all ──────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// ── Start server ───────────────────────────────────
app.listen(PORT, () => {
  console.log(`🎵 Playlist API running at http://localhost:${PORT}`);
  console.log("─────────────────────────────────────────────");
  console.log("Available endpoints:");
  console.log("  POST   /playlist         → Create a playlist (201)");
  console.log("  GET    /playlist/:id     → Get playlist by ID (200 | 404)");
  console.log("  GET    /playlists        → Get all playlists – name & totalSongs (200)");
});

module.exports = app;
