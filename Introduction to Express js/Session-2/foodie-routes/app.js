const express = require('express');
const app = express();
const PORT = 4000;

// ─────────────────────────────────────────────
// Task 1: Basic Routes - /home and /about
// ─────────────────────────────────────────────

app.get('/home', (req, res) => {
  res.send('Welcome to Foodie!');
});

app.get('/about', (req, res) => {
  res.send('About Foodie App');
});

// ─────────────────────────────────────────────
// Task 2 & 5: Dynamic Route - /restaurant/:name
// Uses req.params to access the dynamic segment.
// Returns 400 if name is missing or empty.
// ─────────────────────────────────────────────

app.get('/restaurant/:name', (req, res) => {
  const { name } = req.params;

  // Task 5: Validate that name is not missing or empty
  if (!name || name.trim() === '') {
    return res.status(400).send('Restaurant name required');
  }

  res.send(`You are viewing ${name}`);
});

// ─────────────────────────────────────────────
// Task 3: Query String Route - /search?q=pizza
// Uses req.query to access query parameters.
// ─────────────────────────────────────────────

app.get('/search', (req, res) => {
  const { q } = req.query;
  res.send(`Results for: ${q}`);
});

// ─────────────────────────────────────────────
// Task 4: Combined Params + Query - /movie/:id/details
// Returns JSON with id (from params) and genre (from query).
// ─────────────────────────────────────────────

app.get('/movie/:id/details', (req, res) => {
  const { id } = req.params;
  const { genre } = req.query;

  res.json({
    id: id,
    genre: genre
  });
});

// ─────────────────────────────────────────────
// Start the server
// ─────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Foodie Routes app is running at http://localhost:${PORT}`);
  console.log('');
  console.log('Available Routes:');
  console.log(`  GET  http://localhost:${PORT}/home`);
  console.log(`  GET  http://localhost:${PORT}/about`);
  console.log(`  GET  http://localhost:${PORT}/restaurant/:name`);
  console.log(`  GET  http://localhost:${PORT}/search?q=pizza`);
  console.log(`  GET  http://localhost:${PORT}/movie/:id/details?genre=action`);
});
