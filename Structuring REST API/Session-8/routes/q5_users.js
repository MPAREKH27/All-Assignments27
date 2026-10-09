// ============================================================
//  routes/q5_users.js
//  Q5 – Zomato-Style App : DELETE a user by ID
//
//  AI-Boilerplate Origin (ChatGPT / GitHub Copilot):
//  ---------------------------------------------------
//  The following is the raw AI-generated boilerplate code:
//
//    router.delete("/:id", (req, res) => {
//      const id    = req.params.id;
//      const index = users.findIndex(u => u.id === id);
//      if (index === -1) return res.status(404).send("Not found");
//      users.splice(index, 1);
//      res.send("Deleted");
//    });
//
//  CUSTOMISATIONS MADE (what we changed and why):
//  ------------------------------------------------
//  1. parseInt(req.params.id)       → AI used raw string; IDs in our DB are
//                                     numbers, so a string comparison always
//                                     fails. We parse to integer first.
//  2. Structured JSON responses     → AI sent plain strings ("Deleted").
//                                     We return { success, message, deleted }
//                                     so frontend code can parse the result.
//  3. Meaningful HTTP status codes  → 404 for not found, 200 for success.
//  4. Added console.log audit trail → useful for Zomato admin logs.
//  5. Added user info in response   → confirms which user was removed.
// ============================================================

const express  = require("express");
const router   = express.Router();
const db       = require("../data/db");

/**
 * DELETE /users/:id
 *
 * Deletes a Zomato user from the database by their ID.
 * - 200 : User deleted successfully → success message + deleted user info
 * - 404 : User not found            → error message
 */
router.delete("/:id", (req, res) => {
  // ── CUSTOMISATION 1: Parse string param to integer ──────
  const id    = parseInt(req.params.id);
  const index = db.users.findIndex(u => u.id === id);

  // ── CUSTOMISATION 2 & 3: Structured 404 response ────────
  if (index === -1) {
    return res.status(404).json({
      success : false,
      message : `User with ID ${id} not found in the Zomato database.`,
    });
  }

  // ── CUSTOMISATION 4: Admin audit log ────────────────────
  console.log(`[ZOMATO AUDIT] Deleting user ID=${id} at ${new Date().toISOString()}`);

  // ── Delete the user ──────────────────────────────────────
  const [deletedUser] = db.users.splice(index, 1);

  // ── CUSTOMISATION 2 & 5: Return rich JSON response ──────
  return res.status(200).json({
    success     : true,
    message     : `User "${deletedUser.name}" has been permanently removed from Zomato.`,
    deletedUser,                          // Confirmation of who was deleted
    remainingUsers : db.users.length,    // How many users are left in DB
  });
});

module.exports = router;
