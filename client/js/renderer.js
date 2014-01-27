var Renderer = function (canvas) {
    this.socket = null;
    this.isStarted = false;
    this.isStreaming = false;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.renderList = [];
    
    // Add FPS counter
    this.stats = new Stats();
    this.stats.setMode(0);
    
    // Align fsp top left
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.top = '0px';
    
    document.body.appendChild( this.stats.domElement );
};

Renderer.prototype.add = function (renderObject) {
    // Init the object if it got the onInit hook
    if (renderObject.onInit) {
        renderObject.onInit();
    }
    
    // Add it to the renderer
    this.renderList.push(renderObject);
};

Renderer.prototype.start = function () {
    // Set started
    this.isStarted = true;
    
    // Start looping
    this.loop();
};

Renderer.prototype.startStreaming = function () {
    this.isStreaming = true;
    this.socket = io.connect('http://webrtc.api.localhost.com');
};

Renderer.prototype.stopStreaming = function () {
    this.isStreaming = false;
    this.socket = null;
};

Renderer.prototype.loop = function () {
    // Start counting fps
    this.stats.begin();
    
    // Render all the render objects
    for (var i in this.renderList) {
        if (this.renderList[i].onDraw) {
            this.renderList[i].onDraw(this.ctx);    
        }
    }
    
    // Stop counting fps
    this.stats.end();
    
    // If is streaming, broadcast
    if (this.isStreaming) {
        this.sendToSocket();    
    }
    
    // Repeat while started
    if (this.isStarted) {
        requestAnimationFrame(this.loop.bind(this));
    }
};

Renderer.prototype.sendToSocket = function () {
    // Get image data
    //var quality = 0.8;
    //var image = this.canvas.toDataURL('image/jpeg', quality);
    
//    var image = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
//    var buffer = new ArrayBuffer(image.data.length);
//    var bytes = new Uint8Array(buffer);
//    for (var i=0; i< bytes.length; i++) {
//        bytes[i] = image.data[i];
//    }
//    
    var imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    var binary = new Uint8Array(imageData.data.length);
    for (var i = 0; i < imageData.data.length; i++) {
      binary[i] = imageData.data[i];
    }
    
    // We can improve speed by stripping the alpha values from this array!
    this.socket.emit('stream', binary.buffer);
};

Renderer.prototype.stop = function () {
    this.isStarted = false;
    
    for (var i in this.renderList) {
        if (this.renderList[i].onDestroy) {
            this.renderList[i].onDestroy();    
        }
    }
};