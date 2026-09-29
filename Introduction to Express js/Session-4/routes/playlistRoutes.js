// ─────────────────────────────────────────────
//  playlistRoutes.js  –  Routes layer
//  Maps HTTP verbs + paths to controller fns
// ─────────────────────────────────────────────

const express = require("express");
const router  = express.Router();

const {
  getAllPlaylistsHandler,
  addPlaylist,
} = require("../controllers/playlistController");

// GET  /playlists  → fetch all playlists
router.get("/", getAllPlaylistsHandler);

// POST /playlists  → create a new playlist
router.post("/", addPlaylist);

module.exports = router;
