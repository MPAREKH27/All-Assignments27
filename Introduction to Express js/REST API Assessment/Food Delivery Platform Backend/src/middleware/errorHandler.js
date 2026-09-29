// src/middleware/errorHandler.js
// Centralised error-handling middleware (four-argument Express signature)

/**
 * Catches all errors passed via next(err) from any route or middleware.
 * Logs the error message to the console.
 * Returns a structured JSON response WITHOUT exposing the stack trace to clients.
 *
 * @param {Error}  err  - The error object (can include a statusCode property)
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {function} next - Express next function (required for Express to recognise this as error middleware)
 */
const errorHandler = (err, req, res, next) => {
  // Log error details on the server side for debugging
  console.error(`[ERROR] ${new Date().toISOString()} — ${err.message}`);

  // Determine HTTP status code: use the error's own statusCode if set, else 500
  const statusCode = err.statusCode || 500;

  // Send a clean, structured JSON response to the client (no stack trace)
  res.status(statusCode).json({
    error: true,
    message: err.message || 'An unexpected internal server error occurred.',
  });
};

module.exports = errorHandler;
