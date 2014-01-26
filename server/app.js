'use strict';

// API Server
var server = require('./server.js');
server.start(function (err) {
    // Start socket listener
    server.startSocketListener(function (err) {});
});