// Task 5: colorLogger.js
// Uses chalk npm module to print colored text in the terminal
// Note: Using chalk@4 which supports require() (CommonJS)

const chalk = require('chalk');

console.log(chalk.green('Welcome to Node.js!'));
console.log(chalk.blue('Node.js is powered by the Chrome V8 Engine'));
console.log(chalk.yellow('📦 chalk module makes terminal output colorful!'));
console.log(chalk.red.bold('❌ Errors will appear in red'));
console.log(chalk.cyan.underline('🌐 Visit https://nodejs.org for more info'));
console.log(chalk.magenta.bold('✨ Happy Coding with Node.js! ✨'));
