var fps		   = 60;
var currentFps = 0;
var now        = null;
var then       = new Date().getTime();
var delta	   = null;
var oldTime    = null;

var streaming  = false;
var video      = document.createElement('video');
var canvas     = document.querySelector('#canvas');

var width 	   = screen.availWidth;
var height 	   = screen.availHeight;
var imageObj   = new Image();    

window.onload = function() {
    // Start webcam + overlay
    initWebcam();
    initOverlay();
    renderLoop();
};

function renderLoop() { 
    renderOverlay();

    // Ask browser to re-ender when it got time
    //	      			  loop,     el to re-render
    requestAnimationFrame(renderLoop, canvas);
};

function renderOverlay() {
    //startTime = new Date().getTime();
    // Render camera img
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);

    // Assemble the selected img   
    canvas.getContext('2d').drawImage(imageObj, 0, 0);

    canvas.getContext('2d').fillText(currentFps + " fps", 10, 26);

    // Convert to png, compress and set through the socket
    //var data = canvas.toDataURL('image/png');
};


function initWebcam() {
    // Get usermedia
    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);
    
    // Get webcam
    navigator.getMedia(
	    {
	      video: true,
	      audio: false
	    },
	    function(stream) {
            var vendorURL = window.URL || window.webkitURL;
            video.src = vendorURL.createObjectURL(stream);

	        video.play();
	    },
	    function(err) {
	        console.log("An error occured! " + err);
	    }
    );

    // When the vid element is ready, set height and width
    video.addEventListener('canplay', function(ev){
	    if (!streaming) {
	      height = video.videoHeight / (video.videoWidth/width);
	      
	      video.setAttribute('width', width);
	      video.setAttribute('height', height);

	      canvas.setAttribute('width', width);
	      canvas.setAttribute('height', height);

	      streaming = true;
    	}
    }, false);    
};

function initOverlay() {
    imageObj.src = './img/cat.png';
};