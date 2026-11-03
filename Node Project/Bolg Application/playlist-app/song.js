/**
 * Song Model
 * Represents a musical track with title, artist, and duration in seconds.
 */
class Song {
  constructor(title, artist, duration) {
    this.title = title;
    this.artist = artist;
    this.duration = duration; // Duration in seconds
  }
}

// Sample array of 3 Song objects
const songs = [
  new Song("Bohemian Rhapsody", "Queen", 354),
  new Song("Hotel California", "Eagles", 391),
  new Song("Imagine", "John Lennon", 183)
];

// Attach class and array references for flexible CommonJS export/destructuring
songs.Song = Song;
songs.songs = songs;

module.exports = songs;

