webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(2);
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
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_laravel_echo__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_laravel_echo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_laravel_echo__);

window._ = __webpack_require__(2);

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
  window.$ = __webpack_provided_window_dot_jQuery = __webpack_require__(4);

  __webpack_require__(17);
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = __webpack_require__(6);

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

var token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */



window.Pusher = __webpack_require__(24);

window.Echo = new __WEBPACK_IMPORTED_MODULE_0_laravel_echo___default.a({
  broadcaster: 'pusher',
  key: '6e9c65913659d602f052',
  encrypted: true,
  cluster: 'mt1'
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)))

/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30);
module.exports = __webpack_require__(62);


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bootstrap__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Map_vue__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Map_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Map_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Mobs_vue__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Mobs_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Mobs_vue__);
/**
 * App - Main vue instance
 */



//Vue.component('world-map', require('./components/Map.vue'))




//Vue.component('world-mobs', require('./components/Mobs.vue'))

var app = new __WEBPACK_IMPORTED_MODULE_1_vue___default.a({
  el: '#app',

  components: {
    'world-map': __WEBPACK_IMPORTED_MODULE_2__components_Map_vue___default.a,
    'world-mobs': __WEBPACK_IMPORTED_MODULE_3__components_Mobs_vue___default.a
  },

  data: {
    mobs: null

  },

  methods: {
    sendMobs: function sendMobs(mobs) {
      this.mobs = mobs;
    }
  },

  created: function created() {
    /* Websocket */
    //Echo.join('mobs').listen('Mobs', (e) => {
    //  this.mobs = e.mobs;
    //});
  }
});

/***/ }),
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(26)(
  /* script */
  __webpack_require__(51),
  /* template */
  __webpack_require__(58),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/vagrant/Code/game/resources/assets/js/components/Map.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Map.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3a16fb86", Component.options)
  } else {
    hotAPI.reload("data-v-3a16fb86", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world_keyboard__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__world_canvas__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__world_render__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__world_player__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__world_camera__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__world_mobs__ = __webpack_require__(57);

/* @todo - add these to a global export file */






/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'world-map',
    props: ['all-mobs', 'world'],
    data() {
        return {
            x: null,
            y: null,
            render: null,
            camera: null,
            player: null,
            canvasPool: null,
            elapsed: 0,
            delta: 0,
        };
    },
    computed: {
        keyboard() {
            return new __WEBPACK_IMPORTED_MODULE_1__world_keyboard__["a" /* Keyboard */]();
        },
        mobData() {
            return new __WEBPACK_IMPORTED_MODULE_6__world_mobs__["a" /* Mob */](this.allMobs);
        }
    },
    methods: {
        mobs() {
            this.$emit('send', this.mobData.inRoom(this.x, this.y));
        },
        update() {
            this.camera.update();
            this.x = this.player.nodeX;
            this.y = this.player.nodeY;
            this.mobs();
        },
        draw() {
            __WEBPACK_IMPORTED_MODULE_2__world_canvas__["a" /* Canvas */].clearWorld(this.canvasPool);
            this.render.map();
            this.render.player(this.player);
        },
        loop(time) {
            requestAnimationFrame(this.loop);
            this.delta = (time - this.elapsed) / 1000;
            this.delta = __WEBPACK_IMPORTED_MODULE_0_lodash__["min"]([this.delta, .25]);
            this.elapsed = time;
            __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](this.keyboard.keys, (key) => {
                if (key.isDown) {
                    let [action, ...params] = key.action.split(' ');
                    if (action === 'move') {
                        let [deltaX, deltaY] = __WEBPACK_IMPORTED_MODULE_0_lodash__["map"](params, __WEBPACK_IMPORTED_MODULE_0_lodash__["toInteger"]);
                        this.player.update(this.delta, deltaX, deltaY);
                    }
                }
            });
            this.update();
            this.draw();
        },
        init() {
            this.update();
            this.draw();
            requestAnimationFrame(this.loop);
        }
    },
    mounted() {
        const mapCanvas = this.$refs.map;
        const mapCtx = mapCanvas.getContext('2d');
        const playerCanvas = this.$refs.player;
        const playerCtx = playerCanvas.getContext('2d');
        /* Add Canvas Pool to vue data */
        let canvasPool = {
            canvas: {
                map: mapCanvas,
                player: playerCanvas
            },
            ctx: {
                map: mapCtx,
                player: playerCtx
            }
        };
        this.canvasPool = canvasPool;
        /* Create new Render instance. */
        let renderConfig = {
            canvas: canvasPool.canvas.map,
            ctx: canvasPool.ctx.map,
        };
        this.render = new __WEBPACK_IMPORTED_MODULE_3__world_render__["a" /* Render */](renderConfig, this.world);
        let cameraConfig = {
            width: canvasPool.canvas.map.width,
            height: canvasPool.canvas.map.height,
            mapWidth: this.world.width * this.world.tilewidth,
            mapHeight: this.world.height * this.world.tileheight
        };
        this.camera = new __WEBPACK_IMPORTED_MODULE_5__world_camera__["a" /* Camera */](cameraConfig);
        this.render.setCamera(this.camera);
        /* Create new Player instance. */
        let playerConfig = {
            map: {
                width: this.world.tilesets[0].imagewidth,
                height: this.world.tilesets[0].imageheight,
            },
            canvas: new __WEBPACK_IMPORTED_MODULE_2__world_canvas__["a" /* Canvas */](canvasPool.canvas.player, canvasPool.ctx.player)
        };
        this.player = new __WEBPACK_IMPORTED_MODULE_4__world_player__["a" /* Player */](playerConfig);
        this.camera.start(this.player);
        this.camera.update();
        let mobData = new __WEBPACK_IMPORTED_MODULE_6__world_mobs__["a" /* Mob */](this.allMobs);
        console.log(mobData.nmobs);
        /* Start the game */
        this.init();
    },
});


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Canvas {
    constructor(canvas, context, width, height) {
        this.canvas = canvas;
        this.ctx = context;
        this.width = width || canvas.width;
        this.height = height || canvas.height;
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    static clearWorld(pool) {
        let mapWidth = pool.canvas.map.width, mapHeight = pool.canvas.map.height, playerWidth = pool.canvas.player.width, playerHeight = pool.canvas.player.height;
        pool.ctx.map.clearRect(0, 0, mapWidth, mapHeight);
        pool.ctx.player.clearRect(0, 0, playerWidth, playerHeight);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Canvas;



/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);

class Render {
    constructor(canvas, tiled) {
        this.canvas = canvas.canvas;
        this.ctx = canvas.ctx;
        this.tiled = tiled;
        this.loadImage();
        this.clone = null;
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
            image.src = this.tiled.tilesets[0].image;
            this.image = image;
            this.loaded = true;
        });
    }
    setCamera(camera) {
        this.camera = camera;
    }
    map() {
        let ctx = this.ctx, offset = -1, layer = this.tiled.layers[0].data, firstgid = 1;
        __WEBPACK_IMPORTED_MODULE_0_lodash__["times"](16, (r) => {
            __WEBPACK_IMPORTED_MODULE_0_lodash__["times"](16, (c) => {
                let tile = layer[r + 16 * c] - firstgid, sourceX = __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](tile % 16) * 32, sourceY = __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](tile / 16) * 32, x = __WEBPACK_IMPORTED_MODULE_0_lodash__["multiply"](r, 32), y = __WEBPACK_IMPORTED_MODULE_0_lodash__["multiply"](c, 32);
                this.ctx.save();
                this.ctx.translate(__WEBPACK_IMPORTED_MODULE_0_lodash__["round"](-this.camera.x), __WEBPACK_IMPORTED_MODULE_0_lodash__["round"](-this.camera.y));
                this.ctx.drawImage(this.image, sourceX, sourceY, 32, 32, x, y, 32, 32);
                this.ctx.restore();
            });
        });
    }
    player(player) {
        let ctx = player.canvas.ctx, screenX = player.x - this.camera.x - (player.width / 2), screenY = player.y - this.camera.y - (player.height / 2);
        ctx.fillStyle = 'red';
        ctx.fillRect(screenX, screenY, player.width, player.height);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Render;



/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);

class Player {
    constructor(config) {
        this.x = 0;
        this.y = 0;
        this.width = config.width || 20;
        this.height = config.height || 20;
        this.map = { width: config.map.width, height: config.map.height };
        this.canvas = config.canvas;
        this.config();
    }
    config() {
        this.min = { x: this.width / 2, y: this.height / 2 };
        this.max = {
            x: this.map.width - this.min.x,
            y: this.map.height - this.min.y
        };
        this.middle = {
            x: (this.canvas.width / 2) - this.min.x,
            y: (this.canvas.height / 2) - this.min.y
        };
        this.x = this.middle.x;
        this.y = this.middle.y;
        this.speed = 256;
        /* Tile Properties */
        this.tileWidth = 32;
        this.tileHeight = 32;
    }
    update(step, stepX, stepY) {
        this.x += stepX * this.speed * step;
        this.y += stepY * this.speed * step;
        this.x = __WEBPACK_IMPORTED_MODULE_0_lodash__["clamp"](this.x, this.min.x, this.max.x);
        this.y = __WEBPACK_IMPORTED_MODULE_0_lodash__["clamp"](this.y, this.min.y, this.max.y);
    }
    get nodeX() {
        return __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](this.x / this.tileWidth);
    }
    get nodeY() {
        return __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](this.y / this.tileHeight);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;



/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rectangle__ = __webpack_require__(56);

class Camera {
    constructor(settings) {
        this.x = 0;
        this.y = 0;
        this.width = settings.width;
        this.height = settings.height;
        this.mapWidth = settings.mapWidth;
        this.mapHeight = settings.mapHeight;
        this.max = {
            x: this.mapWidth - this.width,
            y: this.mapHeight - this.height
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
            width: this.mapWidth, height: this.mapHeight
        });
    }
    start(player) {
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
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Camera;



/***/ }),
/* 56 */
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
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bootstrap_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);



class Mob {
    constructor(mobs) {
        this.mobs = mobs;
        this.getAllMobs(1);
    }
    getAllMobs(id) {
        let mobArr = [];
        __WEBPACK_IMPORTED_MODULE_2_axios___default.a.get(`/mobs/room/${id}`).then((response) => {
            mobArr.push(response.data);
        });
        this.nmobs = mobArr;
    }
    /**
     * Iterates over the array of the mobs in the current zone,
     * and matches the players x & y coordinates finding the mobs
     * that belong in that room.
     * @param {Number} x
     * @param {Number} y
     * @return {Array}
     */
    inRoom(x, y) {
        let mobArr = [];
        __WEBPACK_IMPORTED_MODULE_1_lodash__["find"](this.mobs, (obj) => {
            if (obj.x === x && obj.y === y) {
                mobArr.push(obj);
            }
        });
        return mobArr;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Mob;



/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "col-md-6"
  }, [_c('div', {
    attrs: {
      "id": "stage"
    }
  }, [_c('canvas', {
    ref: "map",
    attrs: {
      "id": "map",
      "height": "350",
      "width": "350",
      "moz-opaque": ""
    }
  }), _vm._v(" "), _c('canvas', {
    ref: "player",
    attrs: {
      "id": "player",
      "width": "350",
      "height": "350",
      "moz-opaque": ""
    }
  }), _vm._v(" "), _c('canvas', {
    ref: "path",
    attrs: {
      "id": "path",
      "width": "20",
      "height": "20",
      "moz-opaque": ""
    }
  })]), _vm._v(" "), _c('div', [_c('small', [_vm._v("x: " + _vm._s(_vm.x) + " - y: " + _vm._s(_vm.y))])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3a16fb86", module.exports)
  }
}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(26)(
  /* script */
  __webpack_require__(60),
  /* template */
  __webpack_require__(61),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/vagrant/Code/game/resources/assets/js/components/Mobs.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Mobs.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4db1098e", Component.options)
  } else {
    hotAPI.reload("data-v-4db1098e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({

  props: ['mob']

});

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    attrs: {
      "mob": _vm.mob
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.mob.name))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4db1098e", module.exports)
  }
}

/***/ }),
/* 62 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[29]);