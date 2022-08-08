/*
Title: Handle Request RESPONSE
Description: Handle Request RESPONSE
Date:03/08/2022
*/

// Dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');

// Routes
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');

// Module Scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
    // Request handle
    // Get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();

        chosenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof statusCode === 'number' ? statusCode : 500;
            payload = typeof payload === 'object' ? payload : {};

            const payloadString = JSON.stringify(payload);

            res.writeHead(statusCode);
            res.end(payloadString);
        });
        // console.log(realData);
        // Response handle
        res.end('Hello World');
    });
    // console.log(queryStringObject);
    // console.log(trimmedPath);
    // console.log(headersObject);
};

module.exports = handler;
