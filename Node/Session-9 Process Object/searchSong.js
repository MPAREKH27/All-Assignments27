// searchSong.js
// Usage: node searchSong.js <artist name>
// Example: node searchSong.js "Arijit Singh"

const fs = require("fs");

const SONGS_FILE = "./songs.json";

// Get artist name from command line argument using process.argv
const artist = process.argv[2];

if (!artist) {
    console.log("Please provide an artist name to search!");
    console.log("Usage: node searchSong.js <artist name>");
    process.exit(1);
}

// Check if songs.json file exists
if (!fs.existsSync(SONGS_FILE)) {
    console.log("No songs found! Please add songs first using addSong.js");
    process.exit(1);
}

// Read songs from songs.json
const data = fs.readFileSync(SONGS_FILE, "utf-8");
const songs = JSON.parse(data);

// Use Array.filter to find all songs by the given artist
const matchingSongs = songs.filter(
    (song) => song.artist.toLowerCase() === artist.toLowerCase()
);

if (matchingSongs.length === 0) {
    console.log(`No songs found by artist: "${artist}"`);
} else {
    console.log(`Songs by "${artist}":`);
    matchingSongs.forEach((song, index) => {
        console.log(`  ${index + 1}. ${song.title}`);
    });
}
