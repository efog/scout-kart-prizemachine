(function () {

    class PiranhaPlantSheet {
        constructor() {
            var imageLoader = new Image();
            imageLoader.addEventListener("load", () => {
                var buffer = document.createElement("canvas");
                buffer.width = imageLoader.width;
                buffer.height = imageLoader.height;
                var bufferContext = buffer.getContext("2d");
                bufferContext.drawImage(imageLoader, 0, 0);
                var imageData = bufferContext.getImageData(0, 0, imageLoader.width, imageLoader.height);
                var data = imageData.data;
                for (var i = 0; i < data.length; i += 4) {
                    if (data[i] === 147 && data[i + 1] === 187 && data[i + 2] === 236) {
                        data[i + 3] = 0; // alpha
                    }
                }
                bufferContext.save();
                bufferContext.clearRect(0, 0, imageLoader.width, imageLoader.width);
                bufferContext.putImageData(imageData, 0, 0);
                var newImage = document.createElement("img");
                newImage.src = buffer.toDataURL("image/png");
                this._image = newImage;
            });
            imageLoader.src = "./images/piranhaplantsheet.png"
            this._spriteHeight = 173;
            this._spriteWidth = 181;
            this._colorKey = "#93BBEC";
            this._frameCount = 21;
            this._fps = 24;
            this._timePerFrame = 1000 / this._fps;
            this._elapsed = 0;
            this._currentFrame = 0;
        }
        draw(context, elapsed) {
            this._currentFrame = Math.floor((this._elapsed / this._timePerFrame) % this._frameCount);
            if (this._image) {
                var sizeRatio = Math.min(context.canvas.width / 1000, 1);
                var colCount = 5;
                var row = Math.floor(this._currentFrame / colCount);
                var col = (this._currentFrame - (row * colCount)) % colCount;
                var x = col * 181;
                var y = row * 173;
                context.save();
                if (col == 1 && row == 4) {
                    debugger;
                }
                context.drawImage(this._image, x + 1, y + 1, 179, 172, 10, 10, Math.floor(179 * sizeRatio), Math.floor(172 * sizeRatio));
                context.restore();
            }
            this._elapsed += elapsed;
        }
    }

    class KoopaSpriteSheet {
        constructor() {
            var imageLoader = new Image();
            imageLoader.addEventListener("load", () => {
                var buffer = document.createElement("canvas");
                buffer.width = imageLoader.width;
                buffer.height = imageLoader.height;
                var bufferContext = buffer.getContext("2d");
                bufferContext.drawImage(imageLoader, 0, 0);
                var imageData = bufferContext.getImageData(0, 0, imageLoader.width, imageLoader.height);
                var data = imageData.data;
                for (var i = 0; i < data.length; i += 4) {
                    if (data[i] === 147 && data[i + 1] === 187 && data[i + 2] === 236) {
                        data[i + 3] = 0; // alpha
                    }
                }
                bufferContext.save();
                bufferContext.clearRect(0, 0, imageLoader.width, imageLoader.width);
                bufferContext.putImageData(imageData, 0, 0);
                var newImage = document.createElement("img");
                newImage.src = buffer.toDataURL("image/png");
                this._image = newImage;
            });
            imageLoader.src = "./images/koopaspritesheet.png"
            this._spriteHeight = 180;
            this._spriteWidth = 193;
            this._colorKey = "#93BBEC";
            this._frameCount = 20;
            this._fps = 30;
            this._timePerFrame = 1000 / this._fps;
            this._elapsed = 0;
            this._currentFrame = 0;
        }
        draw(context, elapsed) {
            this._currentFrame = Math.floor((this._elapsed / this._timePerFrame) % this._frameCount);
            if (this._image) {
                var sizeRatio = Math.min(context.canvas.width / 1000, 1);
                var colCount = 5;
                var spriteWidth = this._image.width / colCount;
                var spriteHeight = 193;
                var row = Math.floor(this._currentFrame / colCount);
                var col = (this._currentFrame - (row * colCount));
                var x = col * spriteWidth;
                var y = row * spriteHeight;
                var clipWidth = spriteWidth;
                var clipHeight = spriteHeight;
                context.save();
                context.drawImage(this._image, x + 1, y + 1, clipWidth - 10, clipHeight - 10, context.canvas.width - 10 - Math.floor(spriteWidth * sizeRatio), 10, Math.floor(spriteWidth * sizeRatio), Math.floor(spriteHeight * sizeRatio));
                context.restore();
            }
            this._elapsed += elapsed;
        }
    }

    var piranhaPlantSheet = new PiranhaPlantSheet();
    var koopaSpriteSheet = new KoopaSpriteSheet();

    class Background {
        constructor() {
            var imageLoader = new Image();
            imageLoader.addEventListener("load", () => {
                this._image = imageLoader;
            });
            imageLoader.src = "./images/86e2c3cfce22fb30c268774041e3becf.png"
        }
        draw(context, elapsed) {
            context.save();
            context.beginPath();
            context.rect(0, 0, context.canvas.width, context.canvas.height);
            context.fillStyle = "#b30000";
            context.fill();
            context.closePath();
            if (this._image) {
                context.drawImage(this._image, context.canvas.width / 2 - this._image.width / 2, 10, this._image.width * 0.25);
            }
            context.restore();
        }
    }

    var canvas = document.getElementById("drawboard");
    var context = canvas.getContext("2d");
    var bufferCanvas = document.createElement("canvas");
    var bufferCanvasCtx = bufferCanvas.getContext("2d");

    bufferCanvasCtx.canvas.width = context.canvas.width;
    bufferCanvasCtx.canvas.height = context.canvas.height;

    var currentFrame = 0;
    var lastTime = new Date().getTime();
    var currentTime = 0;

    var background = new Background();

    var draw = function () {
        currentTime = new Date().getTime();
        var elapsed = currentTime - lastTime;
        var fps = 1000 / elapsed;
        currentFrame++;
        context.save();
        background.draw(bufferCanvasCtx, elapsed);

        koopaSpriteSheet.draw(bufferCanvasCtx, elapsed);
        piranhaPlantSheet.draw(bufferCanvasCtx, elapsed);

        context.drawImage(bufferCanvas, 0, 0, bufferCanvas.width, bufferCanvas.height);
        context.restore();
        lastTime = currentTime;
    }
    var update = function () {
        draw(currentFrame)
        window.requestAnimationFrame(update);
    }
    var resize = function () {
        bufferCanvas.width = canvas.width = window.innerWidth;
        bufferCanvas.height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize, false);
    resize();
    update();
})();