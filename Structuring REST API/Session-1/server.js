// REST API Assignment - Node.js + Express (in-memory data, no database needed)
const express = require("express");
const { randomUUID } = require("crypto");

const app = express();
app.use(express.json());

// ---------- In-memory "databases" ----------
const songs = [
  { id: "s1", title: "Tum Hi Ho", artist: "Arijit Singh" },
  { id: "s2", title: "Kesariya", artist: "Arijit Singh" },
  { id: "s3", title: "Apna Time Aayega", artist: "Ranveer Singh" },
];
const playlists = [];
const users = { 1024: { id: 1024, name: "Demo User", addresses: [{ id: 7, label: "Home", city: "Surat", pincode: "395007", isDefault: true }] } };
const movies = [{ id: "m1", title: "Inception" }, { id: "m2", title: "3 Idiots" }];
const bookings = [];

// ---------- Small helpers ----------
const findPlaylist = (req, res) => {
  const p = playlists.find((x) => x.id === req.params.playlistId);
  if (!p) res.status(404).json({ error: "Playlist not found" });
  return p;
};

// =====================================================
// 2. PLAYLIST API (Spotify style)
// =====================================================

// Create playlist
app.post("/playlists", (req, res) => {
  const { name, description = "", isPublic = true } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });
  const playlist = { id: randomUUID(), name, description, isPublic, songIds: [], createdAt: new Date().toISOString() };
  playlists.push(playlist);
  res.status(201).location(`/playlists/${playlist.id}`).json(playlist);
});

// Get all playlists
app.get("/playlists", (req, res) => res.json(playlists));

// Get playlist details (with song info)
app.get("/playlists/:playlistId", (req, res) => {
  const p = findPlaylist(req, res);
  if (!p) return;
  res.json({ ...p, songs: p.songIds.map((id) => songs.find((s) => s.id === id)) });
});

// Update playlist info (PUT = full replace of editable fields)
app.put("/playlists/:playlistId", (req, res) => {
  const p = findPlaylist(req, res);
  if (!p) return;
  const { name, description, isPublic } = req.body;
  if (!name) return res.status(400).json({ error: "name is required for PUT" });
  Object.assign(p, { name, description: description ?? "", isPublic: isPublic ?? true });
  res.json(p);
});

// Partial update (PATCH)
app.patch("/playlists/:playlistId", (req, res) => {
  const p = findPlaylist(req, res);
  if (!p) return;
  ["name", "description", "isPublic"].forEach((k) => {
    if (req.body[k] !== undefined) p[k] = req.body[k];
  });
  res.json(p);
});

// Delete playlist
app.delete("/playlists/:playlistId", (req, res) => {
  const i = playlists.findIndex((x) => x.id === req.params.playlistId);
  if (i === -1) return res.status(404).json({ error: "Playlist not found" });
  playlists.splice(i, 1);
  res.status(204).send();
});

// Add song to playlist
app.post("/playlists/:playlistId/songs", (req, res) => {
  const p = findPlaylist(req, res);
  if (!p) return;
  const { songId } = req.body;
  if (!songs.find((s) => s.id === songId)) return res.status(404).json({ error: "Song not found" });
  if (p.songIds.includes(songId)) return res.status(409).json({ error: "Song already in playlist" });
  p.songIds.push(songId);
  res.status(201).json({ playlistId: p.id, songId });
});

// Get songs in playlist (with simple pagination)
app.get("/playlists/:playlistId/songs", (req, res) => {
  const p = findPlaylist(req, res);
  if (!p) return;
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit) || 20, 1);
  const items = p.songIds.map((id) => songs.find((s) => s.id === id)).slice((page - 1) * limit, page * limit);
  res.json({ page, limit, total: p.songIds.length, items });
});

// Remove song from playlist
app.delete("/playlists/:playlistId/songs/:songId", (req, res) => {
  const p = findPlaylist(req, res);
  if (!p) return;
  const i = p.songIds.indexOf(req.params.songId);
  if (i === -1) return res.status(404).json({ error: "Song not in playlist" });
  p.songIds.splice(i, 1);
  res.status(204).send();
});

// Reorder songs
app.put("/playlists/:playlistId/songs/order", (req, res) => {
  const p = findPlaylist(req, res);
  if (!p) return;
  const { songIds } = req.body;
  const same = Array.isArray(songIds) && songIds.length === p.songIds.length && songIds.every((id) => p.songIds.includes(id));
  if (!same) return res.status(400).json({ error: "songIds must contain exactly the songs already in the playlist" });
  p.songIds = songIds;
  res.json(p);
});

// Helper route so you can see the available songs
app.get("/songs", (req, res) => res.json(songs));

// =====================================================
// 3. UPDATE DELIVERY ADDRESS (Swiggy style)
// =====================================================
app.put("/users/:userId/addresses/:addressId", (req, res) => {
  const user = users[req.params.userId];
  if (!user) return res.status(404).json({ error: "User not found" });
  const idx = user.addresses.findIndex((a) => a.id === Number(req.params.addressId));
  if (idx === -1) return res.status(404).json({ error: "Address not found" });

  const { label, addressLine1, city, state, pincode } = req.body;
  if (!addressLine1 || !city || !pincode) {
    return res.status(400).json({ error: "addressLine1, city and pincode are required" });
  }
  const updated = { ...req.body, id: user.addresses[idx].id };
  user.addresses[idx] = updated;
  res.status(200).json(updated);
});

// =====================================================
// 4. MOVIE BOOKING API - CORRECTED VERSION
// =====================================================

// BEFORE: POST /getMovies        -> AFTER: GET /movies
app.get("/movies", (req, res) => res.json(movies));

// BEFORE: PUT /addUser           -> AFTER: POST /users
app.post("/users", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });
  const id = Date.now();
  users[id] = { id, name, addresses: [] };
  res.status(201).json(users[id]);
});

// Create a booking (supporting route for the delete example)
app.post("/bookings", (req, res) => {
  const { movieId, seats } = req.body;
  if (!movies.find((m) => m.id === movieId)) return res.status(404).json({ error: "Movie not found" });
  const booking = { id: randomUUID(), movieId, seats: seats ?? 1 };
  bookings.push(booking);
  res.status(201).json(booking);
});

// BEFORE: GET /deleteBooking/{id} -> AFTER: DELETE /bookings/{id}
app.delete("/bookings/:id", (req, res) => {
  const i = bookings.findIndex((b) => b.id === req.params.id);
  if (i === -1) return res.status(404).json({ error: "Booking not found" });
  bookings.splice(i, 1);
  res.status(204).send();
});

app.get("/", (req, res) => {
  res.json({
    message: "REST API is running",
    endpoints: ["/playlists", "/songs", "/movies", "/bookings", "/users/:userId/addresses/:addressId"],
  });
});

// ---------- 404 + error handling ----------
app.use((req, res) => res.status(404).json({ error: "Route not found" }));
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") return res.status(400).json({ error: "Invalid JSON" });
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));


