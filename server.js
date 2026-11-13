
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    let filePath;

    // Route: / or /index
    if (req.url === '/' || req.url === '/index') {
        filePath = path.join(__dirname, 'index.html');
    }

    // Route: /introduction
    else if (req.url === '/introduction') {
        filePath = path.join(__dirname, 'introduction.html');
    }

    // Any other URL
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page Not Found');
        return;
    }

    // Read and display the requested HTML file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Server Error');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

// Start the server
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Node.js server running at http://localhost:${PORT}`);
});
