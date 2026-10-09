// ============================================================
// Session-4 – File Upload API with Multer
// Main entry point (index.js)
// ============================================================

const express = require("express");
const path = require("path");

const uploadRoutes = require("./routes/uploads");
const multerErrorHandler = require("./middleware/multerErrorHandler");

const app = express();
const PORT = process.env.PORT || 4000;

// ── Built-in middleware ───────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Serve uploaded files statically (optional for preview) ───
// e.g. GET http://localhost:3000/avatars/avatar-123.jpg
app.use("/avatars", express.static(path.join(__dirname, "avatars")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ── Routes ───────────────────────────────────────────────────
app.use("/", uploadRoutes);

// ── Health-check ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "Session-4 File Upload API is running 🚀",
    endpoints: [
      "POST /upload-avatar       – Upload a profile picture (JPEG/PNG, max 1 MB)",
      "POST /upload-post-image   – Upload a social media post image (jpg/jpeg/png/gif)",
    ],
  });
});

// ── Task 4: Global Multer Error Handler ───────────────────────
// MUST be registered AFTER routes so it can catch forwarded errors
app.use(multerErrorHandler);

// ── Start server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Server running at http://localhost:${PORT}`);
  console.log(`   POST /upload-avatar      – profile picture upload`);
  console.log(`   POST /upload-post-image  – social media post image upload`);
});

module.exports = app;
