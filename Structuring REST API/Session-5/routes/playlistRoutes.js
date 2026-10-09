const express = require("express");
const router = express.Router();
const store = require("../data/playlists");

// ─────────────────────────────────────────────────────────────────
// Helper: wrap synchronous playlist creation in a Promise
// (simulates async work, enabling .then() chaining – Task 4)
// ─────────────────────────────────────────────────────────────────
function createPlaylistAsync(name, songs) {
  return new Promise((resolve, reject) => {
    if (!name || typeof name !== "string" || name.trim() === "") {
      return reject(new Error("'name' is required and must be a non-empty string."));
    }
    if (!Array.isArray(songs) || songs.length === 0) {
      return reject(new Error("'songs' is required and must be a non-empty array."));
    }

    const newPlaylist = {
      id: store.nextId,
      name: name.trim(),
      songs,
    };

    store.playlists.push(newPlaylist);
    store.incrementId();
    resolve(newPlaylist);
  });
}

// ─────────────────────────────────────────────────────────────────
// Helper: return all playlists as a Promise
// ─────────────────────────────────────────────────────────────────
function getAllPlaylistsAsync() {
  return new Promise((resolve) => {
    resolve(store.playlists);
  });
}

// ─────────────────────────────────────────────────────────────────
// POST /playlist
// Body: { name: String, songs: String[] }
// Task 1, 4, 5 – Creates playlist, then chains .then() to return
//               all playlists in the response (Task 4 requirement).
// Status: 201 Created
// ─────────────────────────────────────────────────────────────────
router.post("/playlist", (req, res) => {
  const { name, songs } = req.body;

  createPlaylistAsync(name, songs)
    .then((createdPlaylist) => {
      // Task 4: chain another promise to fetch all playlists
      return getAllPlaylistsAsync().then((allPlaylists) => {
        // Respond with the newly created playlist AND the updated full list
        res.status(201).json({
          message: "Playlist created successfully.",
          createdPlaylist,          // Task 1: the new playlist object
          allPlaylists,             // Task 4: updated list after creation
        });
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

// ─────────────────────────────────────────────────────────────────
// GET /playlist/:id
// Task 2, 5 – Reads a single playlist by its numeric ID.
// Status: 200 if found | 404 if not found
// ─────────────────────────────────────────────────────────────────
router.get("/playlist/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Playlist ID must be a number." });
  }

  const playlist = store.playlists.find((p) => p.id === id);

  if (!playlist) {
    return res.status(404).json({
      error: `Playlist with id ${id} not found.`,
    });
  }

  res.status(200).json({
    message: "Playlist found.",
    playlist,
  });
});

// ─────────────────────────────────────────────────────────────────
// GET /playlists
// Task 3, 5 – Returns all playlists with only name & totalSongs.
// Status: 200 OK
// ─────────────────────────────────────────────────────────────────
router.get("/playlists", (req, res) => {
  const summary = store.playlists.map((p) => ({
    id: p.id,
    name: p.name,
    totalSongs: p.songs.length,
  }));

  res.status(200).json({
    message: "All playlists retrieved.",
    count: summary.length,
    playlists: summary,
  });
});

module.exports = router;
