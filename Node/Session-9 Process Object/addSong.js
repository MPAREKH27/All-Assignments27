// addSong.js
// Usage: node addSong.js --title "Song Title" --artist "Artist Name"
// Example: node addSong.js --title "Kesariya" --artist "Arijit Singh"

const yargs = require("yargs");
const fs = require("fs");

const SONGS_FILE = "./songs.json";

// Configure yargs to accept --title and --artist arguments
const argv = yargs(process.argv.slice(2))
    .usage("Usage: node addSong.js --title <title> --artist <artist>")
    .option("title", {
        alias: "t",
        describe: "Title of the song",
        type: "string",
        demandOption: true,
    })
    .option("artist", {
        alias: "a",
        describe: "Artist of the song",
        type: "string",
        demandOption: true,
    })
    .help()
    .argv;

const { title, artist } = argv;

// Read existing songs from songs.json (or start with empty array)
let songs = [];
if (fs.existsSync(SONGS_FILE)) {
    const data = fs.readFileSync(SONGS_FILE, "utf-8");
    songs = JSON.parse(data);
}

// Q5: Check if a song with the same title already exists using Array.find
const existingSong = songs.find(
    (song) => song.title.toLowerCase() === title.toLowerCase()
);

if (existingSong) {
    console.log("Song already exists!");
    console.log(`"${existingSong.title}" by ${existingSong.artist} is already in the list.`);
} else {
    // Create new song object and add to array
    const newSong = {
        id: songs.length + 1,
        title: title,
        artist: artist,
    };

    songs.push(newSong);

    // Save updated array back to songs.json
    fs.writeFileSync(SONGS_FILE, JSON.stringify(songs, null, 2));
    console.log("Song added successfully!");
    console.log(`Added: "${title}" by ${artist}`);
}
