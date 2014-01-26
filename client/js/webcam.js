var Webcam = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.video = document.createElement('video');
};

/**
 * Start the webcam stream and assign it too this.video
 */
Webcam.prototype.onInit = function() {
    var self = this;
    
    navigator.getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia );
    navigator.getMedia({ video: true }, function (stream) {
        // Set video
        self.video.src = webkitURL.createObjectURL(stream);
        
        // Start the webcam stream + set started
        self.video.play();
    }, function onUserMediaError (error) {
        console.log(error);
    });
};

/**
 * Stop the webcam streaming + remove references too it so gc can kick in
 */
Webcam.prototype.onDestroy = function () {
    this.video = document.createElement('video');
    this.video.setAttribute('width', width);
    this.video.setAttribute('height', height);
};

/**
 * Draw the video that we created on the canvas (canvas is ctx)
 */
Webcam.prototype.onDraw = function(ctx) {
    ctx.drawImage(this.video, this.x, this.y, this.width, this.height);
};

Webcam.prototype.setHeight = function (height) {
    this.height = height;
};

Webcam.prototype.setWidth = function (width) {
    this.width = width;
};