// src/middleware/auth.js
// JWT authentication middleware — protects /api/* routes

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

/**
 * Verifies the Bearer token from the Authorization header.
 * Attaches the decoded payload to req.user on success.
 * Passes a structured error to the centralised error handler on failure.
 */
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Expect header in format: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: true,
      message: 'Access denied. No token provided. Please include a Bearer token in the Authorization header.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach decoded payload { id, name, email } to request
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: true,
        message: 'Token has expired. Please log in again.',
      });
    }
    return res.status(401).json({
      error: true,
      message: 'Invalid token. Authentication failed.',
    });
  }
};

module.exports = authenticate;
