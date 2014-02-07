var mainLoop = new MainLoop();

function openChannel(channelId) {
    mainLoop.openChannel(channelId);
};

function joinChannel(channelId) {
    mainLoop.joinChannel(channelId);
};

function sendMessage() {
    mainLoop.sendMessage(document.getElementById("chatInput").value);
};