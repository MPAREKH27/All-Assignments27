const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;

// Enable JSON body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =============================================================================
// Task 5: Middleware to log every request's method and URL to the console
// =============================================================================
const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl || req.url}`);
  next();
};

// Mount the logger middleware
app.use(loggerMiddleware);

// =============================================================================
// Task 1: Sample Products Data (3 sample products with id, name, and price)
// =============================================================================
const products = [
  { id: 1, name: "Wireless Bluetooth Headphones", price: 1999 },
  { id: 2, name: "Smart Fitness Watch", price: 2499 },
  { id: 3, name: "Mechanical Gaming Keyboard", price: 3499 }
];

// Shopping Cart Array
let cart = [];

// =============================================================================
// Task 2: addToCart(productId, quantity) Function
// Adds a product to user's cart array or updates quantity if already exists.
// =============================================================================
function addToCart(productId, quantity = 1) {
  const numProductId = Number(productId);
  const numQty = parseInt(quantity, 10);

  // Validate product exists
  const product = products.find((p) => p.id === numProductId);
  if (!product) {
    return {
      success: false,
      message: `Product with ID ${productId} not found.`
    };
  }

  // Validate quantity
  if (isNaN(numQty) || numQty <= 0) {
    return {
      success: false,
      message: "Quantity must be a positive integer."
    };
  }

  // Check if product is already in the cart
  const existingItemIndex = cart.findIndex((item) => item.productId === numProductId);

  if (existingItemIndex > -1) {
    // Product already in cart: update its quantity
    cart[existingItemIndex].quantity += numQty;
  } else {
    // New product: push to cart array
    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: numQty
    });
  }

  return {
    success: true,
    message: `Added ${numQty} of "${product.name}" to cart.`,
    cart
  };
}

// Function to clear cart (helpful for testing)
function clearCart() {
  cart = [];
  return cart;
}

// =============================================================================
// Routes
// =============================================================================

// Root route
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Shop Backend API",
    endpoints: {
      "GET /products": "Get list of all 3 sample products",
      "GET /products/search?q=query": "Search products by name (case-insensitive)",
      "POST /cart/add": "Add product to cart (body: { productId, quantity })",
      "GET /cart": "Get current cart contents",
      "GET /cart/total": "Get final bill with 5% delivery charge (Zomato-style)",
      "POST /cart/clear": "Clear the shopping cart"
    }
  });
});

// Task 1 Route: GET /products
// Returns a JSON array of 3 sample products (each with id, name, and price)
app.get('/products', (req, res) => {
  res.json(products);
});

// Task 4 Route: GET /products/search
// Filters products by name (case-insensitive) as user types (Flipkart-style)
app.get('/products/search', (req, res) => {
  const query = (req.query.q || req.query.name || '').trim().toLowerCase();

  if (!query) {
    // If no search query provided, return all products
    return res.json({
      searchTerm: "",
      totalMatches: products.length,
      products: products
    });
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  res.json({
    searchTerm: query,
    totalMatches: filteredProducts.length,
    products: filteredProducts
  });
});

// Route: GET /cart (View Cart)
app.get('/cart', (req, res) => {
  res.json({
    totalItems: cart.reduce((acc, item) => acc + item.quantity, 0),
    items: cart
  });
});

// Route: POST /cart/add (HTTP endpoint utilizing Task 2's addToCart function)
app.post('/cart/add', (req, res) => {
  const { productId, quantity } = req.body;

  if (productId === undefined) {
    return res.status(400).json({ error: "productId is required." });
  }

  const result = addToCart(productId, quantity || 1);

  if (!result.success) {
    return res.status(400).json({ error: result.message });
  }

  res.status(200).json(result);
});

// Route: POST /cart/clear (helper to reset cart)
app.post('/cart/clear', (req, res) => {
  clearCart();
  res.json({ message: "Cart cleared successfully.", cart: [] });
});

// Task 3 Route: GET /cart/total
// Calculates and returns total price of all items in cart + 5% delivery charge (Zomato-style bill)
app.get('/cart/total', (req, res) => {
  const itemTotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // 5% Delivery Charge
  const deliveryCharge = Number((itemTotal * 0.05).toFixed(2));
  const grandTotal = Number((itemTotal + deliveryCharge).toFixed(2));

  res.json({
    cartItems: cart,
    billBreakdown: {
      itemTotal: itemTotal,
      deliveryChargeRate: "5%",
      deliveryCharge: deliveryCharge,
      grandTotal: grandTotal
    },
    formattedBill: {
      "Item Total": `₹${itemTotal.toFixed(2)}`,
      "Delivery Partner Fee (5%)": `₹${deliveryCharge.toFixed(2)}`,
      "To Pay": `₹${grandTotal.toFixed(2)}`
    }
  });
});

// Export app and functions for testing or modular usage
module.exports = {
  app,
  products,
  cart,
  addToCart,
  clearCart
};

// Start server only when run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Shop Backend Server running on http://localhost:${PORT}`);
  });
}

