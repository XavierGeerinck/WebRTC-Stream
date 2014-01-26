var Overlay = function (image, x, y, width, height) {
    this.image = new Image();
    this.image.src = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

/**
 * onInit hook, this gets called when the renderer object adds this
 */
Overlay.prototype.onInit = function () {
};

/**
 * onDestroy hook, this gets called when the renderer object stops
 */
Overlay.prototype.onDestroy = function () {
};

/**
 * onDraw, this gets called when the renderer object renders everything to the screen
 */
Overlay.prototype.onDraw = function (ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};