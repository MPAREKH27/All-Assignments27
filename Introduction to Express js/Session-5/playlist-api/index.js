const express = require("express");
const app = express();
const PORT = 4000;

// ─── Middleware ───────────────────────────────────────────────────────────────
// Task 2 Hint: Use express.json() to parse incoming JSON request bodies
app.use(express.json());

// ─── In-Memory Data Store ─────────────────────────────────────────────────────
// Task 1: Static array of 3 song objects
let tracks = [
  { id: 1, name: "Blinding Lights", artist: "The Weeknd" },
  { id: 2, name: "Shape of You", artist: "Ed Sheeran" },
  { id: 3, name: "Levitating", artist: "Dua Lipa" },
];

// Helper to generate unique IDs
let nextId = 4;

// ─── Routes ───────────────────────────────────────────────────────────────────

/**
 * Task 1 & 4
 * GET /tracks
 * Returns all tracks with status 200
 */
app.get("/tracks", (req, res) => {
  res.status(200).json(tracks);
});

/**
 * Task 2, 4 & 5
 * POST /tracks
 * Accepts { name, artist } in request body
 * Validates both fields are present (Task 5 -> 400 if missing)
 * Adds new track with a unique id and returns it with status 201
 */
app.post("/tracks", (req, res) => {
  const { name, artist } = req.body;

  // Task 5: Validate that both name and artist are provided
  if (!name || !artist) {
    return res.status(400).json({
      error: "Bad Request: Both 'name' and 'artist' fields are required.",
    });
  }

  const newTrack = {
    id: nextId++,
    name,
    artist,
  };

  tracks.push(newTrack);

  // Task 4: Return 201 Created for successful POST
  res.status(201).json(newTrack);
});

/**
 * Task 3 & 4
 * DELETE /tracks/:id
 * Removes a track by id
 * Returns 204 No Content if successful
 * Returns 404 Not Found if id does not exist
 */
app.delete("/tracks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tracks.findIndex((track) => track.id === id);

  // Task 4: Return 404 if track not found
  if (index === -1) {
    return res.status(404).json({
      error: `Track with id ${id} not found.`,
    });
  }

  tracks.splice(index, 1);

  // Task 4: Return 204 No Content on successful delete
  res.status(204).send();
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Playlist API running at http://localhost:${PORT}`);
  console.log(`   GET    http://localhost:${PORT}/tracks`);
  console.log(`   POST   http://localhost:${PORT}/tracks`);
  console.log(`   DELETE http://localhost:${PORT}/tracks/:id`);
});
