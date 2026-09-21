// Task 2: helloV8.js
// Demonstrates how Chrome V8 engine executes JavaScript in Node.js

function addNumbers(a, b) {
  return a + b;
}

const result = addNumbers(5, 7);

console.log("=== Chrome V8 Engine Demo ===");
console.log(`The result of 5 + 7 = ${result}`);
console.log("V8 compiled and executed this JavaScript function natively!");
