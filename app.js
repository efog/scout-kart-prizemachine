(function () {
    // t = time, d = duration, b = start state, c = end state
    Math.linearTween = function (t, b, c, d) {
        return c * t / d + b;
    };

    Math.easeInQuad = function (t, b, c, d) {
        const td = t / d;
        return c * td * td + b;
    };

    Math.easeOutQuad = function (t, b, c, d) {
        const td = t / d;
        return -c * td * (td - 2) + b;
    };

    Math.easeInOutQuad = function (t, b, c, d) {
        let td2 = t / d / 2;
        if (td2 < 1) {
            return c / 2 * td2 * td2 + b;
        }
        td2--;
        return -c / 2 * (td2 * (td2 - 2) - 1) + b;
    };

    Math.easeInCubic = function (t, b, c, d) {
        const td = t / d;
        return c * td * td * td + b;
    };

    Math.easeOutCubic = function (t, b, c, d) {
        let td = t / d;
        td--;
        return c * (td * td * td + 1) + b;
    };

    Math.easeInOutCubic = function (t, b, c, d) {
        let td2 = t / d / 2;
        if (td2 < 1) {
            return c / 2 * td2 * td2 * td2 + b;
        }
        td2 -= 2;
        return c / 2 * (td2 * td2 * td2 + 2) + b;
    };

    Math.easeInQuart = function (t, b, c, d) {
        const td = t / d;
        return c * td * td * td * td + b;
    };


    Math.easeOutQuart = function (t, b, c, d) {
        let td = t / d;
        td--;
        return -c * (td * td * td * td - 1) + b;
    };


    Math.easeInOutQuart = function (t, b, c, d) {
        let td2 = t / d / 2;
        if (td2 < 1) {
            return c / 2 * td2 * td2 * td2 * td2 + b;
        }
        td2 -= 2;
        return -c / 2 * (td2 * td2 * td2 * td2 - 2) + b;
    };

    Math.easeInQuint = function (t, b, c, d) {
        const td = t / d;
        return c * td * td * td * td * td + b;
    };

    Math.easeOutQuint = function (t, b, c, d) {
        let td = t / d;
        td--;
        return c * (td * td * td * td * td + 1) + b;
    };

    Math.easeInOutQuint = function (t, b, c, d) {
        let td2 = t / d / 2;
        if (td2 < 1) {
            return c / 2 * td2 * td2 * td2 * td2 * td2 + b;
        }
        td2 -= 2;
        return c / 2 * (td2 * td2 * td2 * td2 * td2 + 2) + b;
    };

    Math.easeOutSine = function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    };

    Math.easeInOutSine = function (t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    };

    Math.easeInExpo = function (t, b, c, d) {
        return c * Math.pow(2, 10 * (t / d - 1)) + b;
    };

    Math.easeOutExpo = function (t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) + b;
    };

    Math.easeInOutExpo = function (t, b, c, d) {
        let td2 = t / d / 2;
        if (td2 < 1) {
            return c / 2 * Math.pow(2, 10 * (td2 - 1)) + b;
        }
        td2--;
        return c / 2 * (-Math.pow(2, -10 * td2) + 2) + b;
    };

    Math.easeInCirc = function (t, b, c, d) {
        const td = t / d;
        return -c * (Math.sqrt(1 - td * td) - 1) + b;
    };

    Math.easeOutCirc = function (t, b, c, d) {
        let td = t / d;
        td--;
        return c * Math.sqrt(1 - td * td) + b;
    };

    Math.easeInOutCirc = function (t, b, c, d) {
        let td2 = t / d / 2;
        if (td2 < 1) {
            return -c / 2 * (Math.sqrt(1 - td2 * td2) - 1) + b;
        }
        td2 -= 2;
        return c / 2 * (Math.sqrt(1 - td2 * td2) + 1) + b;
    };

    var animate = function (spriteState) {
        if (!spriteState.animations) { return; }
        var stateUpdate = {};
        for (let index = 0; index < spriteState.animations.length; index++) {
            const animation = spriteState.animations[index];
            if (spriteState.elapsed >= animation.startTime + animation.duration) { continue; }
            var animationFunction = Math[animation.easingFunction];
            // t = time, d = duration, b = start state, c = end state
            var t = spriteState.elapsed - animation.startTime;
            var d = animation.duration;
            var b = animation.startValue;
            var c = animation.endValue - animation.startValue;
            var res = animationFunction(t, b, c, d);
            stateUpdate[animation.targetProps] = res;
        }
        return Object.assign({}, stateUpdate);
    }

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
        update(state) {
            this._state = Object.assign({}, state);
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
                context.drawImage(this._image, x + 1, y + 1, 179, 172, context.canvas.width - Math.floor(179 * sizeRatio) - 10, context.canvas.height - Math.floor(172 * sizeRatio) - 10, Math.floor(179 * sizeRatio), Math.floor(172 * sizeRatio));
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
        update(state) {
            this._state = Object.assign({}, state);
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
                context.save();
                context.drawImage(this._image, x + 1, y + 1, clipWidth - 10, clipHeight - 10, 10, context.canvas.height - 10 - Math.floor(spriteHeight * sizeRatio), Math.floor(spriteWidth * sizeRatio), Math.floor(spriteHeight * sizeRatio));
                context.restore();
            }
            this._elapsed += elapsed;
        }
    }

    class SurprizeBlock {
        constructor() {
            this._state = { "elapsed": 0 };
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
                    if (data[i] === 50 && data[i + 1] === 97 && data[i + 2] === 168) {
                        data[i + 3] = 0; // alpha
                    }
                }
                bufferContext.save();
                bufferContext.clearRect(0, 0, imageLoader.width, imageLoader.width);
                bufferContext.putImageData(imageData, 0, 0);
                var newImage = document.createElement("img");
                newImage.src = buffer.toDataURL("image/png");
                var colCount = 16;
                this._state = Object.assign(this._state, {
                    "image": newImage,
                    "spriteWidth": imageLoader.width / colCount,
                    "spriteHeight": Math.floor(imageLoader.height / 3),
                    "colCount": colCount
                })
            });
            imageLoader.src = "./images/surprizeblock.png";
            this._state = Object.assign(this._state, {
                "frameCount": 16,
                "fps": 40,
                "timePerFrame": 1000 / 40,
                "elapsed": 0,
                "currentFrame": 0
            })
        }
        update(update, elapsed) {
            if (this._state.image) {

                var row = Math.floor(this._state.currentFrame / this._state.colCount);
                var col = (this._state.currentFrame - (row * this._state.colCount));
                var centerX = context.canvas.width / 2;
                var centerY = context.canvas.height / 2;

                var updateState = {
                    "currentFrame": Math.floor((this._state.elapsed / this._state.timePerFrame) % this._state.frameCount),
                    "originalSizeRatio": Math.max((context.canvas.height) / this._state.image.height, 1),
                    "sizeRatio": this._state.sizeRatio || Math.max((context.canvas.height) / this._state.image.height, 1),
                    "spriteX": col * this._state.spriteWidth,
                    "spriteY": row * this._state.spriteHeight,
                    "clipWidth": this._state.spriteWidth,
                    "clipHeight": this._state.spriteHeight,
                    "posX": this._state.posX || centerX - (this._state.spriteWidth * this._state.sizeRatio) / 2,
                    "posY": this._state.posY || centerY - (this._state.spriteHeight * this._state.sizeRatio) / 2
                }
                // to mouse down
                if (!this._state.mousedown && update.mousedown) {
                    console.log("mousedown");
                    var sizeAnimation = {
                        "startTime": this._state.elapsed,
                        "duration": 125,
                        "targetProps": "sizeRatio",
                        "startValue": this._state.sizeRatio,
                        "endValue": this._state.originalSizeRatio * 0.8,
                        "easingFunction": "linearTween"
                    };
                    var posXAnimation = {
                        "startTime": this._state.elapsed,
                        "duration": 125,
                        "targetProps": "posX",
                        "startValue": this._state.posX,
                        "endValue": centerX - (this._state.spriteWidth * this._state.originalSizeRatio * 0.8) / 2,
                        "easingFunction": "linearTween"
                    };
                    var posYAnimation = {
                        "startTime": this._state.elapsed,
                        "duration": 125,
                        "targetProps": "posY",
                        "startValue": this._state.posY,
                        "endValue": centerY - (this._state.spriteHeight * this._state.originalSizeRatio * 0.8) / 2,
                        "easingFunction": "linearTween"
                    };
                    updateState.animations = [sizeAnimation, posXAnimation, posYAnimation];
                }
                // from mouse down
                if (this._state.mousedown && update.mouseup) {
                    console.log("mouseup");
                    var sizeAnimation = {
                        "startTime": this._state.elapsed,
                        "duration": 125,
                        "targetProps": "sizeRatio",
                        "startValue": this._state.sizeRatio,
                        "endValue": this._state.originalSizeRatio,
                        "easingFunction": "linearTween"
                    };
                    var posXAnimation = {
                        "startTime": this._state.elapsed,
                        "duration": 125,
                        "targetProps": "posX",
                        "startValue": this._state.posX,
                        "endValue": centerX - (this._state.spriteWidth * this._state.originalSizeRatio) / 2,
                        "easingFunction": "linearTween"
                    };
                    var posYAnimation = {
                        "startTime": this._state.elapsed,
                        "duration": 125,
                        "targetProps": "posY",
                        "startValue": this._state.posY,
                        "endValue": centerY - (this._state.spriteHeight * this._state.originalSizeRatio) / 2,
                        "easingFunction": "linearTween"
                    };
                    updateState.animations = [sizeAnimation, posXAnimation, posYAnimation];
                }
            }
            var animationUpdates = animate(this._state, elapsed);
            this._state = Object.assign({}, this._state, updateState, animationUpdates ? animationUpdates : {}, update);
            this._state.elapsed += elapsed;
        }
        draw(context) {
            if (this._state.image) {
                context.save();
                // console.log(`${this._state.clipWidth}, ${this._state.clipHeight}, ${this._state.posX}, ${this._state.posY}, ${Math.floor(this._state.spriteWidth * this._state.sizeRatio)}, ${Math.floor(this._state.spriteHeight * this._state.sizeRatio)}`);
                context.drawImage(this._state.image, this._state.spriteX, this._state.spriteY, this._state.clipWidth, this._state.clipHeight, this._state.posX, this._state.posY, Math.floor(this._state.spriteWidth * this._state.sizeRatio), Math.floor(this._state.spriteHeight * this._state.sizeRatio));
                context.restore();
            }
        }
    }

    var piranhaPlantSheet = new PiranhaPlantSheet();
    var koopaSpriteSheet = new KoopaSpriteSheet();
    var surprizeblocks = new SurprizeBlock();

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
                var targetWidth = Math.min(context.canvas.width / 1.5, this._image.width / 1.5);
                var x = (context.canvas.width / 2) - targetWidth / 2;
                var y = 25;
                context.save();
                context.drawImage(this._image, 0, 0, this._image.width, this._image.height, x, y, targetWidth, this._image.height * (targetWidth / this._image.width));
                context.restore();
            }
            context.restore();
        }
    }

    var state = {};
    var canvas = document.getElementById("drawboard");
    var context = canvas.getContext("2d");
    var bufferCanvas = document.createElement("canvas");
    var bufferCanvasCtx = bufferCanvas.getContext("2d");

    bufferCanvasCtx.canvas.width = context.canvas.width;
    bufferCanvasCtx.canvas.height = context.canvas.height;

    var currentFrame = 0;
    var elapsed = 0;
    var lastTime = new Date().getTime();
    var currentTime = 0;

    var background = new Background();

    var draw = function (elapsed) {
        currentTime = new Date().getTime();
        elapsed = currentTime - lastTime;
        currentFrame++;
        context.save();
        background.draw(bufferCanvasCtx, elapsed);

        koopaSpriteSheet.draw(bufferCanvasCtx, elapsed);
        piranhaPlantSheet.draw(bufferCanvasCtx, elapsed);
        surprizeblocks.draw(bufferCanvasCtx, elapsed);

        context.drawImage(bufferCanvas, 0, 0, bufferCanvas.width, bufferCanvas.height);
        context.restore();
    }
    var update = function () {
        currentTime = new Date().getTime();
        elapsed = currentTime - lastTime;
        koopaSpriteSheet.update(state);
        piranhaPlantSheet.update(state);
        surprizeblocks.update(state, elapsed);
        draw(currentFrame, elapsed)
        window.requestAnimationFrame(update);
        lastTime = currentTime;
    }
    var resize = function () {
        bufferCanvas.width = canvas.width = window.innerWidth;
        bufferCanvas.height = canvas.height = window.innerHeight;
    }
    function handleMouseDown(evt) {
        state = Object.assign({}, state, { "mousedown": evt, "mouseup": null });
    }
    function handleMouseUp(evt) {
        state = Object.assign({}, state, { "mousedown": null, "mouseup": evt });
    }
    window.addEventListener("resize", resize, false);
    window.addEventListener("mousedown", handleMouseDown, false);
    window.addEventListener("mouseup", handleMouseUp, false);
    resize();
    update();
})();