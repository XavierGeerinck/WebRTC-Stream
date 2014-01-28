var Socket = function () {
    this.servers = { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] };
};

Socket.prototype.connect = function () {
    var self = this;
    
    this.localPeerChannel = new webkitRTCPeerConnection(this.servers, {
        optional: [
            {
                RtpDataChannels: true
            }
        ]
    });
    
    this.localPeerChannel.ondatachannel = function (event) {
        self.receiveChannel = event.channel;
        self.receiveChannel.onmessage = function (event) {
            console.log(event.data);    
        };
    }
    
    try {
        this.sendChannel = this.localPeerChannel.createDataChannel('sendDataChannel', { reliable: false });
    } catch (e) {
        console.log('Exception when creating send channel: ' + e.message);    
    }
    
    this.sendChannel.onopen = this.handleSendChannelStateChange;
    this.sendChannel.onclose = this.handleSendChannelStateChange;
};

Socket.prototype.disconnect = function () {
    this.connection = null;
};

Socket.prototype.send = function (key, data) {
    this.sendChannel.send(data);
};

Socket.prototype.handleSendChannelStateChange = function () {
    var readyState = this.sendChannel.readyState;
    console.log('Send Channel State: ' + readyState);
};