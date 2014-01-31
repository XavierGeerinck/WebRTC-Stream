var sendCanvas = document.querySelector('#sendCanvas');
var receiveCanvas = document.querySelector('#receiveCanvas');

// Set canvas 1024 * 768
sendCanvas.width = screen.availWidth / 2.5;
sendCanvas.height = screen.availHeight / 2.5;

receiveCanvas.width = screen.availWidth / 2.5;
receiveCanvas.height = screen.availHeight / 2.5;

// Black background
var backgroundImage = new Image();
backgroundImage.src = 'img/background.png';
backgroundImage.onload = function () {
    sendCanvas.getContext('2d').drawImage(backgroundImage, 0, 0, sendCanvas.width, sendCanvas.height);
}

receiveCanvas.getContext('2d').fillStyle = "#000000";
receiveCanvas.getContext('2d').fillRect(0, 0, receiveCanvas.width, receiveCanvas.height);


// Add renderer + webcam + overlay 
var renderer = new Renderer(sendCanvas);
renderer.start();

function addWebcam() {
    var webcamWidth = 250; // 320
    var webcamHeight = 187; // 240
        
    renderer.add(new Webcam(sendCanvas.width - (webcamWidth + 130), sendCanvas.height - webcamHeight, webcamWidth, webcamHeight));
}

function addOverlay() {
    var x = Math.round(Math.random() * sendCanvas.width);
    var y = Math.round(Math.random() * sendCanvas.height);
    renderer.add(new Overlay('img/overlays/cat.png', x, y, 100, 100));
}

function addLeagueOfLegends1Overlay() {
    renderer.add(new Overlay('img/overlays/league_of_legends_1.png', 0, 0, sendCanvas.width, sendCanvas.height));
}

function addLeagueOfLegends2Overlay() {
    renderer.add(new Overlay('img/overlays/league_of_legends_2.png', 0, 0, sendCanvas.width, sendCanvas.height));
}

function stop() {
    renderer.stop();
}

function startStreaming() {
    renderer.startStreaming();
}

function stopStreaming() {
    renderer.stopStreaming();
}