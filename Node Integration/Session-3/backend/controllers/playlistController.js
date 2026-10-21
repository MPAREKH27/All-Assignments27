const mongoose = require('mongoose');
const Playlist = require('../models/Playlist');

/**
 * Task 1 & Task 5: Create a new playlist using async/await
 * 
 * Comparison Note (Task 5 Refactor):
 * 
 * [BEFORE - using .then()/.catch()]:
 * exports.createPlaylist = (req, res) => {
 *   const { name } = req.body;
 *   const newPlaylist = new Playlist({ name });
 *   newPlaylist.save()
 *     .then(saved => res.status(201).json({ success: true, message: 'Playlist created successfully!', playlist: saved }))
 *     .catch(err => res.status(400).json({ success: false, error: err.message }));
 * };
 * 
 * [AFTER - using async/await with try/catch]:
 */
exports.createPlaylist = async (req, res) => {
  try {
    // Task 4: Check if MongoDB is connected before attempting save
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database connection failed: MongoDB is currently disconnected or unavailable.'
      });
    }

    const { name } = req.body;

    // Validation check
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed: Playlist name cannot be empty.'
      });
    }

    // Task 5: async/await for Mongoose save operation
    const newPlaylist = new Playlist({ name: name.trim() });
    const savedPlaylist = await newPlaylist.save();

    // Task 1: Return success message and saved playlist object
    return res.status(201).json({
      success: true,
      message: `Playlist "${savedPlaylist.name}" created successfully!`,
      playlist: savedPlaylist
    });
  } catch (error) {
    // Task 4: Catch save operation failure and return error message
    console.error('Error in createPlaylist:', error.message);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message).join(', ');
      return res.status(400).json({
        success: false,
        error: `Save Operation Failed: ${messages}`
      });
    }

    return res.status(500).json({
      success: false,
      error: `Server Error while saving playlist: ${error.message}`
    });
  }
};

/**
 * Get all playlists using async/await
 */
exports.getAllPlaylists = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database connection failed: MongoDB is currently disconnected.'
      });
    }

    const playlists = await Playlist.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: playlists.length,
      playlists
    });
  } catch (error) {
    console.error('Error fetching playlists:', error.message);
    return res.status(500).json({
      success: false,
      error: `Failed to fetch playlists: ${error.message}`
    });
  }
};
