/**
 * listTasks.js
 * Usage: node listTasks.js
 *
 * Reads all tasks from todo.txt and displays them as a numbered list.
 */

const fs = require("fs");
const path = require("path");

// ─── Config ───────────────────────────────────────────────────────────────────
const TODO_FILE = path.join(__dirname, "todo.txt");

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Read all tasks from todo.txt.
 * Returns an empty array if the file does not exist yet.
 * @returns {string[]}
 */
function readTasks() {
  if (!fs.existsSync(TODO_FILE)) return [];

  const content = fs.readFileSync(TODO_FILE, "utf8").trim();
  return content ? content.split("\n").map((t) => t.trim()) : [];
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const tasks = readTasks();

if (tasks.length === 0) {
  console.log("📭  Your to-do list is empty!");
  console.log('   Add a task with: node addTask.js "Your task here"');
  process.exit(0);
}

console.log("📋  ─────────────────────────────");
console.log("     YOUR TO-DO LIST");
console.log("     ─────────────────────────────");

tasks.forEach((task, index) => {
  const num = String(index + 1).padStart(2, " ");
  console.log(`  ${num}. ${task}`);
});

console.log("     ─────────────────────────────");
console.log(`     Total: ${tasks.length} task${tasks.length !== 1 ? "s" : ""}`);
