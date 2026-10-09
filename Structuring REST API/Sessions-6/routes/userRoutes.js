const express = require('express');
const router = express.Router();

// Helper function to simulate async operation
const fakeDbDelay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory array storing users
let users = [
  { id: 1, username: 'alex_music', email: 'alex@example.com' },
  { id: 2, username: 'beat_master', email: 'beat@example.com' }
];

/**
 * GET /users
 * Retrieve all registered users
 */
router.get('/', async (req, res) => {
  try {
    await fakeDbDelay();
    res.status(200).json({
      success: true,
      data: users.map(u => ({ id: u.id, username: u.username, email: u.email }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve users',
      error: error.message
    });
  }
});

/**
 * POST /users/register
 * Register a new user
 */
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: username, email, and password are required'
      });
    }

    await fakeDbDelay(300);

    const existingUser = users.find(u => u.email === email || u.username === username);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this username or email already exists'
      });
    }

    const newUser = {
      id: users.length + 1,
      username: username.trim(),
      email: email.trim()
    };

    users.push({ ...newUser, password });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed due to server error',
      error: error.message
    });
  }
});

/**
 * POST /users/login
 * User login endpoint
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    await fakeDbDelay(250);

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        token: 'fake-jwt-token-xyz123'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed due to server error',
      error: error.message
    });
  }
});

module.exports = router;
