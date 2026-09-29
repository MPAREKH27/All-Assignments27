// ─────────────────────────────────────────────
//  playlistModel.js  –  Data layer (Model)
//  Manages the in-memory playlist data store
// ─────────────────────────────────────────────

// In-memory data store with 3 hardcoded Spotify-style playlists
let playlists = [
  { id: 1, name: "Chill Vibes",       songs: 24 },
  { id: 2, name: "Workout Bangers",   songs: 18 },
  { id: 3, name: "Late Night Drives", songs: 31 },
];

/**
 * Returns the full list of playlists.
 * @returns {Array} array of playlist objects
 */
const getAllPlaylists = () => {
  return playlists;
};

/**
 * Creates a new playlist and appends it to the store.
 * @param {string} name  - Playlist name
 * @param {number} songs - Number of songs
 * @returns {Object} the newly created playlist object
 */
const createPlaylist = (name, songs) => {
  const newPlaylist = {
    id: playlists.length + 1,
    name,
    songs,
  };
  playlists.push(newPlaylist);
  return newPlaylist;
};

module.exports = { getAllPlaylists, createPlaylist };
