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
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
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
/* 16 */
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
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_laravel_echo__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_laravel_echo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_laravel_echo__);

window._ = __webpack_require__(3);

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
  window.$ = __webpack_provided_window_dot_jQuery = __webpack_require__(7);

  __webpack_require__(22);
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = __webpack_require__(5);

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



window.Pusher = __webpack_require__(30);

window.Echo = new __WEBPACK_IMPORTED_MODULE_0_laravel_echo___default.a({
  broadcaster: 'pusher',
  key: '6e9c65913659d602f052',
  encrypted: true,
  cluster: 'mt1'
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)))

/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bootstrap_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);



/*axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token: any = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}*/
class Mobs {
    constructor(id) {
        this.roomId = id;
        this.getAllMobs(id);
    }
    /**
     * Send an ajax request to get all of the mobs in the current zone.
     * @param {Number} id - ID of the zone.
     * @return void
     */
    getAllMobs(id) {
        id = id || this.roomId;
        __WEBPACK_IMPORTED_MODULE_2_axios___default.a.get(`/mobs/room/${id}`).then((response) => {
            this.allMobs = response.data;
        });
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
        __WEBPACK_IMPORTED_MODULE_1_lodash__["find"](this.allMobs, (obj) => {
            if (obj.x === x && obj.y === y) {
                mobArr.push(obj);
            }
        });
        return mobArr;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Mobs;



/***/ }),
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39);
module.exports = __webpack_require__(82);


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bootstrap__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Map_vue__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Map_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Map_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Mobs_vue__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Mobs_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Mobs_vue__);
/**
 * App - Main vue instance
 */






var app = new __WEBPACK_IMPORTED_MODULE_1_vue___default.a({

  el: '#app',

  components: {
    WorldMap: __WEBPACK_IMPORTED_MODULE_2__components_Map_vue___default.a,
    WorldMobs: __WEBPACK_IMPORTED_MODULE_3__components_Mobs_vue___default.a
  },

  data: {
    mobs: null,
    attackMob: null
  },

  methods: {
    sendMobs: function sendMobs(mobs) {
      this.mobs = mobs;
    },
    sendAttackMob: function sendAttackMob(mob) {
      this.attackMob = mob;
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
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(15)(
  /* script */
  __webpack_require__(60),
  /* template */
  __webpack_require__(69),
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
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_loader__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__world_index__ = __webpack_require__(62);




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'world-map',
    props: ['world'],
    data() {
        return {
            x: null,
            y: null,
            render: null,
            camera: null,
            player: null,
            canvasPool: null,
            mobData: null,
            mapData: '',
            elapsed: 0,
            delta: 0,
        };
    },
    computed: {
        keyboard() {
            return new __WEBPACK_IMPORTED_MODULE_3__world_index__["c" /* Keyboard */]();
        }
    },
    created() {
        __WEBPACK_IMPORTED_MODULE_1_axios___default.a.get('/map/1').then((res) => {
            let data = JSON.parse(res.data);
            this.world = (__WEBPACK_IMPORTED_MODULE_0_lodash__["isEqual"](data, this.world)) ? this.world : data;
            this.mapData = data;
        });
    },
    methods: {
        mobs() {
            let inRoom = this.mobData.inRoom(this.x, this.y);
            this.$emit('send', this.mobData.inRoom(this.x, this.y));
        },
        update() {
            this.camera.update();
            this.x = this.player.nodeX;
            this.y = this.player.nodeY;
            this.mobs();
        },
        draw() {
            __WEBPACK_IMPORTED_MODULE_3__world_index__["b" /* Canvas */].clearWorld(this.canvasPool);
            let world = this.world, length = world.layers.length, image = world.tilesets[0].image;
            __WEBPACK_IMPORTED_MODULE_0_lodash__["times"](length, (i) => {
                Object(__WEBPACK_IMPORTED_MODULE_2__util_loader__["a" /* loadMap */])(image).then(img => {
                    this.render.map(i, img);
                });
            });
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
            __WEBPACK_IMPORTED_MODULE_0_lodash__["delay"](() => {
                this.update();
                this.draw();
                requestAnimationFrame(this.loop);
            }, 10);
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
        this.render = new __WEBPACK_IMPORTED_MODULE_3__world_index__["f" /* Render */](renderConfig, this.world);
        let cameraConfig = {
            width: canvasPool.canvas.map.width,
            height: canvasPool.canvas.map.height,
            mapWidth: this.world.width * this.world.tilewidth,
            mapHeight: this.world.height * this.world.tileheight
        };
        this.camera = new __WEBPACK_IMPORTED_MODULE_3__world_index__["a" /* Camera */](cameraConfig);
        this.render.setCamera(this.camera);
        /* Create new Player instance. */
        let playerConfig = {
            map: {
                width: this.world.tilesets[0].imagewidth,
                height: this.world.tilesets[0].imageheight,
            },
            canvas: new __WEBPACK_IMPORTED_MODULE_3__world_index__["b" /* Canvas */](canvasPool.canvas.player, canvasPool.ctx.player)
        };
        this.player = new __WEBPACK_IMPORTED_MODULE_3__world_index__["e" /* Player */](playerConfig);
        this.camera.start(this.player);
        this.mobData = new __WEBPACK_IMPORTED_MODULE_3__world_index__["d" /* Mobs */](1);
        //let g = new Game();
        //console.log(g.map)
        console.log(this.mapData);
        /* Start the game */
        this.init();
    },
});


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {/* harmony export (immutable) */ __webpack_exports__["a"] = loadMap;
/* unused harmony export loadTileAtlas */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


/**
 * Load world map image.
 * @param {String} src
 * @return {Callback|Promise}
 */
function loadMap(src) {
    function load(src) {
        if (!src) {
            return __WEBPACK_IMPORTED_MODULE_0_bluebird___default.a.reject();
        }
        let image = new Image();
        image.src = src;
        return new __WEBPACK_IMPORTED_MODULE_0_bluebird___default.a((resolve, reject) => {
            if (image.naturalWidth) {
                resolve(image);
            }
            else if (image.complete) {
                reject(image);
            }
            image.onload = () => {
                resolve(image);
            };
            image.onerror = (error) => {
                reject(image);
                console.log(error);
            };
        });
    }
    function create() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield load(src);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    return create();
}
function loadTileAtlas(url) {
    let map;
    function load(url) {
        __WEBPACK_IMPORTED_MODULE_1_axios___default.a.get(url).then((response) => {
            return response.data;
        });
    }
    function init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield load(url);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    return init();
}

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world_keyboard__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__canvas__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__render__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__player__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__camera__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mobs__ = __webpack_require__(32);
/* unused harmony reexport Game */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__world_keyboard__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__canvas__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_3__render__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__player__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__camera__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_6__mobs__["a"]; });










/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
 //, {AxiosResponse} from 'axios'
class Game {
    constructor() {
        this.loadMap('/map/1');
    }
    loadMap(url) {
        let map;
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/map/1').then((res) => {
            map = 'fucking fuck';
        });
        map = (!map) ? 'fuck fuck' : map;
        this.map = map;
    }
}
/* unused harmony export Game */



/***/ }),
/* 64 */
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
    static clearDirty(x, y, pool) {
        pool.ctx.map.clearRect(x, y, 350, 350);
        pool.ctx.player.clearRect(x, y, 350, 350);
    }
    /**
     * Reset Transofrmation matrix.
     * @return void
     */
    resetTransform() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Canvas;



/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);

class Render {
    constructor(canvas, tiled) {
        this.canvas = canvas.canvas;
        this.ctx = canvas.ctx;
        this.tiled = tiled;
    }
    setCamera(camera) {
        this.camera = camera;
    }
    get mapArray() {
        let mapArr = [], width = this.tiled.width, height = this.tiled.height;
        __WEBPACK_IMPORTED_MODULE_0_lodash__["times"](this.tiled.layers.length, (i) => {
            mapArr[i] = [];
            __WEBPACK_IMPORTED_MODULE_0_lodash__["times"](width, (r) => {
                mapArr[i][r] = [];
                __WEBPACK_IMPORTED_MODULE_0_lodash__["times"](height, (c) => {
                    mapArr[i][r][c] = this.tiled.layers[i].data[r * width + c];
                });
            });
        });
        return mapArr;
    }
    map(layerId, image) {
        //console.time('#f')
        let layer = this.tiled.layers[layerId].data, firstgid = 1, view = this.cullTiles(), width = this.tiled.width, tileWidth = this.tiled.tilewidth, tileHeight = this.tiled.tileheight;
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.save();
        this.ctx.translate(__WEBPACK_IMPORTED_MODULE_0_lodash__["round"](-this.camera.x), __WEBPACK_IMPORTED_MODULE_0_lodash__["round"](-this.camera.y));
        __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](__WEBPACK_IMPORTED_MODULE_0_lodash__["range"](view.startX, view.endX), (r) => {
            __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](__WEBPACK_IMPORTED_MODULE_0_lodash__["range"](view.startY, view.endY), (c) => {
                let tile = layer[r + width * c] - firstgid, frame = this.createTile(tile, r, c);
                this.ctx.drawImage(image, frame.sx, frame.sy, tileWidth, tileHeight, frame.dx, frame.dy, tileWidth, tileHeight);
            });
        });
        this.ctx.restore();
        //console.timeEnd('#f')
    }
    player(player) {
        let ctx = player.canvas.ctx, screenX = player.x - this.camera.x - (player.width / 2), screenY = player.y - this.camera.y - (player.height / 2);
        ctx.fillStyle = 'red';
        ctx.fillRect(screenX, screenY, player.width, player.height);
    }
    createTile(tile, row, col) {
        let width = this.tiled.width, tileWidth = this.tiled.tilewidth, tileHeight = this.tiled.tileheight, sx = __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](tile % width) * tileWidth, sy = __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](tile / width) * tileHeight, dx = row * tileWidth, dy = col * tileHeight;
        return { sx, sy, dx, dy };
    }
    cullTiles() {
        let startX = __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](this.camera.x / this.tiled.tilewidth), startY = __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](this.camera.y / this.tiled.tileheight), endX = __WEBPACK_IMPORTED_MODULE_0_lodash__["round"](startX + (this.camera.width / this.tiled.tilewidth)), endY = __WEBPACK_IMPORTED_MODULE_0_lodash__["round"](startY + (this.camera.height / this.tiled.tileheight)), width = this.tiled.width, height = this.tiled.height;
        endX = __WEBPACK_IMPORTED_MODULE_0_lodash__["clamp"](endX + 1, (width * 0.5), width);
        endY = __WEBPACK_IMPORTED_MODULE_0_lodash__["clamp"](endY + 1, (height * 0.5), height);
        return { startX, startY, endX, endY };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Render;



/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(3);
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
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rectangle__ = __webpack_require__(68);

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
/* 68 */
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
/* 69 */
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
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(15)(
  /* script */
  __webpack_require__(71),
  /* template */
  __webpack_require__(81),
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
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Attack_vue__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Attack_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Attack_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__world_mobs_ts__ = __webpack_require__(32);
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
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({

  props: ['mob'],

  data: function data() {
    return {
      showAttack: false,
      attackMob: null
    };
  },


  components: {
    'world-attack': __WEBPACK_IMPORTED_MODULE_1__Attack_vue___default.a
  },

  computed: {
    type: function type() {
      return this.mob.type;
    }
  },

  methods: {
    mobAttack: function mobAttack(mob) {

      this.showAttack = true;

      //this.$emit('send', mob);

      this.attackMob = mob;

      //console.log(`attacking mob ${mob}`);
    }
  }
});

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(73)
}
var Component = __webpack_require__(15)(
  /* script */
  __webpack_require__(78),
  /* template */
  __webpack_require__(80),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-e3156be4",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/vagrant/Code/game/resources/assets/js/components/Attack.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Attack.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e3156be4", Component.options)
  } else {
    hotAPI.reload("data-v-e3156be4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(74);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(76)("20a9d086", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e3156be4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Attack.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e3156be4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Attack.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(75)(undefined);
// imports


// module
exports.push([module.i, "\n.modal-mask[data-v-e3156be4] {\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, .5);\n  display: table;\n  transition: opacity .3s ease;\n}\n.modal-wrapper[data-v-e3156be4] {\n  display: table-cell;\n  vertical-align: middle;\n}\n.modal-container[data-v-e3156be4] {\n  width: 700px;\n  margin: 0px auto;\n  padding: 20px 30px;\n  background-color: #fff;\n  border-radius: 2px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);\n  transition: all .3s ease;\n  font-family: Verdana;\n  height: 100%;\n}\n.modal-header h3[data-v-e3156be4] {\n  margin-top: 0;\n  color: #42b983;\n}\n.modal-body[data-v-e3156be4] {\n  margin: 20px 0;\n}\n.modal-default-button[data-v-e3156be4] {\n  float: right;\n}\n\n/*\n * The following styles are auto-applied to elements with\n * transition=\"modal\" when their visibility is toggled\n * by Vue.js.\n *\n * You can easily play with the modal transition by editing\n * these styles.\n */\n.modal-enter[data-v-e3156be4] {\n  opacity: 0;\n}\n.modal-leave-active[data-v-e3156be4] {\n  opacity: 0;\n}\n.modal-enter .modal-container[data-v-e3156be4],\n.modal-leave-active .modal-container[data-v-e3156be4] {\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1);\n}\n.fade-enter-active[data-v-e3156be4], .fade-leave-active[data-v-e3156be4] {\n  transition: opacity .5s\n}\n.fade-enter[data-v-e3156be4], .fade-leave-to[data-v-e3156be4] /* .fade-leave-active in <2.1.8 */ {\n  opacity: 0\n}\n\n", ""]);

// exports


/***/ }),
/* 75 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(77)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 77 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world_attack_ts__ = __webpack_require__(79);
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

  computed: {
    attack: function attack() {
      return new __WEBPACK_IMPORTED_MODULE_1__world_attack_ts__["a" /* Attack */](this.player, this.target);
    }
  },

  created: function created() {
    /* @note - will be stored in the database */
    var playerStats = {
      name: 'Player',
      hp: 100,
      attack: 10,
      critical: 0,
      block: 0

      /* @note - will be stored in the database */
    };var mobStats = {
      name: this.attackMob.name,
      hp: 90,
      attack: 10,
      critical: 0,
      block: 0
    };

    this.player = playerStats;
    this.target = mobStats;

    this.fight();
  },
  data: function data() {
    return {
      player: null,
      target: null,
      showTurn: false,
      playerDamage: '',
      targetDamage: '',

      showMessage: false,
      displayMessage: '',

      showResult: false,
      displayResult: ''
    };
  },


  methods: {
    fight: function fight() {

      var attackArr = this.attack.buildAttack(),
          len = attackArr.length,
          self = this;

      (function loop(i) {
        if (i <= len) {
          ++i;
          __WEBPACK_IMPORTED_MODULE_0_lodash__["delay"](function () {
            loop(i);

            var turn = attackArr[i]['turn'],
                damage = attackArr[i]['damage'],
                message = attackArr[i]['message'];

            self.showTurn = turn;
            self.showMessage = true;

            if (turn === 'player') {
              self.playerDamage = damage;
            } else if (turn === 'target') {
              self.targetDamage = damage;
            } else if (turn === 'winner') {
              self.showResult = true;
              self.displayResult = message;
            }
            self.displayMessage = message;
          }, 800);
        }
      })(0);
    }
  },

  name: 'world-attack',

  props: ['attack-mob']

});

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Attack {
    constructor(player, target) {
        this.player = player;
        this.target = target;
    }
    /**
     * Builds the attack, making it into an array.
     */
    buildAttack() {
        let attackArr = [], player = this.player, mob = this.target, turn = 'player', playerHp = player.hp, mobHp = mob.hp;
        do {
            if (turn === 'player') {
                let message = `${player.name} hits for ${player.attack}`, damage = player.attack;
                mobHp -= damage;
                let attackTurn = {
                    turn: turn,
                    message: message,
                    damage: damage,
                    hp: {
                        player: playerHp,
                        target: mobHp
                    },
                    type: 'hit'
                };
                attackArr.push(attackTurn);
                turn = (mobHp <= 0) ? 'winner' : 'target';
                continue;
            }
            else if (turn === 'target') {
                let message = `${mob.name} hits for ${mob.attack}`, damage = mob.attack;
                playerHp -= damage;
                let attackTurn = {
                    turn: turn,
                    message: message,
                    damage: damage,
                    hp: {
                        player: playerHp,
                        target: mobHp
                    },
                    type: 'hit'
                };
                attackArr.push(attackTurn);
                turn = (playerHp <= 0) ? 'winner' : 'player';
                continue;
            }
            else if (turn === 'winner') {
                let winner = (playerHp <= 0) ? mob.name : player.name;
                attackArr.push({
                    turn: turn,
                    message: `${winner} wins!`,
                    type: 'win'
                });
                break;
            }
        } while (true);
        return attackArr;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Attack;



/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "modal"
    }
  }, [_c('div', {
    staticClass: "modal-mask"
  }, [_c('div', {
    staticClass: "modal-wrapper"
  }, [_c('div', {
    staticClass: "modal-container"
  }, [_c('button', {
    staticClass: "modal-default-button",
    on: {
      "click": function($event) {
        _vm.$emit('close')
      }
    }
  }, [_vm._v("X")]), _vm._v(" "), _c('div', {
    attrs: {
      "text-align": "center"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-4"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('h1', [_vm._v("Player")])]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [(_vm.showTurn === 'target') ? _c('h1', [_vm._v("- " + _vm._s(_vm.targetDamage))]) : _vm._e()])], 1), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('h1', [_vm._v("Target")])]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [(_vm.showTurn === 'player') ? _c('h1', [_vm._v("- " + _vm._s(_vm.playerDamage))]) : _vm._e()])], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-8"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [(_vm.showMessage) ? _c('div', {
    attrs: {
      "align": "center"
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.displayMessage))])]) : _vm._e()])], 1)])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e3156be4", module.exports)
  }
}

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    attrs: {
      "mob": _vm.mob
    }
  }, [_c('div', [_vm._v("\n      " + _vm._s(_vm.mob.name) + " |\n\n      "), _c('a', {
    attrs: {
      "id": "show-modal"
    },
    on: {
      "click": function($event) {
        _vm.mobAttack(_vm.mob)
      }
    }
  }, [_c('small', [_vm._v("Attack")])]), _vm._v(" "), (_vm.type === 'quest') ? _c('span', [_vm._v(" | "), _c('small', [_vm._v("Talk")])]) : _vm._e()])]), _vm._v(" "), (_vm.showAttack) ? _c('div', [_c('world-attack', {
    attrs: {
      "attack-mob": _vm.attackMob
    },
    on: {
      "close": function($event) {
        _vm.showAttack = false
      }
    }
  })], 1) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4db1098e", module.exports)
  }
}

/***/ }),
/* 82 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[38]);