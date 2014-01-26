'use strict';

var Types   = require('hapi').types;
var metrics = require('../../controllers/stream');

var routes = [
    {
        method: 'GET',
        path: '/stream',
        config: {
            handler: metrics.test
        }
    }
];

module.exports.routes = function (server) {
    server.route(routes);
};