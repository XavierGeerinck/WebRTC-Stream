var MainLoop = function () {
    this.connection = new RTCMulti();
    
    // Add FPS counter
    this.stats = new Stats();
    this.stats.setMode(0);
    
    // Align fsp top left
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.top = '0px';
    
    document.body.appendChild( this.stats.domElement );
};

MainLoop.prototype.joinChannel = function (channelId) {
    this.connection.joinChannel(channelId);
};

MainLoop.prototype.openChannel = function (channelId) {
    this.connection.openChannel(channelId);
};