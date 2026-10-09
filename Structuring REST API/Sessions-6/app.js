const express = require('express');
const playlistRoutes = require('./routes/playlistRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Mount modular route files under /playlists and /users
app.use('/playlists', playlistRoutes);
app.use('/users', userRoutes);

// Root health-check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Spotify Playlist API',
    endpoints: {
      playlists: '/playlists',
      users: '/users'
    }
  });
});

// Global 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// Start server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
