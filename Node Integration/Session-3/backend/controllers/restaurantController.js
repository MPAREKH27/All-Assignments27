const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');

/**
 * Task 2 & Task 5: Add a new restaurant using async/await
 * 
 * Comparison Note (Task 5 Refactor):
 * 
 * [BEFORE - using .then()/.catch()]:
 * exports.addRestaurant = (req, res) => {
 *   const { name, cuisine, rating } = req.body;
 *   Restaurant.create({ name, cuisine, rating })
 *     .then(restaurant => res.status(201).json({ success: true, message: 'Restaurant saved!', restaurant }))
 *     .catch(err => res.status(400).json({ success: false, error: err.message }));
 * };
 * 
 * [AFTER - using async/await with try/catch]:
 */
exports.addRestaurant = async (req, res) => {
  try {
    // Task 4: Error handling for MongoDB connection state
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database connection failed: Cannot save restaurant because MongoDB is offline or disconnected.'
      });
    }

    const { name, cuisine, rating } = req.body;

    // Validate required fields explicitly
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed: Restaurant name is required.'
      });
    }

    if (!cuisine || !cuisine.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed: Cuisine type is required.'
      });
    }

    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed: Rating must be a valid number between 1 and 5.'
      });
    }

    // Task 5: Use async/await for Mongoose collection save
    const restaurant = new Restaurant({
      name: name.trim(),
      cuisine: cuisine.trim(),
      rating: numericRating
    });

    const savedRestaurant = await restaurant.save();

    // Task 2: Return the saved restaurant object to display on frontend
    return res.status(201).json({
      success: true,
      message: `Restaurant "${savedRestaurant.name}" saved successfully!`,
      restaurant: savedRestaurant
    });
  } catch (error) {
    // Task 4: Handle save operation failure
    console.error('Error in addRestaurant:', error.message);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message).join(', ');
      return res.status(400).json({
        success: false,
        error: `Save Operation Failed: ${messages}`
      });
    }

    return res.status(500).json({
      success: false,
      error: `Server Error while saving restaurant: ${error.message}`
    });
  }
};

/**
 * Get all restaurants using async/await
 */
exports.getAllRestaurants = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        error: 'Database connection failed: MongoDB is offline.'
      });
    }

    const restaurants = await Restaurant.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: restaurants.length,
      restaurants
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error.message);
    return res.status(500).json({
      success: false,
      error: `Failed to fetch restaurants: ${error.message}`
    });
  }
};
