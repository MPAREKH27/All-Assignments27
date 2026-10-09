// ─────────────────────────────────────────────────────────────
//  Task 2 & 4: verifyToken middleware
//
//  - Reads the JWT from the "Authorization: Bearer <token>" header
//  - Verifies the token signature using the secret key
//  - Attaches decoded user info to req.user
//  - Returns 401 if the token is missing, invalid, OR expired
//
//  Task 4 improvement: distinguishes between TokenExpiredError
//  and other JsonWebTokenErrors for a custom expiry message.
//
//  Task 5 (AI-suggested improvements implemented):
//  - Extracted "Bearer " prefix stripping to a helper for clarity
//  - Added explicit check for empty token string after stripping
//  - Used named error constants for consistent messages
// ─────────────────────────────────────────────────────────────
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ── Centralised error messages (AI suggestion: avoid magic strings) ──
const ERROR_MESSAGES = {
  MISSING_TOKEN: "Access denied. No token provided.",
  EXPIRED_TOKEN: "Session expired, please login again.", // Task 4
  INVALID_TOKEN: "Invalid token. Authentication failed.",
};

/**
 * Extracts the raw JWT string from the Authorization header.
 * Expected format: "Bearer <token>"
 * @param {string|undefined} authHeader
 * @returns {string|null}
 */
// AI suggestion: move header parsing into a helper so verifyToken stays lean
function extractBearerToken(authHeader) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7).trim(); // remove "Bearer " prefix
  return token.length > 0 ? token : null;  // guard against "Bearer " with nothing after
}

/**
 * Express middleware that validates a JWT and populates req.user.
 */
function verifyToken(req, res, next) {
  try {
    // ── Step 1: extract token from header ──
    const token = extractBearerToken(req.headers["authorization"]);

    if (!token) {
      return res.status(401).json({ error: ERROR_MESSAGES.MISSING_TOKEN });
    }

    // ── Step 2: verify + decode ──
    // jwt.verify throws TokenExpiredError or JsonWebTokenError on failure
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ── Step 3: attach decoded payload to request ──
    req.user = decoded; // { id, email, iat, exp }

    next(); // pass control to the next handler
  } catch (error) {
    // ── Task 4: custom message for expired tokens ──
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: ERROR_MESSAGES.EXPIRED_TOKEN });
    }

    // All other JWT errors (malformed, wrong signature, etc.)
    return res.status(401).json({ error: ERROR_MESSAGES.INVALID_TOKEN });
  }
}

module.exports = verifyToken;
