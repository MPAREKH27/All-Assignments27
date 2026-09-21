/**
 * addTask.js
 * Usage: node addTask.js <task description>
 *
 * Adds a new task to todo.txt.
 * Prevents adding duplicate tasks (case-insensitive).
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

/**
 * Write the given task array back to todo.txt.
 * @param {string[]} tasks
 */
function writeTasks(tasks) {
  fs.writeFileSync(TODO_FILE, tasks.join("\n") + "\n", "utf8");
}

// ─── Main ─────────────────────────────────────────────────────────────────────

// process.argv: [ 'node', 'addTask.js', ...args ]
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("❌  Usage: node addTask.js <task description>");
  console.error('   Example: node addTask.js "Buy groceries"');
  process.exit(1);
}

const newTask = args.join(" ").trim();

if (!newTask) {
  console.error("❌  Task description cannot be empty.");
  process.exit(1);
}

const tasks = readTasks();

// ── Duplicate check (case-insensitive) ────────────────────────────────────────
const isDuplicate = tasks.some(
  (t) => t.toLowerCase() === newTask.toLowerCase()
);

if (isDuplicate) {
  console.warn(`⚠️  Task already exists: "${newTask}"`);
  console.warn("   Duplicate tasks are not allowed (case-insensitive).");
  process.exit(0);
}

// ── Append and save ───────────────────────────────────────────────────────────
tasks.push(newTask);
writeTasks(tasks);

console.log(`✅  Task added (#${tasks.length}): "${newTask}"`);
console.log(`📄  Saved to: ${TODO_FILE}`);
