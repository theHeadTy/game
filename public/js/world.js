webpackJsonp([2],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rectangle__ = __webpack_require__(106);
//import * as jTiled from './maps/map1.json';

//import {Tile} from './tilemap/tile'
//let Tiled = (<any>jTiled);
class Camera {
    constructor(map) {
        this.map = map;
        this.x = 0;
        this.y = 0;
        this.width = map.canvas.width;
        this.height = map.canvas.height;
        this.max = {
            x: map.tileset.image.width - this.width,
            y: map.tileset.image.height - this.height
        };
        this.follow = false;
        // Viewport Rectangle (canvas sized)
        this.viewRect = new __WEBPACK_IMPORTED_MODULE_0__rectangle__["a" /* Rectangle */]({
            left: this.x, top: this.y,
            width: this.width, height: this.height
        });
        // Map Rectangle (full sized)
        this.mapRect = new __WEBPACK_IMPORTED_MODULE_0__rectangle__["a" /* Rectangle */]({
            left: 0, top: 0,
            width: map.tileset.image.width, height: map.tileset.image.height
        });
        //this.buildTileset();
        //this.cull();
    }
    startFollow(player) {
        this.follow = player;
        this.screen = { x: this.width / 2, y: this.height / 2 };
    }
    update() {
        if (this.follow.x - this.x + this.screen.x > this.width) {
            this.x = this.follow.x - (this.width - this.screen.x);
        }
        else if (this.follow.x - this.screen.x < this.x) {
            this.x = this.follow.x - this.screen.x;
        }
        if (this.follow.y - this.y + this.screen.y > this.height) {
            this.y = this.follow.y - (this.height - this.screen.y);
        }
        else if (this.follow.y - this.screen.y < this.y) {
            this.y = this.follow.y - this.screen.y;
        }
        this.viewRect.set(this.x, this.y);
        if (!this.viewRect.within(this.mapRect)) {
            if (this.viewRect.left < this.mapRect.left) {
                this.x = this.mapRect.left;
            }
            if (this.viewRect.top < this.mapRect.top) {
                this.y = this.mapRect.top;
            }
            if (this.viewRect.right > this.mapRect.right) {
                this.x = this.mapRect.right - this.width;
            }
            if (this.viewRect.bottom > this.mapRect.bottom) {
                this.y = this.mapRect.bottom - this.height;
            }
        }
        //this.cull();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Camera;



/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * World Rectangle
 *
 * @class Rectangle
 * @implements RectangleInterface
 */
class Rectangle {
    constructor(config) {
        this.left = config.left;
        this.top = config.top;
        this.width = config.width;
        this.height = config.height;
        this.right = (this.left + this.width);
        this.bottom = (this.top + this.height);
    }
    set(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width || this.width;
        this.height = height || this.height;
        this.right = (this.left + this.width);
        this.bottom = (this.top + this.height);
    }
    within(rect) {
        return (rect.left <= this.left &&
            rect.right >= this.right &&
            rect.top <= this.top &&
            rect.bottom >= this.bottom);
    }
    offset(rect, left, top) {
        rect.left += left;
        rect.top += top;
        return rect;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Rectangle;



/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);

;
;
;
let defaultKeyboardSettings = {
    keys: {
        LEFT: {
            code: 37,
            action: 'move -1 0'
        },
        RIGHT: {
            code: 39,
            action: 'move 1 0'
        },
        UP: {
            code: 38,
            action: 'move 0 -1'
        },
        DOWN: {
            code: 40,
            action: 'move 0 1'
        }
    }
};
class Keyboard {
    constructor(settings = defaultKeyboardSettings) {
        this.keys = settings.keys;
        this.setCodes();
        this.listenForEvents();
    }
    setCodes() {
        let codes = {};
        __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](this.keys, (metadata, name) => {
            codes[this.keys[name].code] = name;
        });
        this.codes = codes;
    }
    listenForEvents() {
        window.addEventListener('keydown', this._onKeyDown.bind(this));
        window.addEventListener('keyup', this._onKeyUp.bind(this));
        __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](this.keys, (metadata, name) => {
            this.keys[name].isDown = false;
        });
    }
    _onKeyDown(event) {
        let keyCode = event.keyCode;
        if (this.codes[keyCode]) {
            event.preventDefault();
            this.keys[this.codes[keyCode]].isDown = true;
        }
        ;
    }
    _onKeyUp(event) {
        let keyCode = event.keyCode;
        if (this.codes[keyCode]) {
            event.preventDefault();
            this.keys[this.codes[keyCode]].isDown = false;
        }
        ;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Keyboard;



/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Canvas {
    /**
     * Canvas Constructor -
     * Creates the canvas -
     * Sets context, width & height
     */
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.canvas.addEventListener('mousedown', onmousedown, false);
        this.ctx = this.getContext();
        this.width = width || this.canvas.width;
        this.height = height || this.canvas.height;
        this.bufferCanvas = document.createElement('canvas');
        this.bufferCtx = this.bufferCanvas.getContext('2d');
        this.cloneCanvas = this.canvas;
    }
    // Unneccessary?
    getContext() {
        let canvas = this.canvas;
        return canvas.getContext('2d');
    }
    /**
     * Clear Canvas
     * @return void
     */
    clear() {
        this.resetTransform();
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    /**
     * Reset Transofrmation matrix.
     * @return void
     */
    resetTransform() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    static snapshot(canvas) {
        let image = new Image();
        image.src = canvas.toDataURL();
        return image;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Canvas;



/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(86);


/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(Promise, $) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__world_index__ = __webpack_require__(87);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



let keyboard = new __WEBPACK_IMPORTED_MODULE_2__world_index__["c" /* Keyboard */](), moving = false, elapsed = 0, drawPending = false, startTime = -1, progress = 0, animLength = 2000, map = new __WEBPACK_IMPORTED_MODULE_2__world_index__["b" /* Draw */].Map(), camera = new __WEBPACK_IMPORTED_MODULE_2__world_index__["a" /* Camera */](map), player = new __WEBPACK_IMPORTED_MODULE_2__world_index__["b" /* Draw */].Player(map);
camera.startFollow(player);
function draw() {
    drawPending = false;
    requestDraw();
}
function requestDraw() {
    if (!drawPending) {
        drawPending = true;
        requestAnimationFrame(loop);
    }
}
// Game Loop
// @todo - add a render & update function to keep logic seperated.
function loop(timestamp) {
    let delta = (timestamp - elapsed) / 1000;
    delta = __WEBPACK_IMPORTED_MODULE_0_lodash__["min"]([delta, .25]);
    elapsed = timestamp;
    //progress = 0;
    if (startTime < 0) {
        startTime = timestamp;
    }
    else {
        progress = timestamp - startTime;
    }
    draw();
    __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](keyboard.keys, (key) => {
        if (key.isDown) {
            let [action, ...params] = key.action.split(' ');
            if (action == 'move') {
                let [deltaX, deltaY] = __WEBPACK_IMPORTED_MODULE_0_lodash__["map"](params, __WEBPACK_IMPORTED_MODULE_0_lodash__["toInteger"]);
                player.move(delta, deltaX, deltaY);
                update();
                render();
                getNewMobs();
            }
        }
    });
}
function update() {
    camera.update();
}
function render() {
    map.draw(0, camera);
    map.drawPlayer(camera, player);
    map.drawPath();
}
function getNewMobs() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield findMobs();
            $('#mobs').html(data);
        }
        catch (err) {
            console.log(err);
        }
    });
}
function findMobs() {
    let x = __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](player.x / 32), y = __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](player.y / 32), url = `/mobs/x/${y}/y/${x}`;
    return new Promise((resolve) => {
        let data = __WEBPACK_IMPORTED_MODULE_1_axios___default.a.get(url).then((response) => {
            return response.data;
        });
        resolve(data);
    }).then((val) => {
        return val;
    });
}
function start() {
    map.clickEventOn();
    /* Draw Game */
    __WEBPACK_IMPORTED_MODULE_0_lodash__["delay"](() => {
        render();
        draw();
        getNewMobs();
    }, 10);
}
window.onload = () => {
    start();
};

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1), __webpack_require__(7)))

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__draw__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__camera__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__keyboard__ = __webpack_require__(16);
/* unused harmony reexport Canvas */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__draw__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__camera__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__keyboard__["a"]; });







/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Draw; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__maps_map1_json__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__maps_map1_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__maps_map1_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__canvas__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_pathfinding__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_pathfinding___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_pathfinding__);




// Tiled json
let Tiled = __WEBPACK_IMPORTED_MODULE_1__maps_map1_json__;
// Canvas
let mapCanvas = document.getElementById('map');
let canvas = new __WEBPACK_IMPORTED_MODULE_2__canvas__["a" /* Canvas */](mapCanvas);
var Draw;
(function (Draw) {
    /*interface SpritesheetInterface {
      [tile: number]: {
        x: number;
        y: number;
      }
    }
    */
    class Spritesheet {
        set() {
            this.sprite = [];
            let layers = Tiled.layers[0].data, row = 0, col = 0;
            __WEBPACK_IMPORTED_MODULE_0_lodash__["times"](16, (row) => {
                __WEBPACK_IMPORTED_MODULE_0_lodash__["times"](16, (col) => {
                    this.sprite.push({
                        x: __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](row % 16) * 32,
                        y: __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](col / 16) * 32
                    });
                });
            });
        }
    }
    Draw.Spritesheet = Spritesheet;
    class Player {
        constructor(map) {
            this.map = map;
            this.width = 20;
            this.height = 20;
            this.middle = {
                x: (map.canvas.width / 2) - (this.width / 2),
                y: (map.canvas.height / 2) - (this.height / 2)
            };
            this.x = this.middle.x;
            this.y = this.middle.y;
            this.max = {
                x: map.tileset.image.width - (this.width / 2),
                y: map.tileset.image.height - (this.height / 2),
            };
            this.min = { x: (this.width / 2), y: (this.height / 2) };
            this.speed = 256;
            this.canvas = document.getElementById('player');
            this.ctx = this.canvas.getContext('2d');
            //this.dirty = false;
            this.dirtyArr = [];
        }
        /**
         * Get the x coordinate tile node the player is located in.
         * @return {number}
         */
        get nodeX() {
            return this.x / this.map.tileset.tile.width;
        }
        /**
         * Get the x coordinate tile node the player is located in.
         * @return {number}
         */
        get nodeY() {
            return this.y / this.map.tileset.tile.height;
        }
        /**
         * Move position on map.
         * @param {number} step
         * @param {number} x
         * @param {number} y
         * @return void
         */
        move(step, x, y) {
            let pathCanvas = document.getElementById('path'), pathCtx = pathCanvas.getContext('2d');
            pathCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.x += x * this.speed * step;
            this.y += y * this.speed * step;
            this.x = __WEBPACK_IMPORTED_MODULE_0_lodash__["clamp"](this.x, this.min.x, this.max.x);
            this.y = __WEBPACK_IMPORTED_MODULE_0_lodash__["clamp"](this.y, this.min.y, this.max.y);
            //axios.get(`/mobs/x/${_.floor(this.x / 32)}/y/${_.floor(this.y / 32)}`).then((response: any) => {
            //    $('#mobs').html(response.data);
            //  });
            //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    Draw.Player = Player;
    class Tileset {
        get tileset() {
            let tiled = Tiled.tilesets[0];
            return {
                image: {
                    image: tiled.image,
                    width: tiled.imagewidth,
                    height: tiled.imageheight
                },
                tile: {
                    width: tiled.tilewidth,
                    height: tiled.tileheight,
                    count: tiled.tilewidth
                },
                columns: tiled.columns,
                layers: Tiled.layers[0].data
            };
        }
    }
    class Map {
        constructor() {
            // Canvas
            this.canvas = canvas;
            this.ctx = canvas.ctx;
            // Tileset
            this.tileset = new Tileset().tileset;
            this.loadImage();
            this.player;
            this.path = null;
            this.grid = null;
            this.mobs = [];
        }
        buildMap() {
            let node = [], mob = [];
            __WEBPACK_IMPORTED_MODULE_0_lodash__["times"](this.tileset.columns, (row) => {
                node[row] = [];
                __WEBPACK_IMPORTED_MODULE_0_lodash__["times"](this.tileset.columns, (col) => {
                    node[row][col] = this.tileset.layers[row * 16 + col];
                });
            });
            this.node = node;
            return this.node;
        }
        /**
         * Click Event for canvas (for pathfinding)
         * Currently using the 'stage' div which is wrapped
         * around the canvas.
         *
         * @param {MouseEvent} event
         * @return {x y} - End pathfinding coordinates.
         */
        canvasClick(event) {
            let canEvent = document.getElementById('path');
            let x = event.x;
            let y = event.y;
            x = __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](x / 32);
            y = __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](y / 32);
            x -= canEvent.offsetLeft;
            y -= canEvent.offsetTop;
            this.path = { x: x, y: y };
            this.drawPath();
        }
        canvasClear() {
            let can = document.getElementById('path'), cctx = can.getContext('2d');
            cctx.clearRect(0, 0, 350, 350);
        }
        clickEventOn() {
            document.getElementById('stage').addEventListener('click', this.canvasClick.bind(this), false);
            document.getElementById('stage').addEventListener('mouseup', this.canvasClear.bind(this), false);
        }
        loadImage() {
            new Promise((resolve, reject) => {
                let image = new Image();
                image.onload = () => {
                    resolve(image);
                };
                image.onerror = (err) => {
                    reject(err);
                };
                image.src = this.tileset.image.image;
                this.image = image;
            });
        }
        draw(layer, camera) {
            this.canvas.clear();
            let layers = Tiled.layers[layer].data, imagewidth = this.tileset.image.width, imageheight = this.tileset.image.height, tilewidth = this.tileset.tile.width, tileheight = this.tileset.tile.height, columns = this.tileset.columns, offset = -1, startX = __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](camera.x / tilewidth), startY = __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](camera.y / tilewidth), endX = __WEBPACK_IMPORTED_MODULE_0_lodash__["ceil"](startX + (camera.width / tilewidth)) >> 0, endY = __WEBPACK_IMPORTED_MODULE_0_lodash__["ceil"](startY + (camera.height / tileheight)) >> 0;
            endX = __WEBPACK_IMPORTED_MODULE_0_lodash__["clamp"](endX, 0, columns - 1);
            endY = __WEBPACK_IMPORTED_MODULE_0_lodash__["clamp"](endY, 0, columns - 1);
            __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](__WEBPACK_IMPORTED_MODULE_0_lodash__["range"](startX, endX + 1), (row) => {
                __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](__WEBPACK_IMPORTED_MODULE_0_lodash__["range"](startY, endY + 1), (col) => {
                    let tileId = layers[row + 16 * col] + -1;
                    let sourceX = __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](tileId % 16) * tilewidth;
                    let sourceY = __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](tileId / 16) * tileheight;
                    let destX = row * tilewidth, destY = col * tileheight;
                    this.ctx.save();
                    this.ctx.translate(__WEBPACK_IMPORTED_MODULE_0_lodash__["round"](-camera.x), __WEBPACK_IMPORTED_MODULE_0_lodash__["round"](-camera.y));
                    this.ctx.drawImage(this.image, __WEBPACK_IMPORTED_MODULE_0_lodash__["round"](sourceX), __WEBPACK_IMPORTED_MODULE_0_lodash__["round"](sourceY), 32, 32, __WEBPACK_IMPORTED_MODULE_0_lodash__["round"](destX), __WEBPACK_IMPORTED_MODULE_0_lodash__["round"](destY), 32, 32);
                    this.ctx.restore();
                });
            });
        }
        drawPlayer(camera, player) {
            //this.mobs = [];
            this.player = player;
            this.camera = camera;
            let screenX = this.player.x - camera.x - (20 / 2), screenY = this.player.y - camera.y - (20 / 2);
            screenX = __WEBPACK_IMPORTED_MODULE_0_lodash__["round"](screenX);
            screenY = __WEBPACK_IMPORTED_MODULE_0_lodash__["round"](screenY);
            let testCanvas = document.createElement('canvas'), testCtx = testCanvas.getContext('2d');
            player.ctx.clearRect(0, 0, player.canvas.width, player.canvas.height);
            player.ctx.fillStyle = 'red';
            player.ctx.fillRect(screenX, screenY, player.width, player.height);
            document.getElementById('coords').innerHTML = `
        x: ${__WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](player.x / 32)}
        y: ${__WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](player.y / 32)}
      `;
            // _.times(this.mobs.length, (index: number) => {
            //      if (this.mobs[index].x === _.floor(player.x / 32) && this.mobs[index].y === _.floor(player.y / 32)) {
            //          document.getElementById('mobs').innerHTML = this.mobs[index].name;
            //      }
            // });
            //let snapshot = Canvas.snapshot(player.canvas);
        }
        drawPath() {
            if (!this.path) {
                return;
            }
            let pathCanvas = document.getElementById('path'), pathCtx = pathCanvas.getContext('2d');
            pathCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            let endX = this.path.x, endY = this.path.y, startX = __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](this.player.x / 32), startY = __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](this.player.y / 32), sprite, src = 'http://buildnewgames.com/assets/article//astar/spritesheet.png', tile, sx, sy, dx, dy;
            let grid = new __WEBPACK_IMPORTED_MODULE_3_pathfinding__["Grid"](16, 16), gridBackup = grid.clone(), finder = new __WEBPACK_IMPORTED_MODULE_3_pathfinding__["AStarFinder"](), path = finder.findPath(startX, startY, endX, endY, grid);
            console.log(this.path);
            new Promise((resolve, reject) => {
                let image = new Image();
                image.onload = () => {
                    resolve(image);
                };
                image.src = src;
                sprite = image;
            });
            let cameraW = this.camera.width, cameraH = this.camera.height, cameraX = this.camera.x, cameraY = this.camera.y;
            //let pCanvas = <HTMLCanvasElement>document.createElement('canvas'),
            //  pctx = pCanvas.getContext('2d');
            __WEBPACK_IMPORTED_MODULE_0_lodash__["times"](path.length, (index) => {
                tile = (index === 0) ? 2 : ((index === path.length - 1) ? 3 : 4);
                sx = tile * 32;
                sy = 0;
                //let offsetX = _.round(endX + (-startX / 32));
                //let offsetY = _.round(endY + (-startY / 32));
                let offsetX = __WEBPACK_IMPORTED_MODULE_0_lodash__["round"](-cameraX / 32);
                let offsetY = __WEBPACK_IMPORTED_MODULE_0_lodash__["round"](-cameraY / 32);
                dx = __WEBPACK_IMPORTED_MODULE_0_lodash__["round"](path[index][0] * 32); //-this.player.x / 32);
                dy = __WEBPACK_IMPORTED_MODULE_0_lodash__["round"](path[index][1] * 32); //-this.player.y / 32)
                //(-this.camera.y / 32);
                pathCtx.drawImage(sprite, sx, sy, 32, 32, dx, dy, 32, 32);
            });
            this.path = null;
        }
    }
    Draw.Map = Map;
})(Draw || (Draw = {}));

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),

/***/ 89:
/***/ (function(module, exports) {

module.exports = {
	"height": 16,
	"layers": [
		{
			"data": [
				49,
				50,
				51,
				1,
				1,
				2,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				65,
				66,
				67,
				1,
				1,
				3,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				81,
				82,
				83,
				1,
				3,
				20,
				20,
				20,
				20,
				20,
				36,
				37,
				18,
				6,
				7,
				8,
				1,
				1,
				1,
				3,
				20,
				20,
				20,
				20,
				20,
				20,
				49,
				18,
				51,
				22,
				23,
				24,
				1,
				1,
				3,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				65,
				66,
				67,
				38,
				39,
				40,
				1,
				3,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				81,
				82,
				83,
				4,
				4,
				4,
				3,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				19,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				19,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				19,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				20,
				5,
				19,
				20,
				21,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				3,
				20,
				20,
				20,
				21,
				19,
				20,
				21,
				1,
				33,
				1,
				6,
				7,
				8,
				1,
				33,
				19,
				20,
				20,
				20,
				21,
				19,
				20,
				21,
				1,
				1,
				1,
				22,
				23,
				24,
				1,
				1,
				19,
				20,
				20,
				20,
				21,
				19,
				20,
				21,
				49,
				50,
				51,
				38,
				39,
				40,
				49,
				50,
				19,
				20,
				20,
				20,
				21,
				19,
				20,
				21,
				65,
				66,
				67,
				1,
				1,
				1,
				65,
				66,
				35,
				20,
				20,
				20,
				21,
				35,
				36,
				37,
				81,
				82,
				83,
				1,
				1,
				1,
				81,
				82,
				83,
				35,
				36,
				36,
				37
			],
			"height": 16,
			"name": "Tile Layer 1",
			"opacity": 1,
			"type": "tilelayer",
			"visible": true,
			"width": 16,
			"x": 0,
			"y": 0
		},
		{
			"data": [
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				190,
				191,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				205,
				206,
				207,
				208,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				221,
				222,
				223,
				224,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				237,
				238,
				239,
				240,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				253,
				254,
				255,
				256,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				62,
				63,
				64,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				78,
				79,
				80,
				0,
				62,
				63,
				64,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				94,
				95,
				96,
				0,
				78,
				79,
				80,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				94,
				95,
				96,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			],
			"height": 16,
			"name": "Tile Layer 2",
			"opacity": 1,
			"type": "tilelayer",
			"visible": true,
			"width": 16,
			"x": 0,
			"y": 0
		}
	],
	"nextobjectid": 1,
	"orientation": "orthogonal",
	"renderorder": "right-down",
	"tiledversion": "1.0.2",
	"tileheight": 32,
	"tilesets": [
		{
			"columns": 16,
			"firstgid": 1,
			"image": "http://i.imgur.com/PkEst9w.png",
			"imageheight": 512,
			"imagewidth": 512,
			"margin": 0,
			"name": "wood_tileset",
			"spacing": 0,
			"tilecount": 256,
			"tileheight": 32,
			"tilewidth": 32,
			"transparentcolor": "#000000"
		}
	],
	"tilewidth": 32,
	"type": "map",
	"version": 1,
	"width": 16
};

/***/ })

},[85]);