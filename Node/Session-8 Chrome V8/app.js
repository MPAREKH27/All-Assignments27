// Task 4 & 6: app.js
// Imports and displays the playlist from our local module

const playlist = require('./playlist');

console.log("=== 🎵 My Favorite Spotify Playlist ===");
console.log("Here are my top 5 songs:\n");

playlist.forEach((song, index) => {
  console.log(`  ${index + 1}. ${song}`);
});

console.log("\nTotal songs in playlist:", playlist.length);
console.log("\n🔄 [UPDATED by nodemon] - Auto-restart confirmed! Happy Listening! 🎧");
