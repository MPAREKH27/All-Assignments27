const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const PlaylistCategory = require("../models/PlaylistCategory");

// ─────────────────────────────────────────────────────────
// Step 4: POST /songs — Add a new song (linked to a category)
// ─────────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { title, artist, category } = req.body;

    // If a category ID is provided, verify it exists
    if (category) {
      const exists = await PlaylistCategory.findById(category);
      if (!exists) {
        return res.status(404).json({ error: "Category not found" });
      }
    }

    const song = new Song({ title, artist, category });
    const saved = await song.save();

    // Populate category details in the response
    const populated = await saved.populate("category", "name description");

    res.status(201).json({
      message: "Song added successfully",
      song: populated,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid category ID format" });
    }
    res.status(500).json({ error: "Server error" });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// Step 5: GET /songs?category=<categoryId> — Fetch all songs in a category
//         Uses populate() to include category name & description in response
// ────────────────────────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    // Build filter — if ?category=<id> provided, filter by it
    const filter = category ? { category } : {};

    const songs = await Song.find(filter)
      .populate("category", "name description") // 👈 Mongoose populate()
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: songs.length,
      songs,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid category ID format" });
    }
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
