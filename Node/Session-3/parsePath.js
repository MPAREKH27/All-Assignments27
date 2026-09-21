const path = require('path');

// Given sample file path
const samplePath = '/user/music/playlist.txt';

// Extracting path details using path module methods
const dirName = path.dirname(samplePath);
const baseName = path.basename(samplePath);
const extName = path.extname(samplePath);

// Output details to console
console.log('File Path Analysis:');
console.log('-------------------');
console.log(`Directory Name : ${dirName}`);
console.log(`Base Name      : ${baseName}`);
console.log(`File Extension : ${extName}`);
