var Socket = function (url) {
    this.url = url;
    this.connection = null;
};

Socket.prototype.connect = function () {
    this.connection = io.connect(this.url);
};

Socket.prototype.disconnect = function () {
    this.connection = null;
};

Socket.prototype.send = function (key, data) {
    this.connection.emit(key, binary.buffer);
};