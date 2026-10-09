const mongoose = require("mongoose");

// Step 2: PlaylistCategory model
const playlistCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      // optional — no `required` flag
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlaylistCategory", playlistCategorySchema);
