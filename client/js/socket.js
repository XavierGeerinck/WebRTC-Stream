var Socket = function () {
    this.servers = { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] };
    this.ready = false;
};

Socket.prototype.connect = function () {
    var self = this;
    
    this.localPeerConnection = new webkitRTCPeerConnection(this.servers, {
        optional: [
            {
                RtpDataChannels: true
            }
        ]
    });
    
    console.log('Created Local Peer Channel');
    
    this.localPeerConnection.ondatachannel = function (event) {
        self.receiveChannel = event.channel;
        self.receiveChannel.onmessage = function (event) {
            console.log(event.data);    
        };
    }
    
    try {
        this.sendChannel = this.localPeerConnection.createDataChannel('sendDataChannel', { reliable: false });
        console.log('Created Send Data Channel');
    } catch (e) {
        console.log('Exception when creating send channel: ' + e.message);    
    }
    
    this.localPeerConnection.onicecandidate = this.gotLocalCandidate;
    this.sendChannel.onopen = this.handleSendChannelStateChange;
    this.sendChannel.onclose = this.handleSendChannelStateChange;
};

Socket.prototype.disconnect = function () {
    this.connection = null;
};

Socket.prototype.send = function (key, data) {
    console.log('Trying to send'); // TODO: Catch this, then timeout for 5s
    if (this.ready) {
        console.log('Send Msg');
        this.sendChannel.send(data);
    }
};

Socket.prototype.handleSendChannelStateChange = function () {
    var readyState = this.sendChannel.readyState;
    console.log('Send Channel State: ' + readyState);
    
    if (readyState == 'open') {
        this.ready = true;    
    } else {
        this.ready = false;    
    }
};

Socket.prototype.gotLocalCandidate = function () {
    console.log('Remote ICE Callback');
    if (event.candidate) {
        this.localPeerConnection.addIceCandidate(event.candidate);
        console.log('Local ICE candidate: \n' + event.candidate.candidate);
    }
};