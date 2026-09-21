// readPlaylist.js - Read and display the contents of playlist.txt using the fs module

const fs = require("fs"); // Import built-in File System module
const path = require("path"); // Import path module for safe file path handling

// Build an absolute path to playlist.txt in the same directory
const filePath = path.join(__dirname, "playlist.txt");

console.log("🎵 Reading your playlist...\n");

// Read the file asynchronously
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("❌ Error reading file:", err.message);
    return;
  }

  // Split file contents by newline and filter out any empty lines
  const songs = data.split("\n").filter((line) => line.trim() !== "");

  console.log("🎧 Your Favorite Playlist:");
  console.log("─".repeat(40));

  songs.forEach((song, index) => {
    console.log(`  ${index + 1}. ${song}`);
  });

  console.log("─".repeat(40));
  console.log(`✅ Total songs: ${songs.length}`);
});
