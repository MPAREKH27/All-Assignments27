// ============================================================
//  Session 6 - Environment Variables & Input Security
//  Node.js Assignment
// ============================================================

// ─────────────────────────────────────────────────────────────
//  TASK 5 IMPROVEMENT (implemented at top-level):
//  Use a centralized config module pattern instead of accessing
//  process.env directly everywhere in the app.
//  This ensures:
//    - All env vars are validated once at startup.
//    - Missing required vars cause an immediate crash with a
//      clear error (fail-fast principle).
//    - No magic strings scattered across files.
// ─────────────────────────────────────────────────────────────

"use strict";

// Load dotenv FIRST before anything else
require("dotenv").config();

// Centralized config / env-variable validator (Task 5)
function loadConfig() {
  const required = [
    "SECRET_API_KEY",
    "DB_PASSWORD",
    "SPOTIFY_API_TOKEN",
    "PORT",
  ];

  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error(
      `\nMissing required environment variables: ${missing.join(", ")}`
    );
    console.error("    Please check your .env file and try again.\n");
    process.exit(1); // Fail fast -- do NOT continue with broken config
  }

  // Return a frozen object so values cannot be mutated at runtime
  return Object.freeze({
    secretApiKey: process.env.SECRET_API_KEY,
    dbPassword:   process.env.DB_PASSWORD,
    spotifyToken: process.env.SPOTIFY_API_TOKEN,
    port:         parseInt(process.env.PORT, 10) || 3000,
    nodeEnv:      process.env.NODE_ENV || "development",
  });
}

const config = loadConfig();

// Express setup
const express = require("express");
const { body, validationResult } = require("express-validator");
const app = express();
app.use(express.json());

// ============================================================
//  TASK 1 - Load & Print .env Values Securely
// ============================================================
console.log("\n========================================");
console.log("  TASK 1 - .env Values Loaded Securely  ");
console.log("========================================");

// Good practice: mask sensitive values when logging
function maskSecret(value) {
  if (!value || value.length <= 6) return "***";
  return value.slice(0, 3) + "*".repeat(value.length - 6) + value.slice(-3);
}

console.log(`  SECRET_API_KEY  : ${maskSecret(config.secretApiKey)}`);
console.log(`  DB_PASSWORD     : ${maskSecret(config.dbPassword)}`);
console.log(`  SPOTIFY_TOKEN   : ${maskSecret(config.spotifyToken)}`);
console.log(`  PORT            : ${config.port}`);
console.log(`  NODE_ENV        : ${config.nodeEnv}\n`);

// ============================================================
//  TASK 2 - Signup Endpoint with Input Validation
// ============================================================

/**
 * POST /signup
 *
 * Body: { username: string, email: string }
 *
 * Validation rules:
 *  - username  -> minimum 4 characters, letters/numbers/underscores only
 *  - email     -> must contain '@' and '.'  (custom + express-validator)
 */
const signupValidation = [
  // express-validator rules
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long.")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .custom((value) => {
      // Custom validation: must contain '@' and '.'
      if (!value.includes("@") || !value.includes(".")) {
        throw new Error("Email must contain '@' and '.'");
      }
      return true;
    })
    .isEmail()
    .withMessage("Email must be a valid email address."),
];

app.post("/signup", signupValidation, (req, res) => {
  // Collect validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }

  const { username, email } = req.body;

  // In a real app you would hash a password & save to DB here.
  // For this exercise we simply confirm receipt.
  console.log(`  [Signup] New user registered -> ${username} <${email}>`);

  return res.status(201).json({
    success: true,
    message: `Welcome, ${username}! Your account has been created.`,
    data: { username, email },
  });
});

// ============================================================
//  TASK 3 - Zomato-Style Promo Code Validator
// ============================================================

/**
 * Allowed promo codes (in a real app these come from a DB).
 */
const ALLOWED_PROMO_CODES = ["ZOMATO50", "WELCOME100", "FOODIE20", "SAVE30"];

/**
 * validatePromoCode(code)
 *
 * Rules:
 *  1. Code must not be empty.
 *  2. Code must not contain spaces.
 *  3. Code must not contain special characters (only A-Z, 0-9 allowed).
 *  4. Code must exist in the allowed list.
 *
 * @param {string} code  - promo code entered by the user
 * @returns {{ valid: boolean, message: string }}
 */
function validatePromoCode(code) {
  if (!code || code.trim() === "") {
    return { valid: false, message: "ERROR: Promo code cannot be empty." };
  }

  if (/\s/.test(code)) {
    return { valid: false, message: "ERROR: Promo code must not contain spaces." };
  }

  if (/[^A-Za-z0-9]/.test(code)) {
    return {
      valid: false,
      message: "ERROR: Promo code must not contain special characters.",
    };
  }

  const normalised = code.toUpperCase();
  if (!ALLOWED_PROMO_CODES.includes(normalised)) {
    return { valid: false, message: `ERROR: Promo code '${code}' is not valid.` };
  }

  return {
    valid: true,
    message: `SUCCESS: Promo code '${normalised}' applied! Enjoy your discount.`,
  };
}

// POST /promo  ->  body: { code: string }
app.post("/promo", (req, res) => {
  const { code } = req.body;
  const result = validatePromoCode(code);

  console.log(`  [Promo] Code '${code}' -> ${result.message}`);

  return res.status(result.valid ? 200 : 400).json(result);
});

// Demo run of validatePromoCode in the console
console.log("========================================");
console.log("  TASK 3 - Promo Code Validator Demo    ");
console.log("========================================");

const promoCodesToTest = [
  "ZOMATO50",   // valid
  "WELCOME100", // valid
  "SAVE 30",    // spaces - invalid
  "HACK@R!",    // special chars - invalid
  "EXPIRED99",  // not in list - invalid
  "",           // empty - invalid
];

promoCodesToTest.forEach((code) => {
  console.log(`  Input: "${code}"  ->  ${validatePromoCode(code).message}`);
});
console.log();

// ============================================================
//  TASK 4 - Spotify API Token from .env (Dummy Call)
// ============================================================

/**
 * makeSpotifyRequest(endpoint)
 *
 * Reads the Spotify token from the centralised config object
 * (which loaded it from .env).  The token is NEVER hard-coded
 * in source files.
 *
 * @param {string} endpoint - the Spotify API path to "call"
 */
function makeSpotifyRequest(endpoint) {
  const token = config.spotifyToken; // Sourced from .env -> config

  // Validate token presence before use
  if (!token) {
    throw new Error(
      "SPOTIFY_API_TOKEN is not set. Cannot make Spotify requests."
    );
  }

  console.log("  ─────────────────────────────────────────");
  console.log(`  [Spotify] Calling endpoint : ${endpoint}`);
  console.log(`  [Spotify] Using token      : ${maskSecret(token)}`);
  console.log(`  [Spotify] Authorization    : Bearer ${maskSecret(token)}`);
  console.log("  [Spotify] Response (dummy) : { status: 200, data: [...] }");
  console.log("  ─────────────────────────────────────────\n");

  // In a real app you would use axios / node-fetch here:
  // const response = await axios.get(`https://api.spotify.com/v1/${endpoint}`, {
  //   headers: { Authorization: `Bearer ${token}` }
  // });
  return { status: 200, message: "Dummy Spotify response received." };
}

// GET /spotify/top-tracks  ->  simulates using the token
app.get("/spotify/top-tracks", (req, res) => {
  const result = makeSpotifyRequest("me/top/tracks");
  return res.json({ success: true, ...result });
});

// Demo run in console
console.log("========================================");
console.log("  TASK 4 - Spotify Token Demo           ");
console.log("========================================");
makeSpotifyRequest("me/top/tracks");

// ============================================================
//  TASK 5 - Security Improvement Description
// ============================================================
console.log("========================================");
console.log("  TASK 5 - Security Improvement Applied ");
console.log("========================================");
console.log(`
  Improvement: Centralised & Validated Config Module
  ────────────────────────────────────────────────────
  Suggestion from ChatGPT / GitHub Copilot:
  "Instead of reading process.env.VAR directly throughout
   your app, create a single config object that validates
   all required variables at startup and exposes a frozen
   snapshot of them."

  What we changed:
  [1] Added loadConfig() which iterates over a required[]
      list and calls process.exit(1) if any are missing.
  [2] Config is Object.freeze()'d -- values cannot be mutated
      accidentally after load.
  [3] All code reads from 'config.*' instead of
      process.env.* -> one place to change, easy to audit.
  [4] Sensitive values are masked before being logged
      (maskSecret helper) so secrets never appear in
      plain-text log files.
  [5] .env is listed in .gitignore to prevent accidental
      commits to version control.
`);

// ============================================================
//  Start Server
// ============================================================
app.listen(config.port, () => {
  console.log(`\nServer running at http://localhost:${config.port}`);
  console.log("    Available endpoints:");
  console.log("      POST  /signup             - Task 2: User signup");
  console.log("      POST  /promo              - Task 3: Promo code check");
  console.log("      GET   /spotify/top-tracks - Task 4: Spotify dummy call\n");
});
