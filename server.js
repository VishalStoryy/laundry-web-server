

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;


const server = http.createServer((req, res) => {
    console.log(` Request received: ${req.url}`); // Log every request

    let filePath;
    let statusCode = 200;

    // Routing logic
    if (req.url === '/' || req.url === '/home') {
        filePath = path.join(__dirname, 'home.html');
    } 
    else if (req.url === '/about') {
        filePath = path.join(__dirname, 'about.html');
    } 
    else if (req.url === '/contact') {
        filePath = path.join(__dirname, 'contact.html');
    } 
    else if (req.url === '/services') {
        filePath = path.join(__dirname, 'services.html');
    } 
    else {
        statusCode = 404;
        filePath = path.join(__dirname, '404.html');
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>500 - Internal Server Error</h1>');
            return;
        }

        
        res.writeHead(statusCode, { 'Content-Type': 'text/html' });
        res.end(content);
    });
});


server.listen(PORT, () => {
    console.log(` Server is running at http://localhost:${PORT}`);
    console.log(` Test these routes:`);
    console.log(`  → http://localhost:${PORT}/home`);
    console.log(`  → http://localhost:${PORT}/about`);
    console.log(`  → http://localhost:${PORT}/contact`);
    console.log(`  → http://localhost:${PORT}/services`);
    console.log(`  → http://localhost:${PORT}/404`);
});