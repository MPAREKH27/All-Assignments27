// ─────────────────────────────────────────────
//  playlistController.js  –  Controller layer
//  Handles request logic and delegates data
//  access to playlistModel.js
// ─────────────────────────────────────────────

const { getAllPlaylists, createPlaylist } = require("../models/playlistModel");

/**
 * GET /playlists
 * Returns all playlists from the model as JSON.
 */
const getAllPlaylistsHandler = (req, res) => {
  const playlists = getAllPlaylists();
  res.status(200).json({
    success: true,
    count: playlists.length,
    data: playlists,
  });
};

/**
 * POST /playlists
 * Accepts { name, songs } in the request body,
 * delegates creation to the model, and returns
 * the newly created playlist as JSON.
 *
 * Hint: express.json() middleware (added in app.js)
 * parses the incoming JSON body automatically.
 */
const addPlaylist = (req, res) => {
  const { name, songs } = req.body;

  // Basic validation
  if (!name || songs === undefined) {
    return res.status(400).json({
      success: false,
      message: "Please provide both 'name' and 'songs' fields.",
    });
  }

  const newPlaylist = createPlaylist(name, Number(songs));

  res.status(201).json({
    success: true,
    message: "Playlist created successfully!",
    data: newPlaylist,
  });
};

module.exports = { getAllPlaylistsHandler, addPlaylist };
