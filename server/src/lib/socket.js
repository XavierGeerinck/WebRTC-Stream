var SocketIO    = require('socket.io');
var fs          = require('fs');

var clients = [];

// Start the socket server
function start(server) {
    var io = SocketIO.listen(server.listener);
    
    io.set('log level', 1);
    
//    io.set('authorization', function (handshakeData, callback) {
//    });
    
    // Listen on WS:// Connections
    io.sockets.on('connection', function (socket) {
        console.log('Incoming connection');
        clients.push(socket);
                    
        // When we get stream data
        socket.on('stream', function (data) {
            console.log('broadcast');
            socket.broadcast.emit('stream', { image: data });
        });
    });
};

exports.start = start;