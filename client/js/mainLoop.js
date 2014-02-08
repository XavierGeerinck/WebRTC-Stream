var MainLoop = function () {
    this.connection = new RTCMulti();
};

MainLoop.prototype.joinChannel = function (channelId) {
    this.connection.joinChannel(channelId);
};

MainLoop.prototype.openChannel = function (channelId) {
    this.connection.openChannel(channelId);
};

MainLoop.prototype.sendMessage = function (message) {
    this.connection.sendMessage(message);
};