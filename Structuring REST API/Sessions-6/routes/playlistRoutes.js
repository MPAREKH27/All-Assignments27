const express = require('express');
const router = express.Router();

// Helper function to simulate asynchronous database operations using setTimeout wrapped in a Promise
const fakeDbDelay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory array storing Spotify-style playlists
let playlists = [
  { id: 1, name: "Today's Top Hits", songsCount: 50 },
  { id: 2, name: "Discover Weekly", songsCount: 30 },
  { id: 3, name: "Chill Lofi Study Beats", songsCount: 75 },
  { id: 4, name: "Rock Classics", songsCount: 42 },
  { id: 5, name: "Deep Focus", songsCount: 60 }
];

/**
 * 1. GET /playlists
 * Returns the list of all Spotify-style playlists
 */
router.get('/', async (req, res) => {
  try {
    await fakeDbDelay();
    res.status(200).json({
      success: true,
      data: playlists
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch playlists',
      error: error.message
    });
  }
});

/**
 * GET /playlists/:id
 * Fetch a single playlist by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid playlist ID parameter'
      });
    }

    await fakeDbDelay();
    const playlist = playlists.find((p) => p.id === id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: `Playlist with ID ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: playlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching playlist',
      error: error.message
    });
  }
});

/**
 * 2. PUT /playlists/:id
 * Updates the name of a playlist by its ID using async/await and fake DB delay
 */
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid playlist ID parameter'
      });
    }

    const { name, songsCount } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Playlist name is required for update'
      });
    }

    // Simulate async database operation
    await fakeDbDelay(300);

    const playlistIndex = playlists.findIndex((p) => p.id === id);

    if (playlistIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Playlist with ID ${id} not found`
      });
    }

    // Update playlist details in-memory
    playlists[playlistIndex].name = name.trim();
    if (songsCount !== undefined && !isNaN(Number(songsCount))) {
      playlists[playlistIndex].songsCount = Number(songsCount);
    }

    res.status(200).json({
      success: true,
      message: 'Playlist updated successfully',
      data: playlists[playlistIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update playlist',
      error: error.message
    });
  }
});

/**
 * 3. DELETE /playlists/:id
 * Removes a playlist by its ID and returns a success message or an error if not found
 */
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid playlist ID parameter'
      });
    }

    // Simulate async database operation
    await fakeDbDelay(250);

    const playlistIndex = playlists.findIndex((p) => p.id === id);

    if (playlistIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Playlist with ID ${id} not found`
      });
    }

    const deletedPlaylist = playlists.splice(playlistIndex, 1)[0];

    res.status(200).json({
      success: true,
      message: `Playlist '${deletedPlaylist.name}' deleted successfully`,
      data: deletedPlaylist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete playlist',
      error: error.message
    });
  }
});

module.exports = router;
