const fs = require('fs');
const path = require('path');

// Array of 5 favorite song names
const songs = [
  'Bohemian Rhapsody',
  'Hotel California',
  'Imagine',
  'Stairway to Heaven',
  'Sweet Child O\' Mine'
];

const filePath = path.join(__dirname, 'playlist.txt');
const fileContent = songs.join('\n');

// Write song names into playlist.txt
fs.writeFile(filePath, fileContent, 'utf8', (err) => {
  if (err) {
    console.error('Error writing playlist:', err);
    return;
  }
  console.log('Playlist successfully written to playlist.txt!');
});
