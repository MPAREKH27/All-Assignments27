// greet.js
// Usage: node greet.js <your name>
// Example: node greet.js John

const args = process.argv;

// process.argv[0] = 'node'
// process.argv[1] = path to script
// process.argv[2] = first user argument (name)

const name = args[2];

if (!name) {
    console.log("Please provide your name!");
    console.log("Usage: node greet.js <your name>");
    process.exit(1);
}

console.log(`Hello, ${name}!`);
