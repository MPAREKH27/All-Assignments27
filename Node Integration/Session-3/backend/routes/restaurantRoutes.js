const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// Task 2: POST /restaurants - saves new restaurant, returns saved restaurant object
router.post('/', restaurantController.addRestaurant);

// GET /restaurants - fetch all restaurants
router.get('/', restaurantController.getAllRestaurants);

module.exports = router;
