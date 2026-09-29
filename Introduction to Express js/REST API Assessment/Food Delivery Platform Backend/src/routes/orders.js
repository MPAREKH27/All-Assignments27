// src/routes/orders.js
// Order CRUD routes for /api/orders
// All routes are protected by JWT authenticate middleware (applied in server.js)

const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Path to the orders JSON data file
const ORDERS_FILE = path.join(__dirname, '../data/orders.json');
const RESTAURANTS_FILE = path.join(__dirname, '../data/restaurants.json');

// ── Helper: Read/Write JSON files ─────────────────────────────────────────────
const readJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const writeJSON = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// Valid order statuses
const ORDER_STATUSES = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];

// ── GET /api/orders — Get all orders for the logged-in user ───────────────────
router.get('/', (req, res, next) => {
  try {
    const orders = readJSON(ORDERS_FILE);
    // Each user only sees their own orders
    const userOrders = orders.filter((o) => o.userId === req.user.id);

    return res.status(200).json({
      error: false,
      count: userOrders.length,
      orders: userOrders,
    });
  } catch (err) {
    next(err);
  }
});

// ── GET /api/orders/:id — Get a single order by ID ───────────────────────────
router.get('/:id', (req, res, next) => {
  try {
    const orders = readJSON(ORDERS_FILE);
    const order = orders.find((o) => o.id === req.params.id && o.userId === req.user.id);

    if (!order) {
      return res.status(404).json({ error: true, message: `Order with ID '${req.params.id}' not found.` });
    }

    return res.status(200).json({ error: false, order });
  } catch (err) {
    next(err);
  }
});

// ── POST /api/orders — Place a new order ─────────────────────────────────────
/**
 * Body: {
 *   restaurantId: string,
 *   items: [{ menuItemId: string, quantity: number }],
 *   deliveryAddress: string
 * }
 */
router.post('/', (req, res, next) => {
  try {
    const { restaurantId, items, deliveryAddress } = req.body;

    // ── Validation ─────────────────────────────────────────────────────────
    const errors = {};

    if (!restaurantId || typeof restaurantId !== 'string' || restaurantId.trim() === '') {
      errors.restaurantId = 'Restaurant ID is required.';
    }

    if (!Array.isArray(items) || items.length === 0) {
      errors.items = 'At least one item is required to place an order.';
    } else {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!item.menuItemId || typeof item.menuItemId !== 'string') {
          errors[`items[${i}].menuItemId`] = 'Each item must have a valid menuItemId.';
        }
        if (!item.quantity || !Number.isInteger(item.quantity) || item.quantity < 1) {
          errors[`items[${i}].quantity`] = 'Each item must have a quantity of at least 1.';
        }
      }
    }

    if (!deliveryAddress || typeof deliveryAddress !== 'string' || deliveryAddress.trim() === '') {
      errors.deliveryAddress = 'Delivery address is required.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ error: true, message: 'Order validation failed.', fields: errors });
    }

    // ── Verify Restaurant Exists ───────────────────────────────────────────
    const restaurants = readJSON(RESTAURANTS_FILE);
    const restaurant = restaurants.find((r) => r.id === restaurantId.trim());

    if (!restaurant) {
      return res.status(404).json({ error: true, message: `Restaurant with ID '${restaurantId}' not found.` });
    }

    // ── Verify Each Menu Item & Calculate Total ────────────────────────────
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = restaurant.menu.find((m) => m.id === item.menuItemId);
      if (!menuItem) {
        return res.status(404).json({
          error: true,
          message: `Menu item with ID '${item.menuItemId}' not found in restaurant '${restaurant.name}'.`,
        });
      }
      const lineTotal = menuItem.price * item.quantity;
      totalAmount += lineTotal;
      orderItems.push({
        menuItemId: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
        lineTotal,
      });
    }

    const newOrder = {
      id: uuidv4(),
      userId: req.user.id,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      items: orderItems,
      deliveryAddress: deliveryAddress.trim(),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      status: 'pending',
      placedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const orders = readJSON(ORDERS_FILE);
    orders.push(newOrder);
    writeJSON(ORDERS_FILE, orders);

    return res.status(201).json({
      error: false,
      message: 'Order placed successfully.',
      order: newOrder,
    });
  } catch (err) {
    next(err);
  }
});

// ── PATCH /api/orders/:id — Update order status ───────────────────────────────
router.patch('/:id', (req, res, next) => {
  try {
    const orders = readJSON(ORDERS_FILE);
    const index = orders.findIndex((o) => o.id === req.params.id && o.userId === req.user.id);

    if (index === -1) {
      return res.status(404).json({ error: true, message: `Order with ID '${req.params.id}' not found.` });
    }

    const { status } = req.body;

    if (!status || !ORDER_STATUSES.includes(status)) {
      return res.status(400).json({
        error: true,
        message: `Invalid status. Allowed values are: ${ORDER_STATUSES.join(', ')}.`,
      });
    }

    orders[index].status = status;
    orders[index].updatedAt = new Date().toISOString();
    writeJSON(ORDERS_FILE, orders);

    return res.status(200).json({
      error: false,
      message: 'Order status updated successfully.',
      order: orders[index],
    });
  } catch (err) {
    next(err);
  }
});

// ── DELETE /api/orders/:id — Cancel/delete an order ──────────────────────────
router.delete('/:id', (req, res, next) => {
  try {
    const orders = readJSON(ORDERS_FILE);
    const index = orders.findIndex((o) => o.id === req.params.id && o.userId === req.user.id);

    if (index === -1) {
      return res.status(404).json({ error: true, message: `Order with ID '${req.params.id}' not found.` });
    }

    const [deleted] = orders.splice(index, 1);
    writeJSON(ORDERS_FILE, orders);

    return res.status(200).json({
      error: false,
      message: 'Order deleted successfully.',
      order: deleted,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
