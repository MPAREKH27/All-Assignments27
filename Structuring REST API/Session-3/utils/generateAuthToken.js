// ─────────────────────────────────────────────────────────────
//  Task 1: generateAuthToken(user)
//  Creates a JWT containing the user's id and email,
//  signed with the secret key from the .env file.
// ─────────────────────────────────────────────────────────────
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Generates a signed JWT for the given user.
 * @param {{ id: number|string, email: string }} user - The user object.
 * @returns {string} Signed JWT token.
 */
function generateAuthToken(user) {
  // Payload: only include non-sensitive fields
  const payload = {
    id: user.id,
    email: user.email,
  };

  // Sign with secret key; token expires per .env setting (default 1 hour)
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });

  return token;
}

module.exports = generateAuthToken;
