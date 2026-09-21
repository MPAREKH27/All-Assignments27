const http = require('http');

const PORT = 3000;

// Create HTTP Server incorporating all 4 requirements:
// 1. Uses http module and listens on port 3000.
// 2. Routing for '/about' ('About Us Page') and '/' ('Home Page').
// 3. Responds to POST requests with 'POST request received'.
// 4. Responds to GET '/products' with product list ('iPhone 14, Nike Shoes, Boat Headphones'), and unknown routes with 'Page Not Found'.

const server = http.createServer((req, res) => {
    // Set response header to plain text
    res.setHeader('Content-Type', 'text/plain');

    // Requirement 3: Check if the request method is POST
    if (req.method === 'POST') {
        res.statusCode = 200;
        res.end('POST request received');
        return;
    }

    // Requirements 2 & 4: Handle URL routing for GET requests
    if (req.url === '/' || req.url === '/home') {
        res.statusCode = 200;
        res.end('Home Page');
    } else if (req.url === '/about') {
        res.statusCode = 200;
        res.end('About Us Page');
    } else if (req.url === '/products') {
        res.statusCode = 200;
        res.end('iPhone 14, Nike Shoes, Boat Headphones');
    } else {
        res.statusCode = 404;
        res.end('Page Not Found');
    }
});

// Requirement 1: Start server listening on port 3000
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
