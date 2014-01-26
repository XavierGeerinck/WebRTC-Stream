var canvas = document.querySelector('#canvas');

// Set canvas 1024 * 768
canvas.width = 1024;
canvas.height = 768;

// Black background
canvas.getContext('2d').fillStyle = "#000000";
canvas.getContext('2d').fillRect(0, 0, screen.availWidth, screen.availHeight);

// Add renderer + webcam + overlay
var renderer = new Renderer(canvas);
renderer.start();

function addWebcam() {
    renderer.add(new Webcam(0, 0, 480, 320));
}

function addOverlay() {
    var x = Math.round(Math.random() * canvas.width);
    var y = Math.round(Math.random() * canvas.height);
    renderer.add(new Overlay('img/cat.png', x, y, 100, 100));
}