/**
 * removeTask.js
 * Usage: node removeTask.js <task number>
 *
 * Removes the task at the given 1-based number from todo.txt,
 * then displays the updated list.
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
 * If the array is empty, the file is cleared (zero bytes).
 * @param {string[]} tasks
 */
function writeTasks(tasks) {
  fs.writeFileSync(
    TODO_FILE,
    tasks.length > 0 ? tasks.join("\n") + "\n" : "",
    "utf8"
  );
}

/**
 * Print all tasks as a numbered list.
 * @param {string[]} tasks
 */
function printTasks(tasks) {
  if (tasks.length === 0) {
    console.log("📭  Your to-do list is now empty!");
    return;
  }

  console.log("\n📋  ─────────────────────────────");
  console.log("     UPDATED TO-DO LIST");
  console.log("     ─────────────────────────────");

  tasks.forEach((task, index) => {
    const num = String(index + 1).padStart(2, " ");
    console.log(`  ${num}. ${task}`);
  });

  console.log("     ─────────────────────────────");
  console.log(`     Total: ${tasks.length} task${tasks.length !== 1 ? "s" : ""}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("❌  Usage: node removeTask.js <task number>");
  console.error("   Example: node removeTask.js 2");
  process.exit(1);
}

const taskNum = Number(args[0]);

// Validate: must be a positive integer
if (!Number.isInteger(taskNum) || taskNum < 1) {
  console.error(`❌  Invalid task number: "${args[0]}"`);
  console.error("   Please provide a positive whole number (e.g., 1, 2, 3).");
  process.exit(1);
}

const tasks = readTasks();

if (tasks.length === 0) {
  console.error("❌  todo.txt is empty — there are no tasks to remove.");
  process.exit(1);
}

if (taskNum > tasks.length) {
  console.error(
    `❌  Task #${taskNum} does not exist. You only have ${tasks.length} task${
      tasks.length !== 1 ? "s" : ""
    }.`
  );
  process.exit(1);
}

// Remove the task (convert 1-based number to 0-based index)
const removedTask = tasks.splice(taskNum - 1, 1)[0];
writeTasks(tasks);

console.log(`🗑️   Removed task #${taskNum}: "${removedTask}"`);
printTasks(tasks);
