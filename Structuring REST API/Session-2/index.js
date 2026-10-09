const express = require("express");
const connectDB = require("./db");

// ── Import Routes ──────────────────────────────
const categoryRoutes = require("./routes/categories");
const songRoutes = require("./routes/songs");

const app = express();
const PORT = 3000;

// ── Middleware ─────────────────────────────────
app.use(express.json()); // Parse incoming JSON bodies

// ── Connect to MongoDB ─────────────────────────
connectDB();

// ── Mount Routes ───────────────────────────────
app.use("/categories", categoryRoutes); // Step 2 & 3
app.use("/songs", songRoutes);          // Step 4 & 5

// ── Root health-check ──────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "🎵 Playlist API is running!" });
});

// ── 404 Handler ────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ── Start Server ───────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
