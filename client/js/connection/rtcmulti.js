var RTCMulti = function () {
    this.connection = new RTCMultiConnection();
    
    this.connection.direction = "one-to-many";
    this.connection.maxParticipantsAllowed = 10;
    this.connection.session = {
        data: true,
        audio: true,
        video: true
    };
    
    this.connection.bandwidth = {
        audio: 50,
        video: 256,
        data: 1638400
    };
    
    this.connection.chunkSize = 15 * 1000; // 15K since it's the receiving limit of firefox
    
    this.connection.onstream = this.handleStream.bind(this);
    this.connection.onopen = this.handleChannelOpened.bind(this);
    this.connection.onerror = this.handleError.bind(this);
};

/**
 * Open and Join Channels
 */
RTCMulti.prototype.openChannel = function (channelId) {
    this.connection.open(channelId);
};

RTCMulti.prototype.joinChannel = function (channelId) {
    this.connection.connect(channelId);
    this.connection.dontAttachStream = true;
};

/**
 * HANDLERS
 */
RTCMulti.prototype.handleChannelOpened = function (e) {
};

RTCMulti.prototype.handleError = function (e) {
    console.log(e.message);
};

RTCMulti.prototype.handleStream = function (e) {
    if (e.type === 'remote') {
        document.body.appendChild(e.mediaElement);
    }
};