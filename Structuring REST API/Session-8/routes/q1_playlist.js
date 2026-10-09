// ============================================================
//  routes/q1_playlist.js
//  Q1 – Music App : DELETE a playlist by ID
// ============================================================
const express  = require("express");
const router   = express.Router();
const db       = require("../data/db");

/**
 * DELETE /playlists/:id
 *
 * Removes a playlist from the music-app database.
 * - 200 : Playlist deleted successfully  → success message + deleted item
 * - 404 : No playlist found with given ID → error message
 */
router.delete("/:id", (req, res) => {
  const id       = parseInt(req.params.id);          // Convert string param → number
  const index    = db.playlists.findIndex(p => p.id === id);  // Locate in array

  // ── Guard: playlist not found ────────────────────────────
  if (index === -1) {
    return res.status(404).json({
      success : false,
      message : `Playlist with ID ${id} does not exist.`,
    });
  }

  // ── Delete: splice removes 1 element at 'index' ──────────
  const [deleted] = db.playlists.splice(index, 1);

  return res.status(200).json({
    success : true,
    message : `Playlist "${deleted.name}" has been deleted successfully.`,
    deleted,                          // Return deleted object for confirmation
  });
});

module.exports = router;
