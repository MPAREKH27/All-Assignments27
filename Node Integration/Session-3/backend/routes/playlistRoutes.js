const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

// Task 1: POST /playlists - saves new playlist to MongoDB, returns success message
router.post('/', playlistController.createPlaylist);

// GET /playlists - fetch all playlists
router.get('/', playlistController.getAllPlaylists);

module.exports = router;
