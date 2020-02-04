(function () {

    class PiranhaPlantSheet {
        constructor() {
            var imageLoader = new Image();
            imageLoader.addEventListener("load", () => {
                this._image = imageLoader;
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
            this._currentFrame += this._frameCount / (1000 / this._fps);
            if (this._image) {
                var colCount = 5;
                var rowCount = 5;
                var row = currentFrame % rowCount;
                var col = (currentFrame - row * rowCount) % colCount;
                var x = col * 180;
                var y = row * 173;
                context.save();
                context.drawImage(this._image, x, y, 180, 173, 10, 10, 180, 173);
                context.restore();
            }
            if (this._currentFrame >= 21) {
                this._currentFrame = 0;
            }
            this._elapsed += elapsed;
        }
    }

    class Background {
        constructor() {
            this.piranhaPlantSheet = new PiranhaPlantSheet();
        }
        draw(context, elapsed) {
            context.beginPath();
            context.rect(0, 0, context.canvas.width, context.canvas.height);
            context.fillStyle = "#b30000";
            context.fill();
            context.closePath();
            this.piranhaPlantSheet.draw(context, elapsed);
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