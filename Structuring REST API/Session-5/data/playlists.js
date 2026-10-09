// ─────────────────────────────────────────────
//  In-memory "database" for playlists
//  Each playlist shape:
//  { id: Number, name: String, songs: String[] }
// ─────────────────────────────────────────────
let playlists = [];
let nextId = 1;

module.exports = { playlists, get nextId() { return nextId; }, incrementId() { nextId++; } };
