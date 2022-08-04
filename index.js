/*
Title: UPTIME MONITORING APPLICATION
Description: A restful Api to Monitor Up/Down Time of user defined links
Date:03/08/2022
*/

// dependencies
const http = require('http');

const { handleReqRes } = require('./helpers/helperReqRes');

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
app.handleReqRes = handleReqRes;
// Start the server
app.createServer();
