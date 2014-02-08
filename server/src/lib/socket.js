var SocketIO    = require('socket.io');
var fs          = require('fs');
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 8080 });

var clients = [];

// Start the socket server
function start(server) {
    wss.on('connection', function (ws) {
        // When we get stream data
        ws.on('message', function (data) {
            ws.send(data, { binary: true });
            //socket.broadcast.emit('response', { image: data });
        });
    });
};

exports.start = start;