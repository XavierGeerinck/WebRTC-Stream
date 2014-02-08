var Websocket = function () {
    this.websocket = null;
    this.open = false;
};

Websocket.prototype.connect = function () {
    this.websocket = new WebSocket('ws://webrtc.api.localhost.com:8080');
    this.websocket.onopen = this.handleConnectionOpened.bind(this);
    this.websocket.onmessage = this.handleMessage.bind(this);
    this.websocket.binaryType = 'arraybuffer';
};

Websocket.prototype.handleConnectionOpened = function() {
    console.log('Connection Opened');
    this.open = true;    
};

Websocket.prototype.handleMessage = function (msg) {
    // Set the message as a Uint8Array
    var byteArray = new Uint8Array(msg.data);
    
    // Get canvas
    var receiveCanvas = document.querySelector('#receiveCanvas');
    var imageData = receiveCanvas.getContext('2d').getImageData(0, 0, receiveCanvas.width, receiveCanvas.height);
    
    // Convert the received ArrayBuffer to imageData
    for (var i = 0; i < imageData.data.length; i+= 4) {
        imageData.data[i + 0] = byteArray[i + 0];
        imageData.data[i + 1] = byteArray[i + 1];
        imageData.data[i + 2] = byteArray[i + 2];
        imageData.data[i + 3] = 255;
    }

    // Put it on the canvas
    receiveCanvas.getContext('2d').putImageData(imageData, 0, 0);
};

Websocket.prototype.send = function (key, data) {
    if (this.open) {
        this.websocket.send(data);
    }
};