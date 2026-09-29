// Import Express
const express = require('express');

// Create an Express app
const app = express();

// ─────────────────────────────────────────────
// Task 1 – Home Route
// Visit: http://localhost:3000
// ─────────────────────────────────────────────
app.get('/', (req, res) => {
    res.send('Welcome to Express!');
});

// ─────────────────────────────────────────────
// Task 2 – Profile Route
// Visit: http://localhost:3000/profile
// ─────────────────────────────────────────────
app.get('/profile', (req, res) => {
    res.send('This is your profile page.');
});

// ─────────────────────────────────────────────
// Task 3 – Trending & Cart Routes
// Visit: http://localhost:3000/trending
// Visit: http://localhost:3000/cart
// ─────────────────────────────────────────────
app.get('/trending', (req, res) => {
    res.send('Trending Now on Insta');
});

app.get('/cart', (req, res) => {
    res.send('Your Flipkart Cart is empty.');
});

// ─────────────────────────────────────────────
// Task 4 – Custom 404 Handler (unmatched routes)
// Hint: app.use() catches all unmatched routes
// ─────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).send('Oops! Page not found on this app.');
});

// ─────────────────────────────────────────────
// Start the server on port 3000
// ─────────────────────────────────────────────
app.listen(5000, () => {
    console.log('Server is running at http://localhost:5000');
});
