// emailChecker.js - Validate user email input using the 'validator' npm package

const readline = require("readline"); // Built-in readline module for user input

// Dynamically require validator to handle graceful error if not installed
let validator;
try {
  validator = require("validator");
} catch (err) {
  console.error("❌ 'validator' package not found.");
  console.error("   Please run: npm install validator");
  process.exit(1);
}

// Create readline interface for reading input from terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("📧 Email Validator - Powered by 'validator' npm package");
console.log("─".repeat(50));

// Prompt user to enter an email address
rl.question("Enter your email address: ", (email) => {
  // Trim any leading/trailing whitespace
  const trimmedEmail = email.trim();

  // Validate using validator.isEmail()
  if (validator.isEmail(trimmedEmail)) {
    console.log("\n✅ Valid Email!");
    console.log(`   '${trimmedEmail}' is a properly formatted email address.`);
  } else {
    console.log("\n❌ Invalid Email!");
    console.log(`   '${trimmedEmail}' is NOT a valid email address.`);
    console.log("   Please ensure it follows the format: user@domain.com");
  }

  console.log("─".repeat(50));
  rl.close(); // Close the readline interface
});
