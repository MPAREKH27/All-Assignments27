const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'books.txt');

// Read books.txt asynchronously using fs.readFile with a callback
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading books.txt:', err);
    return;
  }

  // Split content into lines and display each book name on a new line
  const books = data.split(/\r?\n/);
  books.forEach((book) => {
    if (book.trim() !== '') {
      console.log(book.trim());
    }
  });
});
