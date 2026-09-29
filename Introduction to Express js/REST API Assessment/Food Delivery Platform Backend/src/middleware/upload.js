// src/middleware/upload.js
// Multer configuration for restaurant logo image uploads

const multer = require('multer');
const path = require('path');
const { MAX_FILE_SIZE, ALLOWED_MIME_TYPES, UPLOADS_DIR } = require('../config/config');

// ── Disk Storage ─────────────────────────────────────────────────────────────
// Files are saved to the /uploads directory with a timestamped unique filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR); // resolved relative to project root
  },
  filename: (req, file, cb) => {
    // Example output: "restaurant-<id>-1700000000000.jpg"
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `restaurant-${req.params.id}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

// ── File Filter ───────────────────────────────────────────────────────────────
// Reject any file whose MIME type is not image/jpeg or image/png
const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true); // accept file
  } else {
    // Passing an error to cb causes multer to reject the file
    cb(new Error('Invalid file type. Only .jpg and .png images are allowed.'));
  }
};

// ── Multer Instance ───────────────────────────────────────────────────────────
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE, // 1 MB max
  },
});

module.exports = upload;
