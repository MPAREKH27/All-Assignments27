// task3_server.js - Backend server running on port 5000 WITHOUT CORS enabled
// Used to demonstrate CORS errors when accessed from another origin (e.g., http://localhost:3000)

const http = require('http');

const PORT = 5000;

const server = http.createServer((req, res) => {
    console.log(`[Port 5000 Server] Received ${req.method} request for: ${req.url}`);

    // NOTE: We intentionally DO NOT set any 'Access-Control-Allow-Origin' headers here!
    // This will trigger a CORS error in the browser when requested from a different port (origin).

    if (req.url === '/api/login' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            console.log(`[Port 5000 Server] Request Body:`, body);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 'success',
                message: 'Login successful on server!',
                timestamp: new Date().toISOString()
            }));
        });
    } else if (req.method === 'OPTIONS') {
        // When preflight request arrives, do NOT send CORS allow headers
        console.log(`[Port 5000 Server] Received Preflight OPTIONS request without CORS headers`);
        res.writeHead(204);
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 CORS Test API Server is listening on http://localhost:${PORT}`);
    console.log(`🔒 Notice: CORS headers are intentionally omitted to demonstrate CORS errors.`);
    console.log(`======================================================\n`);
});
