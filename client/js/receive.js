var mainLoop = new MainLoop();

function joinChannel(channelId) {
    mainLoop.joinChannel(channelId);
};

function sendMessage() {
    mainLoop.sendMessage(document.getElementById("chatInput").value);
};