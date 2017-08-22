webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
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
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
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
/* 14 */
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

var listToStyles = __webpack_require__(158)

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
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
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
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_laravel_echo__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_laravel_echo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_laravel_echo__);

window._ = __webpack_require__(11);

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
  window.$ = __webpack_provided_window_dot_jQuery = __webpack_require__(21);

  __webpack_require__(62);
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = __webpack_require__(30);

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



window.Pusher = __webpack_require__(69);

window.Echo = new __WEBPACK_IMPORTED_MODULE_0_laravel_echo___default.a({
  broadcaster: 'pusher',
  key: '6e9c65913659d602f052',
  encrypted: true,
  cluster: 'mt1'
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(21)))

/***/ }),
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(181)
}
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(183),
  /* template */
  __webpack_require__(184),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/vagrant/Code/game/resources/assets/js/components/Equipment/Popup.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Popup.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4ccc8475", Component.options)
  } else {
    hotAPI.reload("data-v-4ccc8475", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
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
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bootstrap_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);



class Mobs {
    constructor(id) {
        this.roomId = id;
        this.all(id);
    }
    /**
     * Send an ajax request to get all of the mobs in the current zone.
     * @param {Number} id - ID of the zone.
     * @return void
     */
    all(id) {
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
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);

/**
 * Draggable directive
 * v-draggable
 */
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue___default.a.directive('draggable', {
  bind: function bind(el) {
    if (el) {
      var startX = void 0,
          startY = void 0,
          cacheX = void 0,
          cacheY = void 0,
          move = ['mousemove', 'touchmove'],
          up = ['mouseup', 'touchend'],
          mousemove = function mousemove(event) {
        var destX = event.clientX - cacheX,
            destY = event.clientY - cacheY;
        el.style.left = startX + destX + 'px';
        el.style.top = startY + destY + 'px';
        event.preventDefault();
      },
          mouseup = function mouseup(event) {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);

        document.removeEventListener('touchmove', mousemove);
        document.removeEventListener('touchend', mouseup);

        event.preventDefault();
      },
          mousedown = function mousedown(event) {
        startX = el.offsetLeft;
        startY = el.offsetTop;
        cacheX = event.clientX;
        cacheY = event.clientY;

        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);

        document.addEventListener('touchmove', mousemove);
        document.addEventListener('touchend', mouseup);
        event.preventDefault();
      };

      el.addEventListener('mousedown', mousedown);
      el.addEventListener('touchstart', mousedown);
    }
  }
}));

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(198)
}
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(200),
  /* template */
  __webpack_require__(206),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-cf889052",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/vagrant/Code/game/resources/assets/js/components/Equipment/Equipment.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Equipment.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cf889052", Component.options)
  } else {
    hotAPI.reload("data-v-cf889052", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(116);
module.exports = __webpack_require__(209);


/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bootstrap__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Map_vue__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Map_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Map_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Mobs_Mobs_vue__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Mobs_Mobs_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Mobs_Mobs_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Backpack_vue__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Backpack_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_Backpack_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Equipment_vue__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Equipment_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_Equipment_vue__);



/* Components */





//const bus = new Vue()

var app = new __WEBPACK_IMPORTED_MODULE_1_vue___default.a({

  el: '#app',

  components: {
    WorldMap: __WEBPACK_IMPORTED_MODULE_2__components_Map_vue___default.a,
    WorldMobs: __WEBPACK_IMPORTED_MODULE_3__components_Mobs_Mobs_vue___default.a,
    Backpack: __WEBPACK_IMPORTED_MODULE_4__components_Backpack_vue___default.a,
    Equipment: __WEBPACK_IMPORTED_MODULE_5__components_Equipment_vue___default.a,
    ProfileEquipment: __webpack_require__(73)
  },

  data: {
    mobs: null,
    attackMob: null,
    showbp: false,
    showeq: false
  },

  methods: {
    sendMobs: function sendMobs(mobs) {
      this.mobs = mobs;
    },
    sendAttackMob: function sendAttackMob(mob) {
      this.attackMob = mob;
    },


    /* Open Backpack Modal */
    openBackpack: function openBackpack() {
      this.showbp = true;
    },

    /* Close Backpack Modal */
    closeBackpack: function closeBackpack() {
      this.showbp = false;
    },


    /* Open Equipment Modal */
    openEquipment: function openEquipment() {
      this.showeq = true;
    },

    /* Close Equipment Modal */
    closeEquipment: function closeEquipment() {
      this.showeq = false;
    }
  }

});

/***/ }),
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(138),
  /* template */
  __webpack_require__(149),
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
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_loader__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__world_index__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__world_maps_map2_json__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__world_maps_map2_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__world_maps_map2_json__);




let Tiled = __WEBPACK_IMPORTED_MODULE_3__world_maps_map2_json__;
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'world-map',
    props: ['map', 'world'],
    data() {
        return {
            x: null,
            y: null,
            render: null,
            camera: null,
            player: null,
            canvasPool: null,
            mobData: null,
            mapData: null,
            elapsed: 0,
            delta: 0,
        };
    },
    computed: {
        keyboard() {
            return new __WEBPACK_IMPORTED_MODULE_2__world_index__["c" /* Keyboard */]();
        },
        mapD() {
            return this.map;
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
            __WEBPACK_IMPORTED_MODULE_2__world_index__["b" /* Canvas */].clearWorld(this.canvasPool);
            //let world = this.world,
            //    length = world.layers.length,
            //    image = world.tilesets[0].image;
            let world = Tiled, length = Tiled.layers.length, image = Tiled.tilesets[0].image;
            let gid;
            Object(__WEBPACK_IMPORTED_MODULE_1__util_loader__["a" /* loadMap */])(image).then(img => {
                __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](world.layers, (val, key) => {
                    gid = (world.tilesets.length)
                        ? world.tilesets[key].firstgid
                        : world.tilesets[0].firstgid;
                    this.render.map(gid, val, img);
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
            setTimeout(() => {
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
        this.render = new __WEBPACK_IMPORTED_MODULE_2__world_index__["f" /* Render */](renderConfig, Tiled);
        let cameraConfig = {
            width: canvasPool.canvas.map.width,
            height: canvasPool.canvas.map.height,
            mapWidth: Tiled.width * Tiled.tilewidth,
            mapHeight: Tiled.height * Tiled.tileheight
            //mapWidth: this.world.width * this.world.tilewidth,
            //mapHeight: this.world.height * this.world.tileheight
        };
        this.camera = new __WEBPACK_IMPORTED_MODULE_2__world_index__["a" /* Camera */](cameraConfig);
        this.render.setCamera(this.camera);
        /* Create new Player instance. */
        let playerConfig = {
            map: {
                width: Tiled.width * Tiled.tilewidth,
                height: Tiled.height * Tiled.tileheight
            },
            canvas: new __WEBPACK_IMPORTED_MODULE_2__world_index__["b" /* Canvas */](canvasPool.canvas.player, canvasPool.ctx.player)
        };
        this.player = new __WEBPACK_IMPORTED_MODULE_2__world_index__["e" /* Player */](playerConfig);
        this.camera.start(this.player);
        this.mobData = new __WEBPACK_IMPORTED_MODULE_2__world_index__["d" /* Mobs */](1);
        console.log(this.mobData);
        /* Start */
        this.init();
    },
});


/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {/* harmony export (immutable) */ __webpack_exports__["a"] = loadMap;
/* unused harmony export loadMapData */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(30);
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
 * @return {Promise}
 *
 * @example
 *  loadMap('src_to_image_here').then(img => {
 *    canvasRender(img)
 *  })
 */
function loadMap(src) {
    function load(src) {
        if (!src) {
            return __WEBPACK_IMPORTED_MODULE_0_bluebird___default.a.reject(src);
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
    function initLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield load(src);
            }
            catch (error) {
                console.log(error);
                return;
            }
        });
    }
    return initLoad();
}
function loadMapData(url) {
    function load(url) {
        return __WEBPACK_IMPORTED_MODULE_1_axios___default.a.get(url).then((response) => {
            return JSON.parse(response.data);
        });
    }
    function getMap() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield load(url);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    return getMap();
}

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(9)))

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world_keyboard__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__canvas__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__render__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__player__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__camera__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mobs__ = __webpack_require__(71);
/* unused harmony reexport Game */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__world_keyboard__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__canvas__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_3__render__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__player__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__camera__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_6__mobs__["a"]; });










/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bootstrap_js__ = __webpack_require__(41);

class Game {
    constructor(map) {
    }
}
/* unused harmony export Game */



/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(11);
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
/* 143 */
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
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(11);
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
    map(gid, layerId, image) {
        //console.time('#f')
        //console.log(layerId)
        let layer = layerId, 
        //layer = this.tiled.layers[layerId].data,
        firstgid = 1, view = this.cullTiles(), width = this.tiled.width, columns = this.tiled.tilesets[0].columns, tileWidth = this.tiled.tilewidth, tileHeight = this.tiled.tileheight;
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.save();
        this.ctx.translate(__WEBPACK_IMPORTED_MODULE_0_lodash__["round"](-this.camera.x), __WEBPACK_IMPORTED_MODULE_0_lodash__["round"](-this.camera.y));
        __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](__WEBPACK_IMPORTED_MODULE_0_lodash__["range"](view.startX, view.endX), (r) => {
            __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](__WEBPACK_IMPORTED_MODULE_0_lodash__["range"](view.startY, view.endY), (c) => {
                //_.times(20, (r: number) => {
                //  _.times(20, (c: number) => {
                let tile = layer.data[r + width * c] - gid, frame = this.createTile(tile, r, c);
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
        let width = this.tiled.tilesets[0].columns, tileWidth = this.tiled.tilewidth, tileHeight = this.tiled.tileheight, sx = __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](tile % width) * tileWidth, sy = __WEBPACK_IMPORTED_MODULE_0_lodash__["floor"](tile / width) * tileHeight, dx = row * tileWidth, dy = col * tileHeight;
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
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(11);
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
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rectangle__ = __webpack_require__(147);


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
        this.viewRect = new __WEBPACK_IMPORTED_MODULE_1__rectangle__["a" /* Rectangle */]({
            left: this.x, top: this.y,
            width: this.width, height: this.height
        });
        // Map Rectangle (full sized)
        this.mapRect = new __WEBPACK_IMPORTED_MODULE_1__rectangle__["a" /* Rectangle */]({
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
        this.clamp();
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
    clamp() {
        this.x = Object(__WEBPACK_IMPORTED_MODULE_0_lodash__["clamp"])(this.x, 0, this.width);
        this.y = Object(__WEBPACK_IMPORTED_MODULE_0_lodash__["clamp"])(this.y, 0, this.height);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Camera;



/***/ }),
/* 147 */
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
/* 148 */
/***/ (function(module, exports) {

module.exports = {"height":20,"layers":[{"data":[365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365,365],"height":20,"name":"Tile Layer 1","opacity":1,"type":"tilelayer","visible":true,"width":20,"x":0,"y":0},{"data":[1314,1315,0,0,1089,1090,1090,1090,1090,1059,1122,1122,1122,1122,1122,1122,1122,1122,1122,1122,1346,1347,1089,1090,1059,1122,1122,1122,1122,1122,1122,1122,1122,1122,1122,1122,1122,1122,1122,1122,0,1089,1059,1122,1122,1122,1026,1154,1154,1154,1027,1122,1122,1122,1122,1122,1122,1122,1122,1122,1377,1121,1122,1122,1026,1154,1155,1116,1117,1118,1121,1122,1122,1122,1122,1122,1122,1122,1122,1122,0,1121,1122,1026,1155,0,1377,1148,1212,1150,1121,1122,1122,1122,1122,1122,1122,1122,1122,1122,0,1121,1122,1123,1377,1381,0,1180,1181,1182,1153,1027,1122,1122,1122,1122,1122,1026,1154,1154,1381,1121,1122,1058,1091,0,1089,1090,1090,1090,1090,1059,1122,1122,1122,1122,1122,1123,1381,0,0,1121,1122,1122,1123,1380,1121,1122,1122,1122,1122,1122,1122,1122,1122,1122,1122,1123,0,0,0,1153,1027,1122,1058,1091,1121,1122,1122,1122,1122,1122,1122,1122,1122,1122,1122,1123,0,0,0,1377,1121,1122,1122,1058,1059,1122,1122,1122,1122,1122,1122,1122,1122,1122,1026,1155,0,0,0,0,1153,1027,1122,1122,1122,1122,1122,1122,1122,1122,1122,1122,1122,1122,1123,1116,1117,1118,1281,1282,1283,1153,1027,1122,1122,1122,1122,1122,1122,1122,1122,1122,1122,1026,1155,1148,1212,1150,1313,1314,1315,0,1121,1122,1122,1122,1122,1122,1122,1122,1122,1122,1026,1155,1380,1148,1214,1150,1345,1346,1347,0,1121,1122,1122,1122,1122,1122,1122,1122,1026,1154,1155,0,1116,1086,1212,1150,1381,1382,0,1089,1059,1122,1122,1026,1154,1154,1154,1154,1155,0,0,1116,1086,1212,1214,1150,0,0,1089,1059,1122,1026,1154,1155,1116,1117,1117,1117,1117,1117,1117,1086,1213,1213,1053,1182,1089,1090,1059,1122,1122,1123,1381,1382,1148,1214,1213,1214,1213,1214,1214,1213,1214,1053,1182,0,1059,1122,1122,1122,1026,1155,0,0,1180,1181,1181,1181,1181,1181,1181,1181,1181,1182,0,0,1122,1122,1026,1154,1155,0,1377,0,0,0,0,1379,0,0,0,0,0,0,1381,1382,1122,1026,1155,1381,1382,0,0,0,0,1381,1382,0,0,0,0,0,0,1379,0,0],"height":20,"name":"Tile Layer 2","opacity":1,"type":"tilelayer","visible":true,"width":20,"x":0,"y":0}],"nextobjectid":1,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.0.2","tileheight":32,"tilesets":[{"columns":32,"firstgid":1,"image":"http://i.imgur.com/N4x9MX9.png","imageheight":1024,"imagewidth":1024,"margin":0,"name":"terrain","spacing":0,"tilecount":1024,"tileheight":32,"tilewidth":32,"transparentcolor":"#000000"},{"firstgid":1025,"source":"tilesets/Terrain-tileset.json"}],"tilewidth":32,"type":"map","version":1,"width":20}

/***/ }),
/* 149 */
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
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(151),
  /* template */
  __webpack_require__(165),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/vagrant/Code/game/resources/assets/js/components/Mobs/Mobs.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Mobs.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7ca5984e", Component.options)
  } else {
    hotAPI.reload("data-v-7ca5984e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__View_vue__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__View_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__View_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Attack_vue__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Attack_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Attack_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Talk_vue__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Talk_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Talk_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__world_mobs_ts__ = __webpack_require__(71);
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

  props: {
    mob: {
      type: Object,
      required: false
    }
  },

  data: function data() {
    return {
      showAttack: false,
      showMob: false,
      showQuest: false
    };
  },


  components: {
    'mob-attack': __WEBPACK_IMPORTED_MODULE_1__Attack_vue___default.a,
    'mob-view': __WEBPACK_IMPORTED_MODULE_0__View_vue___default.a,
    'mob-talk': __WEBPACK_IMPORTED_MODULE_2__Talk_vue___default.a
  },

  computed: {
    type: function type() {
      return this.mob.type;
    }
  }

});

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(153),
  /* template */
  __webpack_require__(154),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/vagrant/Code/game/resources/assets/js/components/Mobs/View.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] View.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-30894c0b", Component.options)
  } else {
    hotAPI.reload("data-v-30894c0b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 153 */
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

  props: {
    mob: {
      type: Object,
      required: true
    }
  }

});

/***/ }),
/* 154 */
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
    staticClass: "modal-header"
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "padding": "5px"
    }
  }, [_c('div', {
    staticClass: "col-md-6 col-md-offset2"
  }, [_c('strong', [_vm._v(_vm._s(_vm.mob.name))]), _vm._v(" "), _c('div', [_vm._v(" " + _vm._s(_vm.mob.description) + " ")]), _vm._v(" "), _c('div', [_c('a', {
    on: {
      "click": function($event) {
        _vm.$emit('close')
      }
    }
  }, [_vm._v("Back to world")])])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-6 col-md-offset2"
  }, [_c('img', {
    attrs: {
      "src": "http://placehold.it/250x250"
    }
  })])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-30894c0b", module.exports)
  }
}

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(156)
}
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(159),
  /* template */
  __webpack_require__(161),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6c6f5aae",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/vagrant/Code/game/resources/assets/js/components/Mobs/Attack.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Attack.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c6f5aae", Component.options)
  } else {
    hotAPI.reload("data-v-6c6f5aae", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(157);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(14)("248366de", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6c6f5aae\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Attack.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6c6f5aae\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Attack.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(13)(undefined);
// imports


// module
exports.push([module.i, "\n.modal-mask[data-v-6c6f5aae] {\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, .5);\n  display: table;\n  transition: opacity .3s ease;\n}\n.modal-wrapper[data-v-6c6f5aae] {\n  display: table-cell;\n  vertical-align: middle;\n}\n.modal-container[data-v-6c6f5aae] {\n  width: 700px;\n  margin: 0px auto;\n  padding: 20px 30px;\n  background-color: #fff;\n  border-radius: 2px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);\n  transition: all .3s ease;\n  font-family: Verdana;\n  height: 100%;\n}\n.modal-r-container[data-v-6c6f5aae] {\n  width: 300px;\n  margin: 0px auto;\n  padding: 20px 30px;\n  background-color: #fff;\n  border-radius: 2px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);\n  transition: all .3s ease;\n  font-family: Verdana;\n  height: 100%;\n}\n.modal-header h3[data-v-6c6f5aae] {\n  margin-top: 0;\n  color: #42b983;\n}\n.modal-body[data-v-6c6f5aae] {\n  margin: 20px 0;\n}\n.modal-default-button[data-v-6c6f5aae] {\n  float: right;\n}\n\n/*\n * The following styles are auto-applied to elements with\n * transition=\"modal\" when their visibility is toggled\n * by Vue.js.\n *\n * You can easily play with the modal transition by editing\n * these styles.\n */\n.modal-enter[data-v-6c6f5aae] {\n  opacity: 0;\n}\n.modal-leave-active[data-v-6c6f5aae] {\n  opacity: 0;\n}\n.modal-enter .modal-container[data-v-6c6f5aae],\n.modal-leave-active .modal-container[data-v-6c6f5aae] {\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1);\n}\n.fade-enter-active[data-v-6c6f5aae], .fade-leave-active[data-v-6c6f5aae] {\n  transition: opacity .5s\n}\n.fade-enter[data-v-6c6f5aae], .fade-leave-to[data-v-6c6f5aae] /* .fade-leave-active in <2.1.8 */ {\n  opacity: 0\n}\n\n", ""]);

// exports


/***/ }),
/* 158 */
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
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__world_attack_ts__ = __webpack_require__(160);
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
  created: function created() {

    /* @note - will be stored in the database */
    var playerStats = {
      name: 'Player',
      hp: 30,
      attack: 10,
      critical: 0,
      block: 0,
      level: 1
    };

    var mobStats = {
      name: this.mob.name,
      hp: this.mob.stats.hp,
      attack: this.mob.stats.attack,
      critical: this.mob.stats.critical,
      block: this.mob.stats.block,
      level: this.mob.stats.level
    };

    this.player = playerStats;

    this.target = mobStats;

    this.attack = new __WEBPACK_IMPORTED_MODULE_1__world_attack_ts__["a" /* Attack */](this.player, this.target);

    this.fight();
  },
  data: function data() {
    return {
      attack: null,
      player: null,
      target: null,

      showTurn: false,
      playerDamage: '',
      targetDamage: '',

      showMessage: false,
      displayMessage: '',

      showResult: false,
      displayResult: '',

      health: {
        player: 228,
        target: 228
      }

    };
  },


  methods: {
    reset: function reset() {
      console.log('closing atk');
      Object.assign(this.$data, this.$options.data());
    },
    fightTurn: function fightTurn(val) {
      var turn = val.turn,
          damage = val.damage,
          message = val.message;
      this.showTurn = turn;

      if (turn === 'player') {
        this.playerDamage = damage;

        this.health.target = val.hp.width;
      } else if (turn === 'target') {
        this.targetDamage = damage;

        this.health.player = val.hp.width;
      } else if (turn === 'winner') {
        this.showMessage = false;
        this.showResult = true;
        this.displayResult = message;
      }
      if (turn !== 'winner') {
        this.showMessage = true;
        this.displayMessage = message;
      }
    },
    fight: function fight() {
      var _this = this;

      var attackArr = this.attack.buildAttack();
      __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](attackArr, function (val, key) {
        setTimeout(function () {
          _this.fightTurn(val);
        }, key * 800);
      });
    }
  },

  props: {
    mob: {
      type: Object,
      required: true
    }
  }

});

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);

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
                let message = `${player.name} hits for ${player.attack}`, damage = this.genDamage(player.attack, player.hp, player.level);
                mobHp -= damage;
                let attackTurn = {
                    turn: turn,
                    message: message,
                    damage: damage,
                    hp: {
                        player: playerHp,
                        target: mobHp,
                        width: 228 * ((mobHp <= 0) ? 0 : mobHp) / mob.hp
                    }
                };
                attackArr.push(attackTurn);
                turn = (mobHp <= 0) ? 'winner' : 'target';
                continue;
            }
            else if (turn === 'target') {
                let message = `${mob.name} hits for ${mob.attack}`, damage = this.genDamage(mob.attack, mob.hp, mob.level);
                playerHp -= damage;
                let attackTurn = {
                    turn: turn,
                    message: message,
                    damage: damage,
                    hp: {
                        player: playerHp,
                        target: mobHp,
                        width: 228 * ((playerHp <= 0) ? 0 : playerHp) / player.hp
                    }
                };
                attackArr.push(attackTurn);
                turn = (playerHp <= 0) ? 'winner' : 'player';
                continue;
            }
            else if (turn === 'winner') {
                let winner = (playerHp <= 0) ? mob.name : player.name, winDisplay = this.winner(winner);
                /*if (winner === player.name) {
                  winDisplay = `You have won!`;
                } else {
                  winDisplay = `${mob.name} has won!`;
                }*/
                attackArr.push({ turn: turn, message: winDisplay, winner: winner });
                break;
            }
        } while (true);
        return attackArr;
    }
    winner(name) {
        let message;
        if (name === this.player.name) {
            message = 'You have won!';
        }
        else {
            message = `${this.target.name} has won!`;
        }
        return message;
    }
    /**
     * Damage formula, based off the attack, hp & level of attacker.
     * @param {Number} attack
     * @param {Number} hp
     * @param {Number} level
     */
    genDamage(attack, hp, level) {
        let damage = 0;
        level = __WEBPACK_IMPORTED_MODULE_0_lodash__["random"](1, level);
        damage = __WEBPACK_IMPORTED_MODULE_0_lodash__["round"]((attack * attack) / (attack + hp) + level);
        return damage;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Attack;



/***/ }),
/* 161 */
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
        _vm.reset();
        _vm.$emit('close')
      }
    }
  }, [_vm._v("X")]), _vm._v(" "), _c('div', {
    staticClass: "modal-header"
  }), _vm._v(" "), _c('table', {
    staticStyle: {
      "height": "505px"
    },
    attrs: {
      "cellpadding": "0",
      "cellspacing": "0",
      "width": "100%"
    }
  }, [_c('tr', [_c('td', {
    staticStyle: {
      "padding-top": "10px"
    },
    attrs: {
      "align": "center",
      "valign": "top"
    }
  }, [_c('table', {
    staticStyle: {
      "font-family": "Impact,sans-serif",
      "font-weight": "normal",
      "font-size": "18pt"
    },
    attrs: {
      "border": "0",
      "cellspacing": "0",
      "cellpadding": "0",
      "width": "600px;"
    }
  }, [_c('tr', [_c('td', {
    attrs: {
      "width": "250",
      "align": "center",
      "valign": "middle"
    }
  }, [_c('div', {
    attrs: {
      "id": "attacker_name"
    }
  }, [_vm._v("Player Name")])]), _vm._v(" "), _c('td', {
    attrs: {
      "width": "100"
    }
  }), _vm._v(" "), _c('td', {
    attrs: {
      "width": "250",
      "align": "center",
      "valign": "middle"
    }
  }, [_c('div', {
    attrs: {
      "id": "defender_name"
    }
  }, [_vm._v("Target Name")])])])]), _vm._v(" "), _c('table', {
    staticStyle: {
      "margin-top": "20px"
    },
    attrs: {
      "border": "0",
      "cellspacing": "0",
      "cellpadding": "0",
      "width": "580",
      "height": "280"
    }
  }, [_c('tr', [_c('td', {
    staticStyle: {
      "background-image": "url('http://placehold.it/250x250')",
      "background-repeat": "no-repeat",
      "background-position": "center center"
    },
    attrs: {
      "width": "270",
      "valign": "middle",
      "align": "center"
    }
  }, [_c('table', [_c('tr', [_c('td', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showTurn === 'target'),
      expression: "showTurn === 'target'"
    }]
  }, [_c('div', {
    staticClass: "targetHit"
  }, [_vm._v(_vm._s(_vm.targetDamage))])])])])]), _vm._v(" "), _c('td', {
    attrs: {
      "width": "40"
    }
  }), _vm._v(" "), _c('td', {
    staticStyle: {
      "background-image": "url('http://placehold.it/250x250')",
      "background-repeat": "no-repeat",
      "background-position": "center center"
    },
    attrs: {
      "width": "270",
      "valign": "middle",
      "align": "center"
    }
  }, [_c('table', [_c('tr', [_c('td', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showTurn === 'player'),
      expression: "showTurn === 'player'"
    }]
  }, [_c('div', {
    staticClass: "playerHit"
  }, [_vm._v(_vm._s(_vm.playerDamage))])])])])])])]), _vm._v(" "), _c('table', {
    staticStyle: {
      "margin-left": "8px",
      "margin-top": "50px"
    },
    attrs: {
      "border": "0",
      "cellspacing": "0",
      "cellpadding": "0",
      "width": "550",
      "height": "40"
    }
  }, [_c('tr', [_c('td', {
    attrs: {
      "width": "245",
      "valign": "top",
      "align": "right"
    }
  }, [_c('div', {
    staticClass: "playerHealth",
    style: ({
      width: _vm.health.player + 'px'
    })
  })]), _vm._v(" "), _c('td', {
    attrs: {
      "width": "60"
    }
  }), _vm._v(" "), _c('td', {
    attrs: {
      "width": "245",
      "valign": "top",
      "align": "left"
    }
  }, [_c('div', {
    staticClass: "targetHealth",
    style: ({
      width: _vm.health.target + 'px'
    })
  })])])]), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showMessage),
      expression: "showMessage"
    }]
  }, [_vm._v(_vm._s(_vm.displayMessage))])])])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showResult),
      expression: "showResult"
    }],
    attrs: {
      "id": "attackResult"
    }
  }, [_vm._v("\n          " + _vm._s(_vm.displayResult) + "\n        ")])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6c6f5aae", module.exports)
  }
}

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(163),
  /* template */
  __webpack_require__(164),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/vagrant/Code/game/resources/assets/js/components/Mobs/Talk.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Talk.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-76442adc", Component.options)
  } else {
    hotAPI.reload("data-v-76442adc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 163 */
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
  created: function created() {
    this.loadQuest();
  },
  data: function data() {
    return {
      quest: null
    };
  },


  methods: {
    loadQuest: function loadQuest() {
      var _this = this;

      axios.get('/quest/' + this.mob.id).then(function (response) {
        _this.quest = response.data;
        console.log(_this.quest);
      });
    }
  },

  props: {
    mob: {
      type: Object,
      required: true
    }
  }

});

/***/ }),
/* 164 */
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
    staticClass: "modal-header"
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "padding": "5px"
    }
  }, [_c('div', {
    staticClass: "col-md-6 col-md-offset2"
  }, [_c('strong', [_vm._v("Talk " + _vm._s())]), _vm._v(" "), _c('div', [_c('a', {
    on: {
      "click": function($event) {
        _vm.$emit('close')
      }
    }
  }, [_vm._v("Back to world")])])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-6 col-md-offset2"
  }, [_c('img', {
    attrs: {
      "src": "http://placehold.it/250x250"
    }
  })])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-76442adc", module.exports)
  }
}

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    attrs: {
      "mob": _vm.mob
    }
  }, [_c('div', [_vm._v("\n\n      " + _vm._s(_vm.mob.name) + " |\n\n      "), _c('a', {
    on: {
      "click": function($event) {
        _vm.showMob = !_vm.showMob
      }
    }
  }, [_c('small', [_vm._v("View")])]), _vm._v(" |\n\n      "), _c('a', {
    on: {
      "click": function($event) {
        _vm.showAttack = true
      }
    }
  }, [_c('small', [_vm._v("Attack")])]), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.mob.type === 'quest'),
      expression: "mob.type === 'quest'"
    }]
  }, [_vm._v(" |\n        "), _c('a', {
    on: {
      "click": function($event) {
        _vm.showQuest = !_vm.showQuest
      }
    }
  }, [_c('small', [_vm._v("Talk")])])])])]), _vm._v(" "), _c('mob-view', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showMob),
      expression: "showMob"
    }],
    attrs: {
      "mob": _vm.mob
    },
    on: {
      "close": function($event) {
        _vm.showMob = !_vm.showMob
      }
    }
  }), _vm._v(" "), _c('mob-talk', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showQuest && _vm.mob.type === 'quest'),
      expression: "showQuest && mob.type === 'quest'"
    }],
    attrs: {
      "mob": _vm.mob
    },
    on: {
      "close": function($event) {
        _vm.showQuest = !_vm.showQuest
      }
    }
  }), _vm._v(" "), _c('mob-attack', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showAttack),
      expression: "showAttack"
    }],
    attrs: {
      "mob": _vm.mob
    },
    on: {
      "close": function($event) {
        _vm.showAttack = false
      }
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7ca5984e", module.exports)
  }
}

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(167),
  /* template */
  __webpack_require__(191),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/vagrant/Code/game/resources/assets/js/components/Backpack.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Backpack.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c13f074", Component.options)
  } else {
    hotAPI.reload("data-v-3c13f074", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Modal_vue__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Modal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Modal_vue__);
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

  components: {
    'bmodal': __WEBPACK_IMPORTED_MODULE_0__Modal_vue___default.a
  }

});

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(169)
}
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(171),
  /* template */
  __webpack_require__(190),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/vagrant/Code/game/resources/assets/js/components/Modal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Modal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cbb3b852", Component.options)
  } else {
    hotAPI.reload("data-v-cbb3b852", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(170);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(14)("653efeea", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cbb3b852\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Modal.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cbb3b852\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Modal.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(13)(undefined);
// imports


// module
exports.push([module.i, "\n.backpack-overlay {\n  position: fixed;\n  box-sizing: border-box;\n  left: 0;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  background: rgba(0, 0, 0, 0.2);\n  z-index: 999;\n  opacity: 1;\n}\n.backpack-overlay .backpack-box {\n  position: relative;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n.backpack {\n  background-color: black;\n  text-align: left;\n  padding: 0;\n  border: 1px solid #333;\n}\n.backpack-header {\n  font-weight: bold;\n  color: #fff;\n}\n.backpack-top-right {\n  float: right;\n  vertical-align: middle;\n}\n.overlay-fade-enter-active, .overlay-fade-leave-active {\n   transition: all 0.2s;\n}\n.overlay-fade-enter, .overlay-fade-leave-active {\n   opacity: 0;\n}\n.nice-modal-fade-enter-active, .nice-modal-fade-leave-active {\n   transition: all 0.4s;\n}\n.nice-modal-fade-enter, .nice-modal-fade-leave-active {\n   opacity: 0;\n   transform: translateY(-20px);\n}\n\n", ""]);

// exports


/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Backpack_Items_vue__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Backpack_Items_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Backpack_Items_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Backpack_Which_vue__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Backpack_Which_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Backpack_Which_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_Draggable_js__ = __webpack_require__(72);
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

  components: {
    'backpack-which': __WEBPACK_IMPORTED_MODULE_1__Backpack_Which_vue___default.a,
    'backpack-items': __WEBPACK_IMPORTED_MODULE_0__Backpack_Items_vue___default.a
  },

  computed: {
    modalClass: function modalClass() {
      return ['backback-box', 'backpack'];
    },
    overlayClass: function overlayClass() {
      return { 'backpack-overlay': true };
    },
    modalStyle: function modalStyle() {
      var w = window.innerWidth / 2 - 305 / 2 + 550;
      return {
        width: '305px',
        height: 'auto',
        position: 'fixed',
        minHeight: '100px',
        left: window.innerWidth / 2 - 305 / 2 + 'px',
        top: '100px'
      };
    }
  },

  data: function data() {
    return {
      items: []
    };
  },


  directives: {
    Draggable: __WEBPACK_IMPORTED_MODULE_2__directives_Draggable_js__["a" /* default */]
  },

  methods: {
    loadBackpack: function loadBackpack(type) {
      var _this = this;

      axios.get('/backpack/' + type).then(function (response) {
        _this.items = response.data;
      });
    }
  },

  mounted: function mounted() {
    this.loadBackpack('regular');
  },


  props: {
    name: {
      type: String,
      required: true
    },
    draggable: {
      type: [Boolean, String]
    }
  }

});

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(173)
}
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(175),
  /* template */
  __webpack_require__(185),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/vagrant/Code/game/resources/assets/js/components/Backpack/Items.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Items.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f81a4cd2", Component.options)
  } else {
    hotAPI.reload("data-v-f81a4cd2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(174);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(14)("eada4aa4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f81a4cd2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Items.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f81a4cd2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Items.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(13)(undefined);
// imports


// module
exports.push([module.i, "\n.backpack-tile {\n  display: block;\n  margin: 0px auto;\n  height: 60px;\n  width: 60px;\n  float: left;\n  background: url('/images/backpack/bp_tile.gif');\n  vertical-align: middle;\n}\n.backpack-item-image {\n  margin: 0px auto;\n  max-width: 55px;\n  max-height: 55px;\n  padding: 0;\n  vertical-align: middle;\n}\n.backpack-image-align {\n  padding: 2px;\n  text-align: center;\n  margin: 0 auto;\n}\n.backpack-check {\n  display: none;\n  width: 0px;\n  height: 0px;\n}\n.border-off {\n  position: relative;\n  border: 0px;\n}\n.border-on {\n  position: relative;\n  border: 2px solid red;\n}\n\n", ""]);

// exports


/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Menu_vue__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Menu_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Menu_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Equipment_Popup_vue__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Equipment_Popup_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Equipment_Popup_vue__);
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
//
//





/* harmony default export */ __webpack_exports__["default"] = ({

  props: {
    items: {
      type: Array,
      required: true
    }
  },

  components: {
    'backpack-menu': __WEBPACK_IMPORTED_MODULE_0__Menu_vue___default.a,
    'item-popup': __WEBPACK_IMPORTED_MODULE_1__Equipment_Popup_vue___default.a
  },

  computed: {
    extraSpace: function extraSpace() {
      var count = this.items.length;
      return 25 - (!count ? 0 : count === 0 ? 1 : count);
    },
    borderClass: function borderClass() {
      return 'border-off';
    }
  },

  data: function data() {
    return {
      showMenu: false,
      active: false,
      drop: [],
      sell: [],
      vault: [],
      dropWarning: false
    };
  },


  methods: {
    getImage: function getImage(item) {
      return '/images/' + item.item.image;
    },
    equipItem: function equipItem(type) {
      this.$emit('change', type);
    },
    dropItem: function dropItem(index) {

      var drop = this.drop,
          border = this.$refs.itemBorder,
          id = this.items[index].id;

      drop.push(id);

      border[index].style.border = 2 + 'px solid red';

      this.dropWarning = drop.length ? true : false;
    },
    submitAction: function submitAction() {
      var _this = this;

      axios.post('/backpack/drop', this.drop).then(function (response) {
        var data = response.data;
        if (data.status === 'ok') {
          _this.$emit('change', 'regular');
        }
      });
    },
    cancelAction: function cancelAction() {
      var border = this.$refs.itemBorder;
      _.times(border.length, function (i) {
        border[i].style.border = 0 + 'px';
      });
      this.drop.splice(0, this.drop.length);
      this.dropWarning = false;
    }
  }

});

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(177)
}
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(179),
  /* template */
  __webpack_require__(180),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/vagrant/Code/game/resources/assets/js/components/Backpack/Menu.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Menu.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-376d0550", Component.options)
  } else {
    hotAPI.reload("data-v-376d0550", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(178);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(14)("280d4e8c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-376d0550\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Menu.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-376d0550\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Menu.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(13)(undefined);
// imports


// module
exports.push([module.i, "\n.backpack-menu {\n  position: absolute;\n\tborder: 1px solid black;\n\tborder-bottom-width: 0;\n\tfont: normal 12px Verdana;\n\tline-height: 18px;\n\tz-index: 100;\n  width: 100px;\n  background-color: #666;\n}\n.backpack a {\n  width: 100%;\n\tdisplay: block;\n\ttext-indent: 3px;\n\tborder-bottom: 1px solid black;\n\tpadding: 1px 0;\n\ttext-decoration: none;\n\tfont-weight: bold;\n}\n.backpack a :hover {\n  background-color: #273F2B;\n}\n\n", ""]);

// exports


/***/ }),
/* 179 */
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


/**
 * Show Menu - Drop down menu for each item in the players backpack.
 * Equip, Drop, Vault, View, Sell..
 */

/* harmony default export */ __webpack_exports__["default"] = ({

  props: {
    item: {
      type: Object,
      required: true
    },
    showMenu: {
      type: [Boolean, Number],
      required: true
    },
    index: {
      type: Number,
      required: true
    }

  },

  data: function data() {
    return {
      menuLinks: []
    };
  },
  created: function created() {
    this.createMenu();
  },


  methods: {
    createMenu: function createMenu() {

      var opts = this.item.item.options,
          menu = this.menuLinks = [];

      _.each(opts, function (val) {
        menu.push({
          name: val
        });
      });
    },
    equip: function equip() {
      var _this = this;

      axios.get('/backpack/equip/' + this.item.id).then(function (response) {
        var data = response.data;
        if (data.status === 'ok') {

          _this.$emit('iequip', _this.item.item.type);
        } else if (data.status === 'fail') {
          console.log('Error in backpack');
        }
      });
    },
    drop: function drop(index) {
      this.$emit('idrop', index);
    },
    vault: function vault(id) {},
    view: function view(id) {}
  }

});

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showMenu === _vm.item.id),
      expression: "showMenu === item.id"
    }],
    staticClass: "backpack-menu"
  }, _vm._l((_vm.menuLinks), function(link) {
    return _c('div', {
      key: link.id,
      attrs: {
        "link": link
      }
    }, [(link.name === 'e') ? _c('div', [_c('a', {
      on: {
        "click": _vm.equip
      }
    }, [_vm._v("Equip")])]) : (link.name === 'd') ? _c('div', [_c('a', {
      on: {
        "click": function($event) {
          _vm.drop(_vm.index)
        }
      }
    }, [_vm._v("Drop")])]) : (link.name === 'z') ? _c('div', [_c('a', {
      on: {
        "click": function($event) {
          _vm.vault(_vm.item.id)
        }
      }
    }, [_vm._v("Vault")])]) : (link.name === 'v') ? _c('div', [_c('a', {
      on: {
        "click": function($event) {
          _vm.view(_vm.item.id)
        }
      }
    }, [_vm._v("View")])]) : _vm._e()])
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-376d0550", module.exports)
  }
}

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(182);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(14)("55639178", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4ccc8475\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Popup.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4ccc8475\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Popup.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(13)(undefined);
// imports


// module
exports.push([module.i, "\n.item-popup {\n  position: absolute;\n\tborder: 1px solid #333;\n\tbackground-color: #000;\n  color: #fff;\n  z-index: 1000;\n\tfont-family: Verdana;\n\tfont-size: 9pt;\n  width: 275px;\n}\n.item-left {\n  float: left;\n  position: relative;\n}\n.item-right {\n  float: right;\n  position: relative;\n}\n.item-name {\n  font-weight: bold;\n  font-size: 14px;\n}\n.common {\n  color: #DCDCDC;\n}\n.uncommon {\n}\n.rare {\n}\n\n", ""]);

// exports


/***/ }),
/* 183 */
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

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    popupClass: function popupClass() {
      return 'item-popup';
    },
    nameClass: function nameClass() {
      var rarity = this.item.item.rarity;
      return ['item-name', '' + _.toLower(rarity)];
    },
    gems: function gems() {
      return _.range(this.item.gems, 5);
    },
    image: function image() {
      return '/images/' + this.item.item.image;
    }
  },

  filters: {
    startCase: function startCase(value) {
      return _.startCase(value);
    },
    addCommas: function addCommas(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },

  methods: {
    gemInc: function gemInc(key) {
      var gems = this.item.gems >= 5 ? 5 : this.item.gems,
          block = ['critical', 'block', 'rampage'].includes(key);

      return !block && gems > 0 && gems <= 5 ? _.round(.25 + gems) : 1;
    }
  }
});

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: _vm.popupClass
  }, [_c('div', {
    staticClass: "item-left"
  }, [_c('span', {
    class: _vm.nameClass
  }, [_vm._v(_vm._s(_vm.item.item.name))]), _vm._v(" "), (_vm.item.item.level) ? _c('div', [_c('small', [_vm._v("[Requires Level " + _vm._s(_vm.item.item.level) + "]")])]) : _vm._e(), _vm._v(" "), (_vm.item.item.bound) ? _c('div', [_c('small', [_vm._v("[Playerbound]")])]) : _vm._e(), _vm._v(" "), (_vm.item.item.inventory) ? _c('div', [_c('small', [_vm._v("[Inventory]")])]) : _vm._e(), _vm._v(" "), _c('div', [_c('small', [_vm._v("[Slot - " + _vm._s(_vm.item.item.slot) + "]")])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "padding": "5px"
    }
  }), _vm._v(" "), _vm._l((_vm.item.stats), function(stat, key) {
    return _c('div', {
      key: key,
      attrs: {
        "stat": stat
      }
    }, [(stat > 0 && key != 'item_id') ? _c('span', [_vm._v("\n        +" + _vm._s(_vm._f("addCommas")(stat * _vm.gemInc(key), stat)) + " " + _vm._s(_vm._f("startCase")(key, key)) + "\n      ")]) : _vm._e()])
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "item-right"
  }, [_c('div', {
    staticStyle: {
      "display": "inline:block",
      "padding-right": "3px"
    },
    attrs: {
      "align": "center"
    }
  }, [_c('img', {
    staticStyle: {
      "padding-right": "3px"
    },
    attrs: {
      "src": _vm.image
    }
  })]), _vm._v(" "), _c('div', {
    staticStyle: {
      "display": "inline:block",
      "padding-right": "3px"
    },
    attrs: {
      "align": "center"
    }
  }, [_vm._l((_vm.item.gems), function(n) {
    return _c('i', {
      staticClass: "fa fa-star",
      attrs: {
        "aria-hidden": "true"
      }
    })
  }), _vm._v(" "), _vm._l((_vm.gems), function(n) {
    return _c('i', {
      staticClass: "fa fa-star-o",
      attrs: {
        "aria-hidden": "true"
      }
    })
  })], 2)]), _vm._v(" "), _c('div', {
    staticStyle: {
      "clear": "both",
      "position": "relative"
    }
  }, [_c('div', {
    staticStyle: {
      "padding": "10px"
    }
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "display": "block",
      "font-weight": "bold"
    }
  }, [_c('small', [_c('em', [_vm._v(_vm._s(_vm.item.item.description))])])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "padding": "5px"
    }
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "display": "block",
      "color": "yellow"
    }
  }, [_c('small', [_c('em', [_vm._v(_vm._s(_vm.item.item.info))])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4ccc8475", module.exports)
  }
}

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._l((_vm.items), function(item, index) {
    return _c('div', {
      key: item.id,
      staticClass: "backpack-tile",
      attrs: {
        "item": item
      }
    }, [_c('div', {
      ref: "itemBorder",
      refInFor: true,
      class: _vm.borderClass,
      attrs: {
        "borderid": item.id
      }
    }, [_c('div', {
      staticClass: "backpack-image-align"
    }, [_c('img', {
      staticClass: "backpack-item-image",
      attrs: {
        "src": _vm.getImage(item)
      },
      on: {
        "mouseover": function($event) {
          _vm.active = item.id
        },
        "mouseout": function($event) {
          _vm.active = !_vm.active
        },
        "click": function($event) {
          $event.preventDefault();
          _vm.showMenu = item.id
        }
      }
    })]), _vm._v(" "), _c('item-popup', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.active === item.id),
        expression: "active === item.id"
      }],
      staticClass: "menu-popup",
      attrs: {
        "item": item
      }
    }), _vm._v(" "), _c('backpack-menu', {
      attrs: {
        "showMenu": _vm.showMenu,
        "item": item,
        "index": index
      },
      on: {
        "iequip": _vm.equipItem,
        "idrop": _vm.dropItem
      }
    }), _vm._v(" "), _c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.drop),
        expression: "drop"
      }],
      staticClass: "backpack-check",
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "value": item.id,
        "checked": Array.isArray(_vm.drop) ? _vm._i(_vm.drop, item.id) > -1 : (_vm.drop)
      },
      on: {
        "__c": function($event) {
          var $$a = _vm.drop,
            $$el = $event.target,
            $$c = $$el.checked ? (true) : (false);
          if (Array.isArray($$a)) {
            var $$v = item.id,
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && (_vm.drop = $$a.concat($$v))
            } else {
              $$i > -1 && (_vm.drop = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
            }
          } else {
            _vm.drop = $$c
          }
        }
      }
    }), _vm._v(" "), _c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.sell),
        expression: "sell"
      }],
      staticClass: "backpack-check",
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "value": item.id,
        "checked": Array.isArray(_vm.sell) ? _vm._i(_vm.sell, item.id) > -1 : (_vm.sell)
      },
      on: {
        "__c": function($event) {
          var $$a = _vm.sell,
            $$el = $event.target,
            $$c = $$el.checked ? (true) : (false);
          if (Array.isArray($$a)) {
            var $$v = item.id,
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && (_vm.sell = $$a.concat($$v))
            } else {
              $$i > -1 && (_vm.sell = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
            }
          } else {
            _vm.sell = $$c
          }
        }
      }
    }), _vm._v(" "), _c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.vault),
        expression: "vault"
      }],
      staticClass: "backpack-check",
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "value": item.id,
        "checked": Array.isArray(_vm.vault) ? _vm._i(_vm.vault, item.id) > -1 : (_vm.vault)
      },
      on: {
        "__c": function($event) {
          var $$a = _vm.vault,
            $$el = $event.target,
            $$c = $$el.checked ? (true) : (false);
          if (Array.isArray($$a)) {
            var $$v = item.id,
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && (_vm.vault = $$a.concat($$v))
            } else {
              $$i > -1 && (_vm.vault = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
            }
          } else {
            _vm.vault = $$c
          }
        }
      }
    })], 1)])
  }), _vm._v(" "), _vm._l((_vm.extraSpace), function(i) {
    return _c('div', {
      staticClass: "backpack-tile",
      on: {
        "click": function($event) {
          _vm.showMenu = false
        }
      }
    })
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.dropWarning === true),
      expression: "dropWarning === true"
    }],
    staticStyle: {
      "inline": "block"
    },
    attrs: {
      "align": "center"
    }
  }, [_vm._m(0), _vm._v(" "), _c('button', {
    staticClass: "btn",
    on: {
      "click": _vm.submitAction
    }
  }, [_vm._v("Submit")]), _vm._v(" "), _c('button', {
    staticClass: "btn",
    on: {
      "click": _vm.cancelAction
    }
  }, [_vm._v("Cancel")])])], 2)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_c('strong', [_vm._v("Are you sure you would like to perform this action?")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f81a4cd2", module.exports)
  }
}

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(187)
}
var Component = __webpack_require__(3)(
  /* script */
  null,
  /* template */
  __webpack_require__(189),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/vagrant/Code/game/resources/assets/js/components/Backpack/Which.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Which.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f9df7518", Component.options)
  } else {
    hotAPI.reload("data-v-f9df7518", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(188);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(14)("79829496", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f9df7518\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Which.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f9df7518\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Which.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(13)(undefined);
// imports


// module
exports.push([module.i, "\n.backpack-which-top {\n  display: flex;\n  height: 21px;\n  background: url('/images/backpack/bp_top_border.gif');\n  background-repeat: repeat-x;\n  margin: 0 auto;\n  text-align: center;\n}\n.backpack-which-top-right {\n  width: 7px;\n  background: url('/images/backpack/bp_left_b.gif');\n  background-repeat: repeat-y;\n}\n\n", ""]);

// exports


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "backpack-which-top"
  }, [_c('img', {
    attrs: {
      "src": "/images/backpack/bp_top_regular.gif"
    },
    on: {
      "click": function($event) {
        _vm.$emit('change', 'regular')
      }
    }
  }), _vm._v(" "), _c('img', {
    attrs: {
      "src": "/images/backpack/bp_top_quest_2.gif"
    },
    on: {
      "click": function($event) {
        _vm.$emit('change', 'quest')
      }
    }
  }), _vm._v(" "), _c('img', {
    attrs: {
      "src": "/images/backpack/bp_top_orb_2.gif"
    },
    on: {
      "click": function($event) {
        _vm.$emit('change', 'orbs')
      }
    }
  }), _vm._v(" "), _c('img', {
    attrs: {
      "src": "/images/backpack/bp_top_potion_2.gif"
    },
    on: {
      "click": function($event) {
        _vm.$emit('change', 'potions')
      }
    }
  }), _vm._v(" "), _c('img', {
    attrs: {
      "src": "/images/backpack/bp_top_key_2.gif"
    },
    on: {
      "click": function($event) {
        _vm.$emit('change', 'keys')
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "backpack-which-top-right"
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "padding": "1px"
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f9df7518", module.exports)
  }
}

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "overlay-fade"
    }
  }, [_c('div', {
    ref: "overlay",
    class: _vm.overlayClass,
    attrs: {
      "data-modal": _vm.name
    }
  }, [_c('div', {
    directives: [{
      name: "draggable",
      rawName: "v-draggable"
    }],
    ref: "modal",
    class: _vm.modalClass,
    style: (_vm.modalStyle)
  }, [_c('span', {
    staticClass: "backpack-header"
  }, [_vm._v("Backpack")]), _vm._v(" "), _c('div', {
    staticClass: "backpack-top-right",
    on: {
      "click": function($event) {
        _vm.$emit('close')
      }
    }
  }, [_c('img', {
    attrs: {
      "src": "http://outwar.com/images/x.jpg"
    }
  })]), _vm._v(" "), _c('backpack-which', {
    on: {
      "change": _vm.loadBackpack
    }
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "float": "left"
    }
  }, [_c('backpack-items', {
    attrs: {
      "items": _vm.items
    },
    on: {
      "change": _vm.loadBackpack
    }
  })], 1)], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-cbb3b852", module.exports)
  }
}

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('bmodal', {
    attrs: {
      "name": "bpWin",
      "draggable": ".backpack"
    },
    on: {
      "close": function($event) {
        _vm.$emit('close')
      }
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3c13f074", module.exports)
  }
}

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(193),
  /* template */
  __webpack_require__(208),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/vagrant/Code/game/resources/assets/js/components/Equipment.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Equipment.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f7ba4590", Component.options)
  } else {
    hotAPI.reload("data-v-f7ba4590", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Equipment_Modal_vue__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Equipment_Modal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Equipment_Modal_vue__);
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

  components: {
    'equipment-modal': __WEBPACK_IMPORTED_MODULE_0__Equipment_Modal_vue___default.a
  }

});

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(195)
}
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(197),
  /* template */
  __webpack_require__(207),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/vagrant/Code/game/resources/assets/js/components/Equipment/Modal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Modal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1a49b414", Component.options)
  } else {
    hotAPI.reload("data-v-1a49b414", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(196);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(14)("a4bf2954", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1a49b414\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Modal.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1a49b414\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Modal.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(13)(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Equipment */\n.equipment-overlay {\n  position: fixed;\n  box-sizing: border-box;\n  left: 0;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  background: rgba(0, 0, 0, 0.2);\n  z-index: 199;\n  opacity: 1;\n}\n.equipment-overlay .equipment-box {\n  position: relative;\n  /*overflow: hidden;*/\n  box-sizing: border-box;\n}\n.equipment {\n  background-color: black;\n  text-align: left;\n  padding: 0;\n  border: 1px solid #333;\n}\n.equipment-header {\n  font-weight: bold;\n  color: #fff;\n}\n.equipment-top-right {\n  float: right;\n  vertical-align: middle;\n}\n\n/* Transitions */\n.overlay-fade-enter-active, .overlay-fade-leave-active {\n  transition: all 0.2s;\n}\n.overlay-fade-enter, .overlay-fade-leave-active {\n  opacity: 0;\n}\n.nice-modal-fade-enter-active, .nice-modal-fade-leave-active {\n  transition: all 0.4s;\n}\n.nice-modal-fade-enter, .nice-modal-fade-leave-active {\n  opacity: 0;\n  transform: translateY(-20px);\n}\n\n", ""]);

// exports


/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_Draggable_js__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Equipment_vue__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Equipment_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Equipment_vue__);
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

  components: {
    'equipment-items': __WEBPACK_IMPORTED_MODULE_1__Equipment_vue___default.a
  },

  computed: {
    overlayClass: function overlayClass() {
      return 'equipment-overlay';
    },
    modalClass: function modalClass() {
      return ['equipment-box', 'equipment'];
    },
    modalStyle: function modalStyle() {
      var w = window.innerWidth / 2 - 305 / 2 + 550;
      return {
        width: '305px',
        height: 'auto',
        position: 'fixed',
        minHeight: '100px',
        left: window.innerWidth / 2 - 305 / 2 + 'px',
        top: '100px'
      };
    }
  },

  directives: {
    Draggable: __WEBPACK_IMPORTED_MODULE_0__directives_Draggable_js__["a" /* default */]
  },

  data: function data() {
    return {
      items: null

    };
  },


  methods: {
    loadEquipment: function loadEquipment() {
      var _this = this;

      axios.get('/equipment').then(function (response) {

        _this.items = response.data;

        //console.log(this.items);
      });
    }
  },

  mounted: function mounted() {
    this.loadEquipment();
  },


  props: {
    name: {
      type: String,
      required: false
    }
  }

});

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(199);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(14)("211eb717", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cf889052\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Equipment.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cf889052\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Equipment.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(13)(undefined);
// imports


// module
exports.push([module.i, "\n.equipment-items[data-v-cf889052] {\n  position: relative;\n  width: 300px;\n  height: 385px;\n  padding-top: 10px;\n  margin: 0 auto;\n  background-color: #000000;\n}\n\n", ""]);

// exports


/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Popup_vue__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Popup_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Popup_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Slot_vue__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Slot_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Slot_vue__);
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

  props: ['items'],

  components: {
    Popup: __WEBPACK_IMPORTED_MODULE_0__Popup_vue___default.a,
    'item-slot': __WEBPACK_IMPORTED_MODULE_1__Slot_vue___default.a
  },

  computed: {
    slots: function slots() {
      return getSlots();
    }
  },

  methods: {
    getImage: function getImage(slot) {
      var item = _.find(this.items, function (item) {
        return item.item.slot === slot;
      });
      return item ? item.item.image : null;
    },
    whereSlot: function whereSlot(slot) {
      var item = _.find(this.items, function (obj) {
        return obj.item.slot === slot;
      });
      return item ? item : null;
    }
  }

});

var getSlots = function getSlots() {
  return ['Head', 'Neck', 'Weapon', 'Body', 'Shield', 'Belt', 'Pants', 'Ring', 'Foot', 'Orbs'];
};

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(202)
}
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(204),
  /* template */
  __webpack_require__(205),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/vagrant/Code/game/resources/assets/js/components/Equipment/Slot.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Slot.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-48c8a776", Component.options)
  } else {
    hotAPI.reload("data-v-48c8a776", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(203);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(14)("5d577d52", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-48c8a776\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Slot.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-48c8a776\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Slot.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(13)(undefined);
// imports


// module
exports.push([module.i, "\n.head {\n  border: 1px solid #666;\n  position: absolute;\n  left: 118px;\n  top: 7px;\n  width: 62px;\n  height: 46px;\n}\n.head img {\n  max-width: 100%;\n  max-height: 46px;\n  display: block;\n  margin: auto;\n}\n.neck {\n  border: 1px solid #666;\n  position: absolute;\n  left: 197px;\n  top: 12px;\n  width: 41px;\n  height: 41px;\n}\n.neck img {\n  display: block;\n  margin: auto;\n}\n.weapon {\n  border: 1px solid #666;\n  position: absolute;\n  left: 45px;\n  top: 67px;\n  width: 56px;\n  height: 96px;\n}\n.weapon img {\n  display: block;\n  margin: auto;\n}\n.body {\n  border: 1px solid #666;\n  position: absolute;\n  left: 121px;\n  top: 67px;\n  width: 56px;\n  height: 96px;\n}\n.body img {\n  max-width: 100%;\n  max-height: 96px;\n  display: block;\n  margin: auto;\n}\n.shield {\n  border: 1px solid #666;\n  position: absolute;\n  left: 198px;\n  top: 67px;\n  width: 56px;\n  height: 96px;\n}\n.shield img {\n  display: block;\n  margin: auto;\n}\n.pants {\n  border: 1px solid #666;\n  position: absolute;\n  left: 118px;\n  top: 175px;\n  width: 62px;\n  height: 75px;\n}\n.pants img {\n  display: block;\n  margin: auto;\n}\n.belt {\n  border: 1px solid #666;\n  position: absolute;\n  left: 61px;\n  top: 192px;\n  width: 41px;\n  height: 41px;\n}\n.belt img {\n  display: block;\n  margin: auto;\n}\n.ring {\n  border: 1px solid #666;\n  position: absolute;\n  left: 197px;\n  top: 192px;\n  width: 41px;\n  height: 41px;\n}\n.ring img {\n  display: block;\n  margin: auto;\n}\n.foot {\n  border: 1px solid #666;\n  position: absolute;\n  left: 118px;\n  top: 262px;\n  width: 62px;\n  height: 66px;\n}\n.foot img {\n  display: block;\n  margin: auto;\n}\n.orbs {\n  border: 1px solid #666;\n  position: absolute;\n  left: 99px;\n  top: 346px;\n  width: 99px;\n  height: 32px;\n}\n\n", ""]);

// exports


/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Popup_vue__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Popup_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Popup_vue__);
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

  props: {
    name: {
      type: String,
      required: true
    },
    item: {
      type: Object
    }
  },

  components: {
    Popup: __WEBPACK_IMPORTED_MODULE_0__Popup_vue___default.a
  },

  computed: {
    slotClass: function slotClass() {
      return this.name;
    },
    image: function image() {
      return '/images/' + this.item.item.image;
    }
  },

  data: function data() {
    return {
      show: false
    };
  },


  methods: {
    remove: function remove() {
      var _this = this;

      axios.get('/equipment/remove/' + this.item.id).then(function (response) {
        _this.item = null;
      });
    }
  }

});

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: _vm.slotClass
  }, [(_vm.item) ? _c('div', [_c('img', {
    attrs: {
      "src": _vm.image
    },
    on: {
      "mouseover": function($event) {
        _vm.show = _vm.item.id
      },
      "mouseout": function($event) {
        _vm.show = !_vm.show
      },
      "click": _vm.remove
    }
  }), _vm._v(" "), (_vm.show === _vm.item.id) ? _c('popup', {
    attrs: {
      "item": _vm.item
    }
  }) : _vm._e()], 1) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-48c8a776", module.exports)
  }
}

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "equipment-items"
  }, _vm._l((_vm.slots), function(slot, index) {
    return _c('div', {
      key: index,
      slot: slot
    }, [_c('item-slot', {
      attrs: {
        "name": slot.toLowerCase(),
        "item": _vm.whereSlot(slot)
      }
    })], 1)
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-cf889052", module.exports)
  }
}

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "overlay-fade"
    }
  }, [_c('div', {
    ref: "overlay",
    class: _vm.overlayClass,
    attrs: {
      "data-modal": _vm.name
    }
  }, [_c('div', {
    directives: [{
      name: "draggable",
      rawName: "v-draggable"
    }],
    ref: "modal",
    class: _vm.modalClass,
    style: (_vm.modalStyle)
  }, [_c('span', {
    staticClass: "equipment-header"
  }, [_vm._v("Equipment")]), _vm._v(" "), _c('div', {
    staticClass: "equipment-top-right",
    on: {
      "click": function($event) {
        _vm.$emit('close')
      }
    }
  }, [_c('img', {
    attrs: {
      "src": "http://outwar.com/images/x.jpg"
    }
  })]), _vm._v(" "), _c('equipment-items', {
    attrs: {
      "items": _vm.items
    }
  })], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1a49b414", module.exports)
  }
}

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('equipment-modal', {
    attrs: {
      "name": "eqWin"
    },
    on: {
      "close": function($event) {
        _vm.$emit('close')
      }
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f7ba4590", module.exports)
  }
}

/***/ }),
/* 209 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[115]);