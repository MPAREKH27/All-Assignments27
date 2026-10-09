const express = require("express");
const router = express.Router();
const PlaylistCategory = require("../models/PlaylistCategory");

// ─────────────────────────────────────────────
// Step 2: POST /categories — Add a new category
// ─────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = new PlaylistCategory({ name, description });
    const saved = await category.save();

    res.status(201).json({
      message: "Category created successfully",
      category: saved,
    });
  } catch (err) {
    // Handle validation errors
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Server error" });
  }
});

// ─────────────────────────────────────────────
// Step 3: GET /categories — List all categories
// ─────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const categories = await PlaylistCategory.find().sort({ createdAt: -1 });
    res.status(200).json({
      count: categories.length,
      categories,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ──────────────────────────────────────────────────────────
// Step 3: DELETE /categories/:id — Delete a category by ID
// ──────────────────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await PlaylistCategory.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({
      message: "Category deleted successfully",
      category: deleted,
    });
  } catch (err) {
    // Invalid ObjectId format
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid category ID format" });
    }
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
