// ─────────────────────────────────────────────────────────────
//  Main application entry point
//  Includes:
//    POST /login  - demo login that returns a JWT
//    GET  /my-orders  - protected route (Tasks 3 & 4)
// ─────────────────────────────────────────────────────────────
require("dotenv").config();
const express = require("express");
const generateAuthToken = require("./utils/generateAuthToken");
const ordersRouter = require("./routes/orders");

const app = express();
app.use(express.json()); // parse JSON request bodies

// ── Demo: POST /login ──────────────────────────────────────────
// In a real app you would validate credentials against a database.
// Here we accept any request and return a token for a mock user.
app.post("/login", (req, res) => {
  // Mock user (would normally come from DB after password check)
  const user = { id: 101, email: req.body.email || "demo@example.com" };

  const token = generateAuthToken(user); // Task 1

  res.status(200).json({
    message: "Login successful",
    token,
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
});

// ── Protected routes ───────────────────────────────────────────
// Task 3: /my-orders is protected by verifyToken (inside the router)
app.use("/my-orders", ordersRouter);

// ── 404 fallback ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ── Start server ───────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅  Server running at http://localhost:${PORT}`);
  console.log(`   POST /login       → Get a JWT token`);
  console.log(`   GET  /my-orders   → Protected route (send token in Authorization header)`);
});
