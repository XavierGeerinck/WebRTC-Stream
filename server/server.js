'use strict';

var Hapi                    = require('hapi');
var fs                      = require('fs');

// Socket Handler
var socket                  = require('./src/lib/socket');

// ROUTES
var V1StreamApi               = require('./src/routes/v1/stream');

// CONFIGURATION
var config                  = require('./config/app');

// Create logs directory if it doesn't exists yet
if (!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs');
}

// Create server object
var server = new Hapi.Server('0.0.0.0', config.server.port, {
//    cors: {
//        origin:  config.server.cors_client_origins,
//        headers: config.server.cors_headers,
//        methods: config.server.cors_methods,
//        credentials: config.server.cors_credentials
//    }
});

// Starts the API Server
function start(callback) {
    // Configure routes
    V1StreamApi.routes(server);
    
    // Start the server
    server.start(function() {
        server.log(['info', 'server'], 'Server started...');
        callback();
    });
};

function startSocketListener(callback) {
    socket.start(server);
    callback();
};

module.exports = {
    start: start,
    startSocketListener: startSocketListener,
    server: server
};