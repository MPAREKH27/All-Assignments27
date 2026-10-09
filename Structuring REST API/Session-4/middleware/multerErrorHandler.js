// ============================================================
// Task 4: Custom Error Handling Middleware for Multer Errors
// ============================================================
// This middleware catches ALL multer-specific errors and sends
// user-friendly JSON responses instead of crashing the server.

const multer = require("multer");

/**
 * Global Multer Error Handler Middleware
 * Must be registered AFTER routes in app (index.js) so it can
 * intercept errors forwarded via next(err).
 */
function multerErrorHandler(err, req, res, next) {
  // ── Multer-specific errors ─────────────────────────────────
  if (err instanceof multer.MulterError) {
    // File size exceeded the configured limit
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        success: false,
        error: "FILE_TOO_LARGE",
        message: "The uploaded file exceeds the maximum allowed size of 1 MB.",
      });
    }

    // Any other multer error (unexpected field, too many files, etc.)
    return res.status(400).json({
      success: false,
      error: err.code,
      message: `Upload error: ${err.message}`,
    });
  }

  // ── Custom application-level errors (e.g. invalid file type) ─
  if (err && err.status) {
    return res.status(err.status).json({
      success: false,
      error: err.code || "UPLOAD_ERROR",
      message: err.message,
    });
  }

  // ── Unknown / unhandled errors ────────────────────────────
  if (err) {
    return res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: err.message || "An unexpected error occurred.",
    });
  }

  next();
}

module.exports = multerErrorHandler;
