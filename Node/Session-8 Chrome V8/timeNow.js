// Task 3: timeNow.js
// Uses Node's built-in 'os' and 'path' core modules

const os = require('os');
const path = require('path');

console.log("=== System Info using Node Core Modules ===");
console.log(`Operating System Platform : ${os.platform()}`);
console.log(`OS Architecture           : ${os.arch()}`);
console.log(`OS Hostname               : ${os.hostname()}`);
console.log(`Current File Directory    : ${__dirname}`);
console.log(`Current File Full Path    : ${path.resolve(__filename)}`);
console.log(`File Extension            : ${path.extname(__filename)}`);
console.log(`File Name                 : ${path.basename(__filename)}`);
