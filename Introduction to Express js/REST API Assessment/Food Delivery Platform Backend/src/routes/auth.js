// src/routes/auth.js
// Authentication routes: POST /auth/register and POST /auth/login

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/config');

const router = express.Router();

// Path to the users data file
const USERS_FILE = path.join(__dirname, '../data/users.json');

// ── Helper: Read/Write users.json ─────────────────────────────────────────────
const readUsers = () => {
  const raw = fs.readFileSync(USERS_FILE, 'utf-8');
  return JSON.parse(raw);
};

const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// ── POST /auth/register ───────────────────────────────────────────────────────
/**
 * Register a new user.
 * Body: { name, email, password }
 * Returns: 201 with user info (no password) on success.
 */
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // ── Input Validation ──────────────────────────────────────────────────────
    const errors = {};

    if (!name || typeof name !== 'string' || name.trim() === '') {
      errors.name = 'Name is required and must be a non-empty string.';
    }

    if (!email || typeof email !== 'string') {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Email must be a valid email address.';
    }

    if (!password || typeof password !== 'string') {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ error: true, message: 'Validation failed.', fields: errors });
    }

    const users = readUsers();

    // ── Duplicate Email Check ─────────────────────────────────────────────────
    const existingUser = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (existingUser) {
      return res.status(409).json({ error: true, message: 'A user with this email already exists.' });
    }

    // ── Hash Password & Persist ───────────────────────────────────────────────
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: uuidv4(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeUsers(users);

    // Return user info without the hashed password
    const { password: _pw, ...safeUser } = newUser;

    return res.status(201).json({
      error: false,
      message: 'User registered successfully.',
      user: safeUser,
    });
  } catch (err) {
    next(err); // pass to centralised error handler
  }
});

// ── POST /auth/login ──────────────────────────────────────────────────────────
/**
 * Authenticate a user and return a signed JWT.
 * Body: { email, password }
 * Returns: 200 with { token } on success.
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // ── Input Validation ──────────────────────────────────────────────────────
    const errors = {};

    if (!email || typeof email !== 'string' || email.trim() === '') {
      errors.email = 'Email is required.';
    }

    if (!password || typeof password !== 'string' || password.trim() === '') {
      errors.password = 'Password is required.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ error: true, message: 'Validation failed.', fields: errors });
    }

    const users = readUsers();

    // ── Find User ─────────────────────────────────────────────────────────────
    const user = users.find((u) => u.email === email.trim().toLowerCase());

    if (!user) {
      return res.status(401).json({ error: true, message: 'Invalid email or password.' });
    }

    // ── Verify Password ───────────────────────────────────────────────────────
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: true, message: 'Invalid email or password.' });
    }

    // ── Sign JWT ──────────────────────────────────────────────────────────────
    const payload = { id: user.id, name: user.name, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.status(200).json({
      error: false,
      message: 'Login successful.',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
