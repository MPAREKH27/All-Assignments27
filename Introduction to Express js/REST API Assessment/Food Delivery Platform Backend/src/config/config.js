// src/config/config.js
// Central configuration for the Food Delivery Platform Backend

module.exports = {
  PORT: process.env.PORT || 4000,

  // JWT secret key used to sign and verify tokens
  JWT_SECRET: process.env.JWT_SECRET || 'food_delivery_super_secret_key_2024',

  // Token expiry duration
  JWT_EXPIRES_IN: '24h',

  // Maximum file upload size (1 MB in bytes)
  MAX_FILE_SIZE: 1 * 1024 * 1024,

  // Allowed image MIME types for restaurant logo uploads
  ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png'],

  // Directory where uploaded files are stored
  UPLOADS_DIR: 'uploads',
};
