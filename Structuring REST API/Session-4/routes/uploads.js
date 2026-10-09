// ============================================================
// Routes – Upload Endpoints  (Tasks 1 – 5)
// ============================================================

const express = require("express");
const router = express.Router();
const { uploadAvatar, uploadPostImage } = require("../config/multerConfig");

// ─────────────────────────────────────────────────────────────
// Task 1 & 2 – POST /upload-avatar
// Accepts a single file (field name: "avatar")
// • Only JPEG / PNG allowed  (Task 1)
// • Rejects files > 1 MB    (Task 2)
// ─────────────────────────────────────────────────────────────
router.post(
  "/upload-avatar",
  (req, res, next) => {
    // Use .single() inside the route so we can forward errors to
    // our global error handler via next(err)  ← required for Task 4
    uploadAvatar.single("avatar")(req, res, (err) => {
      if (err) return next(err); // forward to global multerErrorHandler
      next();
    });
  },
  (req, res) => {
    // If no file was sent at all
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "NO_FILE",
        message: "No file uploaded. Please attach a file with the field name 'avatar'.",
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: "Avatar uploaded successfully!",
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: `${(req.file.size / 1024).toFixed(2)} KB`,
        mimetype: req.file.mimetype,
        path: req.file.path,
      },
    });
  }
);

// ─────────────────────────────────────────────────────────────
// Task 3 – POST /upload-post-image
// Instagram-style post image upload
// • Allowed: jpg, jpeg, png, gif
// • Returns: filename + file size in JSON
// ─────────────────────────────────────────────────────────────
router.post(
  "/upload-post-image",
  (req, res, next) => {
    uploadPostImage.single("postImage")(req, res, (err) => {
      if (err) return next(err); // forward to global multerErrorHandler (Task 4)
      next();
    });
  },
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "NO_FILE",
        message:
          "No file uploaded. Please attach an image with the field name 'postImage'.",
      });
    }

    // Task 3: return filename and file size
    return res.status(200).json({
      success: true,
      message: "Post image uploaded successfully!",
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        // File size in both bytes and KB for clarity
        sizeBytes: req.file.size,
        sizeKB: `${(req.file.size / 1024).toFixed(2)} KB`,
        mimetype: req.file.mimetype,
        path: req.file.path,
      },
    });
  }
);

module.exports = router;
