const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Task 3: GET /movies - fetches all movie documents from MongoDB and returns as JSON
router.get('/', movieController.getMovies);

// Additional helpful endpoints:
router.post('/', movieController.addMovie);
router.post('/seed', movieController.seedMovies);

module.exports = router;
