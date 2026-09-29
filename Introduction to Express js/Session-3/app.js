const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// ─────────────────────────────────────────────────────────────
// TASK 1 — express.json() middleware
// Parses incoming JSON request bodies and makes them available
// on req.body. Logs the parsed body for POST /feedback.
// ─────────────────────────────────────────────────────────────
app.use(express.json());

// ─────────────────────────────────────────────────────────────
// TASK 4 — body-parser for URL-encoded form data
// Parses application/x-www-form-urlencoded bodies (like HTML
// form submissions) and makes them available on req.body.
// ─────────────────────────────────────────────────────────────
app.use(bodyParser.urlencoded({ extended: true }));

// ─────────────────────────────────────────────────────────────
// TASK 2 — requestTime middleware
// Adds a requestTime timestamp to every incoming request object.
// ─────────────────────────────────────────────────────────────
function requestTime(req, res, next) {
  req.requestTime = new Date().toISOString(); // attach ISO timestamp
  next();
}
app.use(requestTime);

// ─────────────────────────────────────────────────────────────
// TASK 3 & 5 — instaLogger middleware (with /health skip)
// Logs HTTP Method, URL, and response status code for every
// request — similar to how Instagram tracks API usage.
// Skips logging entirely for the /health route (Task 5).
// Uses res.on('finish', ...) so the status code is captured
// AFTER the response has been sent.
// ─────────────────────────────────────────────────────────────
function instaLogger(req, res, next) {
  // Task 5: skip logging for the /health route
  if (req.url === "/health") {
    return next();
  }

  res.on("finish", () => {
    console.log(
      `[InstaLogger] Method: ${req.method} | URL: ${req.url} | Status: ${res.statusCode}`
    );
  });

  next();
}
app.use(instaLogger); // mount globally

// ═════════════════════════════════════════════════════════════
//                          ROUTES
// ═════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// TASK 1 — POST /feedback
// Reads and logs the parsed JSON body sent by the client.
// ─────────────────────────────────────────────────────────────
app.post("/feedback", (req, res) => {
  const body = req.body;
  console.log("[Feedback Received] Parsed JSON Body:", body);
  res.status(200).json({
    message: "Feedback received successfully!",
    receivedData: body,
  });
});

// ─────────────────────────────────────────────────────────────
// TASK 2 — GET /time-check
// Sends back the requestTime timestamp that was attached by
// the requestTime middleware.
// ─────────────────────────────────────────────────────────────
app.get("/time-check", (req, res) => {
  res.status(200).json({
    message: "Request timestamp retrieved!",
    requestTime: req.requestTime,
  });
});

// ─────────────────────────────────────────────────────────────
// TASK 3 — Two test routes to demonstrate instaLogger
// ─────────────────────────────────────────────────────────────
app.get("/home", (req, res) => {
  res.status(200).json({ message: "Welcome to the Home route!" });
});

app.get("/profile", (req, res) => {
  res.status(200).json({ message: "Welcome to the Profile route!" });
});

// ─────────────────────────────────────────────────────────────
// TASK 4 — POST /playlist
// Accepts URL-encoded form data (song & artist) parsed by
// body-parser and responds with a confirmation message.
// ─────────────────────────────────────────────────────────────
app.post("/playlist", (req, res) => {
  const { song, artist } = req.body;

  if (!song || !artist) {
    return res.status(400).json({
      error: "Please provide both 'song' and 'artist' fields.",
    });
  }

  res.status(200).json({
    message: `"${song}" by ${artist} has been added to your playlist!`,
    song,
    artist,
  });
});

// ─────────────────────────────────────────────────────────────
// TASK 5 — GET /health
// Health-check endpoint. instaLogger skips logging for this
// route entirely.
// ─────────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", uptime: process.uptime() });
});

// ─────────────────────────────────────────────────────────────
// Start the server
// ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("─────────────────────────────────────────────────────");
  console.log("Available routes:");
  console.log("  POST /feedback     -> Task 1 (JSON body parsing)");
  console.log("  GET  /time-check   -> Task 2 (requestTime middleware)");
  console.log("  GET  /home         -> Task 3 (instaLogger demo)");
  console.log("  GET  /profile      -> Task 3 (instaLogger demo)");
  console.log("  POST /playlist     -> Task 4 (URL-encoded form data)");
  console.log("  GET  /health       -> Task 5 (logger skip demo)");
  console.log("─────────────────────────────────────────────────────");
});
