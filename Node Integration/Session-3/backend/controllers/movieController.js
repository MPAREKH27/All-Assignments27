const mongoose = require('mongoose');
const Movie = require('../models/Movie');

/**
 * Task 3 & Task 5: Implement GET /movies endpoint
 * Fetches all movie documents from MongoDB and returns them as JSON using async/await
 * 
 * Comparison Note (Task 5 Refactor):
 * 
 * [BEFORE - using .then()/.catch()]:
 * exports.getMovies = (req, res) => {
 *   Movie.find()
 *     .then(movies => res.status(200).json(movies))
 *     .catch(err => res.status(500).json({ success: false, error: err.message }));
 * };
 * 
 * [AFTER - using async/await with try/catch]:
 */
exports.getMovies = async (req, res) => {
  try {
    // Task 4: Error handling for database connection failure
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database connection failed: Cannot fetch movies because MongoDB is not connected.'
      });
    }

    // Task 5: Fetch all movie documents using async/await
    const movies = await Movie.find().sort({ releaseYear: -1 });

    // Task 3: Returns them as JSON
    return res.status(200).json(movies);
  } catch (error) {
    // Task 4: Error handling for fetch/database error
    console.error('Error fetching movies:', error.message);
    return res.status(500).json({
      success: false,
      error: `Server Error while fetching movies: ${error.message}`
    });
  }
};

/**
 * Add a new movie using async/await
 */
exports.addMovie = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database connection failed: MongoDB is offline.'
      });
    }

    const { title, genre, releaseYear, rating, director, description, posterUrl } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed: Movie title is required.'
      });
    }

    if (!genre || !genre.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed: Movie genre is required.'
      });
    }

    if (!releaseYear || isNaN(Number(releaseYear))) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed: Valid release year is required.'
      });
    }

    const newMovie = new Movie({
      title: title.trim(),
      genre: genre.trim(),
      releaseYear: Number(releaseYear),
      rating: rating ? Number(rating) : 8.0,
      director: director ? director.trim() : 'Unknown Director',
      description: description ? description.trim() : '',
      posterUrl: posterUrl ? posterUrl.trim() : ''
    });

    const savedMovie = await newMovie.save();

    return res.status(201).json({
      success: true,
      message: `Movie "${savedMovie.title}" added successfully!`,
      movie: savedMovie
    });
  } catch (error) {
    console.error('Error adding movie:', error.message);
    return res.status(500).json({
      success: false,
      error: `Failed to save movie: ${error.message}`
    });
  }
};

/**
 * Seed initial sample movies so GET /movies has rich data to display
 */
exports.seedMovies = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database connection failed: MongoDB is offline.'
      });
    }

    const sampleMovies = [
      {
        title: 'Inception',
        genre: 'Sci-Fi / Action',
        releaseYear: 2010,
        rating: 8.8,
        director: 'Christopher Nolan',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80'
      },
      {
        title: 'Interstellar',
        genre: 'Sci-Fi / Adventure',
        releaseYear: 2014,
        rating: 8.7,
        director: 'Christopher Nolan',
        description: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot is tasked to pilot a spacecraft along with a team of researchers.',
        posterUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80'
      },
      {
        title: 'The Dark Knight',
        genre: 'Action / Crime',
        releaseYear: 2008,
        rating: 9.0,
        director: 'Christopher Nolan',
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability.',
        posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80'
      },
      {
        title: 'Spirited Away',
        genre: 'Animation / Fantasy',
        releaseYear: 2001,
        rating: 8.6,
        director: 'Hayao Miyazaki',
        description: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
        posterUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80'
      },
      {
        title: 'Pulp Fiction',
        genre: 'Crime / Drama',
        releaseYear: 1994,
        rating: 8.9,
        director: 'Quentin Tarantino',
        description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80'
      }
    ];

    // Check count first
    const existingCount = await Movie.countDocuments();
    if (existingCount > 0 && !req.query.force) {
      const allMovies = await Movie.find().sort({ releaseYear: -1 });
      return res.status(200).json({
        success: true,
        message: 'Movies already exist in database',
        movies: allMovies
      });
    }

    if (req.query.force) {
      await Movie.deleteMany({});
    }

    const inserted = await Movie.insertMany(sampleMovies);
    return res.status(201).json({
      success: true,
      message: `Successfully seeded ${inserted.length} sample movies!`,
      movies: inserted
    });
  } catch (error) {
    console.error('Error seeding movies:', error.message);
    return res.status(500).json({
      success: false,
      error: `Seed operation failed: ${error.message}`
    });
  }
};
