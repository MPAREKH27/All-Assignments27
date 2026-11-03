const express = require('express');
const songs = require('./song');
const { Song } = songs;

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// 1. Root route: Responds with 'Welcome to Playlist App'
app.get('/', (req, res) => {
  res.send('Welcome to Playlist App');
});

// 2. GET /songs route: Returns all songs in JSON format
app.get('/songs', (req, res) => {
  res.status(200).json(songs);
});

/**
 * Sample validation middleware generated with AI (ChatGPT / Copilot)
 * Validates that:
 * - 'title' is provided, is a string, and is not empty.
 * - 'duration' is provided, is a valid number, and is strictly positive (> 0).
 */
function validateSongInput(req, res, next) {
  const { title, duration } = req.body;
  const errors = [];

  // Title validation: ensure it exists, is a string, and is not just whitespace
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push("Title is required and cannot be empty.");
  }

  // Duration validation: ensure it is a valid positive number
  if (duration === undefined || typeof duration !== 'number' || isNaN(duration) || duration <= 0) {
    errors.push("Duration must be a positive number (in seconds).");
  }

  // If there are validation errors, return 400 Bad Request
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
}

// 3. POST /songs route: Adds a new song after validation and returns the updated song list
app.post('/songs', validateSongInput, (req, res) => {
  const { title, artist, duration } = req.body;

  // Create new Song instance using the model
  const newSong = new Song(title.trim(), artist ? artist.trim() : 'Unknown Artist', duration);

  // Add the new song to our playlist
  songs.push(newSong);

  // Return the updated song list
  res.status(201).json(songs);
});

// Start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Playlist App server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;

