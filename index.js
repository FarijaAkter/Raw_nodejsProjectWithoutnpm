/*
Title: UPTIME MONITORING APPLICATION
Description: A restful Api to Monitor Up/Down Time of user defined links
Date:03/08/2022
*/

// dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

// App object module scaffolding
const app = {};
// Configuration
app.config = {
    port: 3000,
};
// Create Server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    // Server call $ listen
    server.listen(app.config.port, () => {
        console.log(`Listening to port ${app.config.port}`);
    });
};
// Handle req,res
app.handleReqRes = (req, res) => {
    // Request handle
    // Get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    // const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        // Response handle
        res.end('Hello World');
    });
    console.log(queryStringObject);
    console.log(trimmedPath);
    console.log(headersObject);
};

// Start the server
app.createServer();
