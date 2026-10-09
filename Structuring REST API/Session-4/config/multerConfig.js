// ============================================================
// Multer Configuration – Task 1, 2, 3, 5
// ============================================================
// Centralised multer setup so upload instances are reusable
// across multiple route files.

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ── Helper: ensure a directory exists, create if not ─────────
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// ─────────────────────────────────────────────────────────────
// STORAGE ENGINE – Avatar uploads  (Task 1)
// Saves to  ./avatars/  with a timestamped filename
// ─────────────────────────────────────────────────────────────
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, "..", "avatars");
    ensureDir(dest);
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    // e.g. avatar-1712345678900.jpg
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `avatar-${Date.now()}${ext}`);
  },
});

// ─────────────────────────────────────────────────────────────
// FILE FILTER – Avatar: JPEG / PNG only  (Task 1 & 2)
// ─────────────────────────────────────────────────────────────
const avatarFileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // accept
  } else {
    // Reject with a structured error that our global handler understands
    const err = new Error(
      "Invalid file type. Only JPEG and PNG images are allowed for avatars."
    );
    err.status = 415;
    err.code = "INVALID_FILE_TYPE";
    cb(err, false);
  }
};

// Task 1 + Task 2: avatar uploader, limited to 1 MB
const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB  ← Task 2
  fileFilter: avatarFileFilter,
});

// ─────────────────────────────────────────────────────────────
// STORAGE ENGINE – Post images  (Task 3)
// Saves to  ./uploads/posts/  with a timestamped filename
// ─────────────────────────────────────────────────────────────
const postImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, "..", "uploads", "posts");
    ensureDir(dest);
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    // e.g. post-1712345678900.png
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `post-${Date.now()}${ext}`);
  },
});

// ─────────────────────────────────────────────────────────────
// Task 5 – AI-Generated File Extension Validator
// (Generated via ChatGPT; integrated and tested here)
//
// Original AI snippet:
//   function validateFileExtension(file, allowedExtensions) {
//     const fileExt = path.extname(file.originalname).toLowerCase().slice(1);
//     return allowedExtensions.includes(fileExt);
//   }
//
// Changes made:
//  - Wrapped inside multer's fileFilter signature (req, file, cb)
//  - Added a structured Error object so the global handler can
//    return a proper JSON response instead of a plain string.
// ─────────────────────────────────────────────────────────────

/**
 * validateFileExtension  – AI-generated helper (Task 5)
 * Returns true if the file's extension is in the allowed list.
 */
function validateFileExtension(file, allowedExtensions) {
  const fileExt = path.extname(file.originalname).toLowerCase().slice(1); // e.g. "jpg"
  return allowedExtensions.includes(fileExt);
}

// FILE FILTER – Post images: jpg, jpeg, png, gif  (Task 3 + 5)
const postImageFileFilter = (req, file, cb) => {
  const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
  ];

  // Task 5: use the AI-generated extension validator
  const extValid = validateFileExtension(file, allowedExtensions);
  const mimeValid = allowedMimeTypes.includes(file.mimetype);

  if (extValid && mimeValid) {
    cb(null, true);
  } else {
    const err = new Error(
      `Invalid file type. Allowed types are: ${allowedExtensions.join(", ")}.`
    );
    err.status = 415;
    err.code = "INVALID_FILE_TYPE";
    cb(err, false);
  }
};

// Task 3: post image uploader (no hard size cap in task 3, but
// we apply a sensible 5 MB guard in production)
const uploadPostImage = multer({
  storage: postImageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB guard
  fileFilter: postImageFileFilter,
});

module.exports = { uploadAvatar, uploadPostImage };
