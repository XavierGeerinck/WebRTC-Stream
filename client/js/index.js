var canvas = document.querySelector('#canvas');

// Set canvas 1024 * 768
canvas.width = 1600;
canvas.height = 900;

// Black background
canvas.getContext('2d').fillStyle = "#000000";
canvas.getContext('2d').fillRect(0, 0, screen.availWidth, screen.availHeight);

// Add renderer + webcam + overlay
var renderer = new Renderer(canvas);
renderer.start();

function addWebcam() {
    renderer.add(new Webcam(1040, 680, 320, 240));
}

function addOverlay() {
    var x = Math.round(Math.random() * canvas.width);
    var y = Math.round(Math.random() * canvas.height);
    renderer.add(new Overlay('img/cat.png', x, y, 100, 100));
}

function addLeagueOfLegends1Overlay() {
    renderer.add(new Overlay('img/league_of_legends_1.png', 0, 0, canvas.width, canvas.height));
}

function addLeagueOfLegends2Overlay() {
    renderer.add(new Overlay('img/league_of_legends_2.png', 0, 0, canvas.width, canvas.height));
}