const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB using async/await (Task 5)
connectDB();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for dev simplicity
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logger for observability
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Import Routes
const playlistRoutes = require('./routes/playlistRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const movieRoutes = require('./routes/movieRoutes');
const debugRoutes = require('./routes/debugRoutes');

// Mount Routes
// Task 1: POST /playlists (and GET /playlists)
app.use('/playlists', playlistRoutes);

// Task 2: POST /restaurants (and GET /restaurants)
app.use('/restaurants', restaurantRoutes);

// Task 3: GET /movies (and POST /movies)
app.use('/movies', movieRoutes);

// Debug & Health routes for Task 4 testing
app.use('/api', debugRoutes);

// Base route for quick server check
app.get('/', (req, res) => {
  res.json({
    status: 'Online',
    message: 'MERN Session 3 Backend API is running',
    tasks: {
      task1: 'POST /playlists (Create playlist)',
      task2: 'POST /restaurants (Add restaurant with name, cuisine, rating)',
      task3: 'GET /movies (Fetch all movie documents from MongoDB)',
      task4: 'Error Handling with alert response payload',
      task5: 'Refactored to async/await with try/catch'
    }
  });
});

// Task 4: Centralized Error Handling Middleware
// If any route or async handler fails unexpectedly, return a clean error message
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]:', err);
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    error: err.message || 'An unexpected internal server error occurred',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: [${req.method}] ${req.originalUrl}`
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 Node Backend running on http://localhost:${PORT}`);
  console.log(`📡 Ready for React frontend requests`);
});

module.exports = app;
