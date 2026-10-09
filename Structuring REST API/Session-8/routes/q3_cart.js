// ============================================================
//  routes/q3_cart.js
//  Q3 – Flipkart-Style Cart : DELETE product by productId
// ============================================================
const express  = require("express");
const router   = express.Router();
const db       = require("../data/db");

/**
 * DELETE /cart/:productId
 *
 * Removes a product from the shopping cart.
 * - 200 : Product removed successfully → success message + removed item
 * - 404 : Product not found in cart    → error message
 */
router.delete("/:productId", (req, res) => {
  const productId = parseInt(req.params.productId);   // Parse ID from URL

  // ── Find the product in the cart ────────────────────────
  const index = db.cart.findIndex(item => item.productId === productId);

  // ── 404: Product not found ───────────────────────────────
  if (index === -1) {
    return res.status(404).json({
      success : false,
      message : `Product with ID ${productId} was not found in the cart.`,
    });
  }

  // ── 200: Remove and return confirmation ─────────────────
  const [removedProduct] = db.cart.splice(index, 1);

  return res.status(200).json({
    success         : true,
    message         : `"${removedProduct.name}" has been removed from your cart.`,
    removedProduct,
    remainingItems  : db.cart.length,           // Helpful metadata for frontend
  });
});

module.exports = router;
