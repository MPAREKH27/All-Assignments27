// src/routes/restaurants.js
// Full CRUD + menu + image upload routes for /api/restaurants
// All routes are protected by JWT authenticate middleware (applied in server.js)

const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const upload = require('../middleware/upload');

const router = express.Router();

// Path to the restaurants JSON data file
const RESTAURANTS_FILE = path.join(__dirname, '../data/restaurants.json');

// ── Helper: Read/Write restaurants.json ───────────────────────────────────────
const readRestaurants = () => {
  const raw = fs.readFileSync(RESTAURANTS_FILE, 'utf-8');
  return JSON.parse(raw);
};

const writeRestaurants = (data) => {
  fs.writeFileSync(RESTAURANTS_FILE, JSON.stringify(data, null, 2));
};

// ═════════════════════════════════════════════════════════════════════════════
//  GET /api/restaurants — Return all restaurants
// ═════════════════════════════════════════════════════════════════════════════
router.get('/', (req, res, next) => {
  try {
    const restaurants = readRestaurants();
    return res.status(200).json({
      error: false,
      count: restaurants.length,
      restaurants,
    });
  } catch (err) {
    next(err);
  }
});

// ═════════════════════════════════════════════════════════════════════════════
//  GET /api/restaurants/:id — Return a single restaurant by ID
// ═════════════════════════════════════════════════════════════════════════════
router.get('/:id', (req, res, next) => {
  try {
    const restaurants = readRestaurants();
    const restaurant = restaurants.find((r) => r.id === req.params.id);

    if (!restaurant) {
      return res.status(404).json({ error: true, message: `Restaurant with ID '${req.params.id}' not found.` });
    }

    return res.status(200).json({ error: false, restaurant });
  } catch (err) {
    next(err);
  }
});

// ═════════════════════════════════════════════════════════════════════════════
//  POST /api/restaurants — Create a new restaurant
//  Body: { name, cuisine, address, phone }
// ═════════════════════════════════════════════════════════════════════════════
router.post('/', (req, res, next) => {
  try {
    const { name, cuisine, address, phone } = req.body;

    // ── Validation ─────────────────────────────────────────────────────────
    const errors = {};

    if (!name || typeof name !== 'string' || name.trim() === '') {
      errors.name = 'Restaurant name is required.';
    }
    if (!cuisine || typeof cuisine !== 'string' || cuisine.trim() === '') {
      errors.cuisine = 'Cuisine type is required.';
    }
    if (!address || typeof address !== 'string' || address.trim() === '') {
      errors.address = 'Address is required.';
    }
    if (!phone || typeof phone !== 'string' || phone.trim() === '') {
      errors.phone = 'Phone number is required.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ error: true, message: 'Validation failed.', fields: errors });
    }

    const restaurants = readRestaurants();

    const newRestaurant = {
      id: uuidv4(),
      name: name.trim(),
      cuisine: cuisine.trim(),
      address: address.trim(),
      phone: phone.trim(),
      menu: [],        // starts with an empty menu array
      image: null,     // populated later via POST /:id/image
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    restaurants.push(newRestaurant);
    writeRestaurants(restaurants);

    return res.status(201).json({
      error: false,
      message: 'Restaurant created successfully.',
      restaurant: newRestaurant,
    });
  } catch (err) {
    next(err);
  }
});

// ═════════════════════════════════════════════════════════════════════════════
//  PATCH /api/restaurants/:id — Partially update a restaurant
//  Body: any subset of { name, cuisine, address, phone }
// ═════════════════════════════════════════════════════════════════════════════
router.patch('/:id', (req, res, next) => {
  try {
    const restaurants = readRestaurants();
    const index = restaurants.findIndex((r) => r.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: true, message: `Restaurant with ID '${req.params.id}' not found.` });
    }

    const allowedFields = ['name', 'cuisine', 'address', 'phone'];
    const updates = {};

    // Only apply allowed, non-empty string fields from the request body
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (typeof req.body[field] !== 'string' || req.body[field].trim() === '') {
          // field provided but invalid — skip silently or return 400
          // Here we return 400 to be explicit
          return res.status(400).json({
            error: true,
            message: `Field '${field}' must be a non-empty string.`,
          });
        }
        updates[field] = req.body[field].trim();
      }
    });

    // If no body was sent at all
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: true, message: 'No valid fields provided for update.' });
    }

    restaurants[index] = {
      ...restaurants[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    writeRestaurants(restaurants);

    return res.status(200).json({
      error: false,
      message: 'Restaurant updated successfully.',
      restaurant: restaurants[index],
    });
  } catch (err) {
    next(err);
  }
});

// ═════════════════════════════════════════════════════════════════════════════
//  DELETE /api/restaurants/:id — Remove a restaurant
// ═════════════════════════════════════════════════════════════════════════════
router.delete('/:id', (req, res, next) => {
  try {
    const restaurants = readRestaurants();
    const index = restaurants.findIndex((r) => r.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: true, message: `Restaurant with ID '${req.params.id}' not found.` });
    }

    const [deleted] = restaurants.splice(index, 1);
    writeRestaurants(restaurants);

    return res.status(200).json({
      error: false,
      message: 'Restaurant deleted successfully.',
      restaurant: deleted,
    });
  } catch (err) {
    next(err);
  }
});

// ═════════════════════════════════════════════════════════════════════════════
//  POST /api/restaurants/:id/menu — Add a menu item to a restaurant
//  Body: { name, price (positive number), category }
// ═════════════════════════════════════════════════════════════════════════════
router.post('/:id/menu', (req, res, next) => {
  try {
    const restaurants = readRestaurants();
    const index = restaurants.findIndex((r) => r.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: true, message: `Restaurant with ID '${req.params.id}' not found.` });
    }

    const { name, price, category } = req.body;

    // ── Field-Level Validation ─────────────────────────────────────────────
    const errors = {};

    if (!name || typeof name !== 'string' || name.trim() === '') {
      errors.name = 'Menu item name is required and must be a non-empty string.';
    }

    const parsedPrice = parseFloat(price);
    if (price === undefined || price === null || price === '') {
      errors.price = 'Price is required.';
    } else if (isNaN(parsedPrice)) {
      errors.price = 'Price must be a valid number.';
    } else if (parsedPrice <= 0) {
      errors.price = 'Price must be a positive number greater than 0.';
    }

    if (!category || typeof category !== 'string' || category.trim() === '') {
      errors.category = 'Category is required and must be a non-empty string.';
    }

    // Return HTTP 400 with field-level error messages on any violation
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        error: true,
        message: 'Menu item validation failed.',
        fields: errors,
      });
    }

    // ── Add Menu Item ──────────────────────────────────────────────────────
    const menuItem = {
      id: uuidv4(),
      name: name.trim(),
      price: parsedPrice,
      category: category.trim(),
      addedAt: new Date().toISOString(),
    };

    restaurants[index].menu.push(menuItem);
    restaurants[index].updatedAt = new Date().toISOString();
    writeRestaurants(restaurants);

    return res.status(201).json({
      error: false,
      message: 'Menu item added successfully.',
      menuItem,
      totalMenuItems: restaurants[index].menu.length,
    });
  } catch (err) {
    next(err);
  }
});

// ═════════════════════════════════════════════════════════════════════════════
//  POST /api/restaurants/:id/image — Upload restaurant logo
//  Accepts: multipart/form-data with field "image"
//  Constraints: .jpg/.png only, max 1 MB
// ═════════════════════════════════════════════════════════════════════════════
router.post('/:id/image', (req, res, next) => {
  // We use a custom multer error wrapper so multer errors feed into errorHandler
  upload.single('image')(req, res, (err) => {
    if (err) {
      // Multer-specific errors (file size exceeded, wrong type, etc.)
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          error: true,
          message: 'File too large. Maximum allowed size is 1 MB.',
        });
      }
      // Custom fileFilter rejection or any other multer error
      return res.status(400).json({
        error: true,
        message: err.message || 'File upload failed.',
      });
    }

    // No file was sent
    if (!req.file) {
      return res.status(400).json({
        error: true,
        message: 'No image file provided. Please upload a .jpg or .png file using the "image" form field.',
      });
    }

    try {
      const restaurants = readRestaurants();
      const index = restaurants.findIndex((r) => r.id === req.params.id);

      if (index === -1) {
        return res.status(404).json({ error: true, message: `Restaurant with ID '${req.params.id}' not found.` });
      }

      // Store the relative path of the saved file on the restaurant record
      restaurants[index].image = `/${req.file.path.replace(/\\/g, '/')}`;
      restaurants[index].updatedAt = new Date().toISOString();
      writeRestaurants(restaurants);

      return res.status(200).json({
        error: false,
        message: 'Restaurant image uploaded successfully.',
        imageUrl: restaurants[index].image,
        filename: req.file.filename,
        size: `${(req.file.size / 1024).toFixed(2)} KB`,
      });
    } catch (innerErr) {
      next(innerErr);
    }
  });
});

module.exports = router;
