// server.js
// Entry point for the Food Delivery Platform Backend
// Brings together Express, routes, middleware, and error handling

const express = require('express');
const path = require('path');
const fs = require('fs');

const { PORT, UPLOADS_DIR } = require('./src/config/config');

// ── Route modules ─────────────────────────────────────────────────────────────
const authRoutes = require('./src/routes/auth');
const restaurantRoutes = require('./src/routes/restaurants');
const orderRoutes = require('./src/routes/orders');

// ── Middleware ────────────────────────────────────────────────────────────────
const authenticate = require('./src/middleware/auth');
const errorHandler = require('./src/middleware/errorHandler');

// ── App Initialisation ────────────────────────────────────────────────────────
const app = express();

// Ensure the /uploads directory exists at startup
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  console.log(`[INIT] Created uploads directory: ./${UPLOADS_DIR}`);
}

// ── Global Middleware ─────────────────────────────────────────────────────────
app.use(express.json());              // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve uploaded images as static files at /uploads/<filename>
app.use('/uploads', express.static(path.join(__dirname, UPLOADS_DIR)));

// ── API Routes ────────────────────────────────────────────────────────────────

// Public auth routes (no JWT required)
app.use('/auth', authRoutes);

// Protected routes — JWT authenticate middleware applied here
app.use('/api/restaurants', authenticate, restaurantRoutes);
app.use('/api/orders', authenticate, orderRoutes);

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    error: false,
    message: '🍔 Food Delivery Platform API is running.',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /auth/register',
        login: 'POST /auth/login',
      },
      restaurants: {
        getAll: 'GET /api/restaurants',
        getById: 'GET /api/restaurants/:id',
        create: 'POST /api/restaurants',
        update: 'PATCH /api/restaurants/:id',
        delete: 'DELETE /api/restaurants/:id',
        addMenuItem: 'POST /api/restaurants/:id/menu',
        uploadImage: 'POST /api/restaurants/:id/image',
      },
      orders: {
        getAll: 'GET /api/orders',
        getById: 'GET /api/orders/:id',
        place: 'POST /api/orders',
        updateStatus: 'PATCH /api/orders/:id',
        delete: 'DELETE /api/orders/:id',
      },
    },
  });
});

// ── 404 Handler — unknown routes ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    error: true,
    message: `Route '${req.method} ${req.originalUrl}' not found.`,
  });
});

// ── Centralised Error Handler (must be last middleware) ───────────────────────
// Four-argument signature (err, req, res, next) is required by Express
app.use(errorHandler);

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('═══════════════════════════════════════════════════');
  console.log('  🍔 Food Delivery Platform Backend');
  console.log(`  Server running at: http://localhost:${PORT}`);
  console.log('═══════════════════════════════════════════════════');
  console.log(`  Auth:        http://localhost:${PORT}/auth`);
  console.log(`  Restaurants: http://localhost:${PORT}/api/restaurants`);
  console.log(`  Orders:      http://localhost:${PORT}/api/orders`);
  console.log('═══════════════════════════════════════════════════');
});

module.exports = app;
