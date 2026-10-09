const mongoose = require("mongoose");

// Step 4: Song model
const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Song title is required"],
      trim: true,
    },
    artist: {
      type: String,
      trim: true,
      // optional
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlaylistCategory", // reference to PlaylistCategory model
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);
