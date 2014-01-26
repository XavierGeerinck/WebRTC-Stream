var SocketIO    = require('socket.io');
var fs          = require('fs');

// Start the socket server
function start(server) {
    var io = SocketIO.listen(server.listener);
    
    io.set('log level', 1);
    
//    io.set('authorization', function (handshakeData, callback) {
//    });
    
    // Listen on WS:// Connections
    io.sockets.on('connection', function (socket) {
        console.log('Incoming connection');
    });
    
    // When we get stream data
    io.sockets.on('stream', function (data) {
        console.log('data received');
    });
};

exports.start = start;