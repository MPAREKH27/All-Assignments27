const express = require('express');
const mongoose = require('mongoose');
const Playlist = require('../models/Playlist');
const Restaurant = require('../models/Restaurant');
const Movie = require('../models/Movie');

const router = express.Router();

/**
 * Health & Connection Status endpoint
 */
router.get('/health', async (req, res) => {
  const stateCode = mongoose.connection.readyState;
  const states = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
  const stateName = states[stateCode] || 'Unknown';
  const isConnected = stateCode === 1;

  let counts = { playlists: 0, restaurants: 0, movies: 0 };
  if (isConnected) {
    try {
      counts.playlists = await Playlist.countDocuments();
      counts.restaurants = await Restaurant.countDocuments();
      counts.movies = await Movie.countDocuments();
    } catch (e) {
      // count failure
    }
  }

  return res.status(isConnected ? 200 : 503).json({
    success: isConnected,
    dbStatus: stateName,
    readyState: stateCode,
    database: mongoose.connection.name || 'mern_session3',
    host: mongoose.connection.host || '127.0.0.1',
    counts,
    timestamp: new Date().toISOString()
  });
});

/**
 * Task 4 Testing Helper: Simulate a DB connection failure
 */
router.get('/simulate-disconnect', (req, res) => {
  return res.status(503).json({
    success: false,
    error: 'Simulated Database Failure: MongoDB connection timeout (Error: ECONNREFUSED 127.0.0.1:27017)'
  });
});

/**
 * Task 4 Testing Helper: Simulate a Mongoose save operation failure
 */
router.post('/simulate-save-fail', (req, res) => {
  return res.status(500).json({
    success: false,
    error: 'Simulated Save Operation Failure: Mongoose WriteConflict / Document validation constraint violated.'
  });
});

module.exports = router;
