const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Movie title is required'],
      trim: true
    },
    genre: {
      type: String,
      required: [true, 'Movie genre is required'],
      trim: true
    },
    releaseYear: {
      type: Number,
      required: [true, 'Release year is required'],
      min: [1888, 'Release year must be valid']
    },
    rating: {
      type: Number,
      min: [0, 'Rating cannot be negative'],
      max: [10, 'Rating cannot exceed 10'],
      default: 8.0
    },
    director: {
      type: String,
      trim: true,
      default: 'Unknown Director'
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    posterUrl: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Movie', movieSchema);
