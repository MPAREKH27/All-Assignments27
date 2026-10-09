// ─────────────────────────────────────────────────────────────
//  Task 3: Protected route /my-orders
//  Returns fake order data only when a valid JWT is present.
// ─────────────────────────────────────────────────────────────
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

// Fake order data (simulating a DB result)
const fakeOrders = [
  { orderId: "ORD-001", itemName: "Wireless Headphones",  quantity: 1, price: 2999 },
  { orderId: "ORD-002", itemName: "Mechanical Keyboard",  quantity: 2, price: 4599 },
  { orderId: "ORD-003", itemName: "USB-C Hub",            quantity: 1, price: 1499 },
  { orderId: "ORD-004", itemName: "Laptop Stand",         quantity: 1, price: 899  },
];

/**
 * GET /my-orders
 * Protected by verifyToken middleware.
 * Returns a list of orders belonging to the authenticated user.
 */
router.get("/", verifyToken, (req, res) => {
  // req.user is populated by verifyToken (contains id & email)
  res.status(200).json({
    message: `Orders for user: ${req.user.email}`,
    userId: req.user.id,
    orders: fakeOrders,
  });
});

module.exports = router;
