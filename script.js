// //creates a node.js server at localhost:8080 after running: "node script.js" in your terminal

// http.createServer(function(req, res) {
//     var readStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
//     readStream.pipe(res);

// }).listen(8080);

const http = require('http');
var fs = require('fs');
// const express = require('express');
// const app = express();
const path = require('path');
// const router = express.Router();
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    let filePath = path.join(
        __dirname,
        // "public",
        req.url === "/" ? "index.html" : req.url
    );

    let extName = path.extname(filePath);
    let contentType = 'text/html';

    switch (extName) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.ico':
            contentType = 'image/ico';
            break;
    }

    console.log(`File path: ${filePath}`);
    console.log(`Content-Type: ${contentType}`)

    res.writeHead(200, { 'Content-Type': contentType });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
});

server.listen(port, (err) => {
    if (err) {
        console.log(`Error: ${err}`)
    } else {
        console.log(`Server listening at port ${port}...`);
    }
});