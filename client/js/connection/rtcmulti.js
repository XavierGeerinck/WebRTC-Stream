var RTCMulti = function () {
    this.connection = new RTCMultiConnection();
    
    // If one to many, then the host gets all connections
    this.connection.direction = "many-to-many";
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
    this.connection.onmessage = this.handleMessage.bind(this);
};

RTCMulti.prototype.sendMessage = function (msg) {
    this.connection.send(msg);
};

/**
 * Open and Join Channels
 */
RTCMulti.prototype.openChannel = function (channelId) {
    this.connection.open(channelId);
};

RTCMulti.prototype.joinChannel = function (channelId) {
    this.connection.connect(channelId);
    
    // Do not attach the client stream
    //this.connection.dontAttachStream = true;
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
    var nameElement = document.createElement('div');
    nameElement.setAttribute('class', 'webcamName');
    nameElement.innerHTML = 'Name: ' + e.userid;
    
    // Append the new elements
    document.getElementById('clients').appendChild(nameElement);
    document.getElementById('clients').appendChild(e.mediaElement);
    }
    
        if (e.type === 'local') {  
    var nameElement = document.createElement('div');
    nameElement.setAttribute('class', 'webcamName');
    nameElement.innerHTML = 'Name: ' + e.userid;
    
    // Append the new elements
    document.getElementById('currently-speaking').appendChild(nameElement);
    document.getElementById('currently-speaking').appendChild(e.mediaElement);
    }
};

RTCMulti.prototype.handleMessage = function (e) {
    var date = new Date();
    
    // Set as day/month/year
    var date_formatted = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    var newLi = document.createElement('li');
    newLi.innerHTML = '[' + date_formatted + ']' + '[' + e.userid + ']' + e.data;
    
    // Append
    document.getElementById('messages').appendChild(newLi);
};