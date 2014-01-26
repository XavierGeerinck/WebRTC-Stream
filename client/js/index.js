var canvas = document.querySelector('#canvas');

// Set canvas 1024 * 768
canvas.width = 1600;
canvas.height = 900;

// Black background
var backgroundImage = new Image();
backgroundImage.src = 'img/background.png';
backgroundImage.onload = function () {
    canvas.getContext('2d').drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}
//canvas.getContext('2d').fillStyle = "#000000";
//canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height);


// Add renderer + webcam + overlay
var renderer = new Renderer(canvas);
renderer.start();

function addWebcam() {
    renderer.add(new Webcam(1040, 680, 320, 240));
}

function addOverlay() {
    var x = Math.round(Math.random() * canvas.width);
    var y = Math.round(Math.random() * canvas.height);
    renderer.add(new Overlay('img/overlays/cat.png', x, y, 100, 100));
}

function addLeagueOfLegends1Overlay() {
    renderer.add(new Overlay('img/overlays/league_of_legends_1.png', 0, 0, canvas.width, canvas.height));
}

function addLeagueOfLegends2Overlay() {
    renderer.add(new Overlay('img/overlays/league_of_legends_2.png', 0, 0, canvas.width, canvas.height));
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