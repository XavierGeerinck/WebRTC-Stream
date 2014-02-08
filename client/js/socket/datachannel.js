/**
 * SCTP is needed for binary files, it works on the following browsers:
 * - Chrome version: >= 31
 * - Firefox
 * We enable SCTP by not giving any constraints
 */
var Datachannel = function () {
    //this.servers = { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] };
    this.servers = { "binaryType": "blob" };
    this.ready = false;
    
    this.localPeerConnection = new webkitRTCPeerConnection(this.servers,
        {
//            optional: [
//                {
//                    RtpDataChannels: true
//                }
//            ]
        });
    
    this.remotePeerConnection = new webkitRTCPeerConnection(this.servers,
        {
//            optional: [
//                {
//                    RtpDataChannels: true
//                }
//            ]
        });
    
    this.sendChannel = null;
    this.receiveChannel = null;
    this.readyState = null;
};

Datachannel.prototype.trace = function (text) {
    console.log((performance.now() / 1000).toFixed(3) + ": " + text);
}

Datachannel.prototype.connect = function () {
    this.trace('Created local peer connection object localPeerConnection');
    
    try {
        // Reliable Data Channels not yet supported in Chrome
        this.sendChannel = this.localPeerConnection.createDataChannel("sendDataChannel",
            {
                reliable: false
            });
        
        this.trace('Created send data channel');
        
    } catch (e) {
        alert('Failed to create data channel. You need Chrome M25 or later with RtpDataChannel enabled');
        this.trace('createDataChannel() failed with exception: ' + e.message);
    }
    
    this.localPeerConnection.onicecandidate = this.gotLocalCandidate.bind(this);
    this.sendChannel.onopen = this.handleSendChannelStateChange.bind(this);
    this.sendChannel.onclose = this.handleSendChannelStateChange.bind(this);
    
    this.trace('Created remote peer connection object remotePeerConnection');
    
    this.remotePeerConnection.onicecandidate = this.gotRemoteIceCandidate.bind(this);
    this.remotePeerConnection.ondatachannel = this.gotReceiveChannel.bind(this);
    
    this.localPeerConnection.createOffer(this.gotLocalDescription.bind(this));
}

Datachannel.prototype.send = function (key, data) {
    if (this.readyState == 'open') {
        try {
            this.sendChannel.send(data);
            this.trace('Sent data: ' + data);
        } catch (e) {
            this.trace(e.message);    
        }
    }
}

Datachannel.prototype.closeDataChannels = function () {
    this.trace('Closing data channels');
    this.sendChannel.close();
    this.trace('Closed data channel with label: ' + this.sendChannel.label);
    this.receiveChannel.close();
    this.trace('Closed data channel with label: ' + this.receiveChannel.label);
    this.localPeerConnection.close();
    this.remotePeerConnection.close();
    this.localPeerConnection = null;
    this.remotePeerConnection = null;
    this.trace('Closed peer connections');
}

Datachannel.prototype.gotLocalDescription = function (desc) {
    this.localPeerConnection.setLocalDescription(desc);
    this.trace('Offer from localPeerConnection \n' + desc.sdp);
    this.remotePeerConnection.setRemoteDescription(desc);
    this.remotePeerConnection.createAnswer(this.gotRemoteDescription.bind(this));
}

Datachannel.prototype.gotRemoteDescription = function (desc) {
    this.remotePeerConnection.setLocalDescription(desc);
    this.trace('Answer from remotePeerConnection \n' + desc.sdp);
    this.localPeerConnection.setRemoteDescription(desc);
}

Datachannel.prototype.gotLocalCandidate = function (event) {
    this.trace('local ice callback');
    if (event.candidate) {
        this.remotePeerConnection.addIceCandidate(event.candidate);
        this.trace('Local ICE candidate: \n' + event.candidate.candidate);
    }
}

Datachannel.prototype.gotRemoteIceCandidate = function (event) {
    this.trace('remote ice callback');
    if (event.candidate) {
        this.localPeerConnection.addIceCandidate(event.candidate);
        this.trace('Remote ICE candidate: \n ' + event.candidate.candidate);
    }
}

Datachannel.prototype.gotReceiveChannel = function (event) {
  this.trace('Receive Channel Callback');
  this.receiveChannel = event.channel;
  this.receiveChannel.onmessage = this.handleMessage.bind(this);
  this.receiveChannel.onopen = this.handleReceiveChannelStateChange.bind(this);
  this.receiveChannel.onclose = this.handleReceiveChannelStateChange.bind(this);
}

Datachannel.prototype.handleMessage = function (event) {
    console.log('Received');
    
    // Set the message as a Uint8Array
    var byteArray = new Uint8Array(event.data);
    
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
    
//    
//    var array = imageData.data.buffer;
//    //this.trace('Received message: ' + event.data);
//    var data = new Uint8ClampedArray(event.data);
//    
//    var receiveCanvas = document.querySelector('#receiveCanvas');
//    var imageData = receiveCanvas.getContext('2d').createImageData(this.canvas.width, this.canvas.height);
//    imageData.data.set(data);
//    
//    receiveCanvas.getContext('2d').putImageData(imageData, 0, 0);
    
//    var image = new Image();
//    image.src = event.data;
//    image.onload = function () {
//        receiveCanvas.getContext('2d').drawImage(this, 0, 0);    
//    };
}

Datachannel.prototype.handleSendChannelStateChange = function () {
    this.readyState = this.sendChannel.readyState;
    this.trace('Send channel state is: ' + this.readyState);
}

Datachannel.prototype.handleReceiveChannelStateChange = function () {
    var readyState = this.receiveChannel.readyState;
    this.trace('Receive channel state is: ' + readyState);
}