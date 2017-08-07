webpackJsonp([2],{

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(184);


/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__equipment_backpack__ = __webpack_require__(185);





var backpack = new __WEBPACK_IMPORTED_MODULE_2__equipment_backpack__["a" /* Backpack */]();

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);


const modal = __webpack_require__(186);
class Backpack {
    constructor() {
        this.main = document.getElementById('playerBackpack');
        this.all = document.getElementsByClassName('whichBackpack');
        this.close = document.getElementById('bpWin_close');
        this.mainBackpackClick();
    }
    mainBackpackClick() {
        this.main.addEventListener('mouseup', () => {
            __WEBPACK_IMPORTED_MODULE_1_axios___default.a.get('/backpack/regular').then((response) => {
                let bp = modal.createModal('Backpack', 'bpWin', 316);
                bp.innerHTML = response.data;
                this.toggleEvents();
                this.closeBackpack();
            });
        });
        this.main.removeEventListener('mouseup', () => { });
    }
    toggleEvents() {
        console.time('#f1');
        let elems = this.all;
        __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](elems, (val) => {
            __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](['click', 'ontouchstart'], (e) => {
                val.addEventListener(e, () => {
                    this.loadPage(val.id);
                }, false);
            });
        });
        console.timeEnd('#f1');
    }
    loadPage(which) {
        __WEBPACK_IMPORTED_MODULE_1_axios___default.a.get('/backpack/' + which).then((response) => {
            document.getElementById('bpWin_content').innerHTML = response.data;
            this.toggleEvents();
            this.closeBackpack();
        });
    }
    closeBackpack() {
        document.getElementById('bpWin_close').addEventListener('mouseup', () => {
            modal.closeWindow('bpWin');
        });
        document.getElementById('bpWin_close').removeEventListener('mouseup', () => { });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Backpack;



/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (immutable) */ __webpack_exports__["createModal"] = createModal;
/* harmony export (immutable) */ __webpack_exports__["closeWindow"] = closeWindow;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drag__ = __webpack_require__(187);

//import * as $ from 'jquery';

/**
 * Creates a modal (window) page.
 * @param  {String} label
 * @param  {Any} name
 * @param  {Number} width
 * @param  {Number} height
 * @return void|{HTMLElement}
 */
function createModal(label, name, width, height) {

	width = width || 314;
	height = height || 100;

	if (document.getElementById(name)) {
		closeWindow(name);
		return false;
	}

	var modalWindow = document.createElement('div'),
	    w = window.innerWidth / 2 - width / 2,
	    widthCalc = width === 314 ? w + 310 : w;

	$(modalWindow).css({
		width: width + 'px',
		height: 'auto',
		minHeight: height + 'px',
		position: 'absolute',
		top: '185px',
		left: widthCalc + 'px',
		background: '#000',
		border: '1px outset #333'
	}).addClass('drag').attr('id', name);

	/* @todo redo this */
	var contents = '\n\t\t\t<table bgcolor="#333333" id="' + name + '_handle" style="padding:2px;margin:0px;width:' + width + 'px" cellspacing="0" cellpadding="0">\n\t\t\t  <tr>\n\t\t\t    <td style="text-align:left">' + label + '</td>\n\t\t\t\t\t  <td style="text-align:right">\n\t\t\t\t\t\t  <img id="' + name + '_close" src="http://outwar.com/images/x.jpg">\n\t\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t  </table>\n\t\t\t<div id="' + name + '_content"></div>';

	modalWindow.innerHTML = contents;

	var tbody = document.getElementsByTagName('body')[0];

	tbody.appendChild(modalWindow);

	var theHandle = document.getElementById(name + "_handle"),
	    theRoot = document.getElementById(name);

	__WEBPACK_IMPORTED_MODULE_0__drag__["a" /* default */].init(theHandle, theRoot);

	var content = document.getElementById(name + '_content');

	content.innerHTML = '<div text-align="center">...retrieving data...</div>';

	return content;
}

/**
 * Close modal window
 * @param {Any} name
 * @return void
 */
function closeWindow(name) {
	var modal = document.getElementById(name),
	    tbody = void 0;
	//oldWin.style.zIndex = -1;
	tbody = document.getElementsByTagName('body')[0];
	tbody.removeChild(modal);
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(19)))

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**************************************************
 * dom-drag.js
 * 09.25.2001
 * www.youngpup.net
 **************************************************
 * 10.28.2001 - fixed minor bug where events
 * sometimes fired off the handle, not the root.
 **************************************************/

var Drag = {

	obj: null,

	init: function init(o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper) {
		o.onmousedown = Drag.start;

		o.hmode = bSwapHorzRef ? false : true;
		o.vmode = bSwapVertRef ? false : true;

		o.root = oRoot && oRoot != null ? oRoot : o;

		if (o.hmode && isNaN(parseInt(o.root.style.left))) o.root.style.left = "0px";
		if (o.vmode && isNaN(parseInt(o.root.style.top))) o.root.style.top = "0px";
		if (!o.hmode && isNaN(parseInt(o.root.style.right))) o.root.style.right = "0px";
		if (!o.vmode && isNaN(parseInt(o.root.style.bottom))) o.root.style.bottom = "0px";

		o.minX = typeof minX != 'undefined' ? minX : null;
		o.minY = typeof minY != 'undefined' ? minY : null;
		o.maxX = typeof maxX != 'undefined' ? maxX : null;
		o.maxY = typeof maxY != 'undefined' ? maxY : null;

		o.xMapper = fXMapper ? fXMapper : null;
		o.yMapper = fYMapper ? fYMapper : null;

		o.root.onDragStart = new Function();
		o.root.onDragEnd = new Function();
		o.root.onDrag = new Function();
	},

	start: function start(e) {
		var o = Drag.obj = this;
		e = Drag.fixE(e);
		var y = parseInt(o.vmode ? o.root.style.top : o.root.style.bottom);
		var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right);
		o.root.onDragStart(x, y);

		o.lastMouseX = e.clientX;
		o.lastMouseY = e.clientY;

		if (o.hmode) {
			if (o.minX != null) o.minMouseX = e.clientX - x + o.minX;
			if (o.maxX != null) o.maxMouseX = o.minMouseX + o.maxX - o.minX;
		} else {
			if (o.minX != null) o.maxMouseX = -o.minX + e.clientX + x;
			if (o.maxX != null) o.minMouseX = -o.maxX + e.clientX + x;
		}

		if (o.vmode) {
			if (o.minY != null) o.minMouseY = e.clientY - y + o.minY;
			if (o.maxY != null) o.maxMouseY = o.minMouseY + o.maxY - o.minY;
		} else {
			if (o.minY != null) o.maxMouseY = -o.minY + e.clientY + y;
			if (o.maxY != null) o.minMouseY = -o.maxY + e.clientY + y;
		}

		document.onmousemove = Drag.drag;
		document.onmouseup = Drag.end;

		return false;
	},

	drag: function drag(e) {
		e = Drag.fixE(e);
		var o = Drag.obj;

		var ey = e.clientY;
		var ex = e.clientX;
		var y = parseInt(o.vmode ? o.root.style.top : o.root.style.bottom);
		var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right);
		var nx, ny;

		if (o.minX != null) ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
		if (o.maxX != null) ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
		if (o.minY != null) ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
		if (o.maxY != null) ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);

		nx = x + (ex - o.lastMouseX) * (o.hmode ? 1 : -1);
		ny = y + (ey - o.lastMouseY) * (o.vmode ? 1 : -1);

		if (o.xMapper) nx = o.xMapper(y);else if (o.yMapper) ny = o.yMapper(x);

		Drag.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
		Drag.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
		Drag.obj.lastMouseX = ex;
		Drag.obj.lastMouseY = ey;

		Drag.obj.root.onDrag(nx, ny);
		return false;
	},

	end: function end() {
		document.onmousemove = null;
		document.onmouseup = null;
		Drag.obj.root.onDragEnd(parseInt(Drag.obj.root.style[Drag.obj.hmode ? "left" : "right"]), parseInt(Drag.obj.root.style[Drag.obj.vmode ? "top" : "bottom"]));
		Drag.obj = null;
	},

	fixE: function fixE(e) {
		if (typeof e == 'undefined') e = window.event;
		if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
		if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
		return e;
	}
};

/* harmony default export */ __webpack_exports__["a"] = (Drag);

/***/ })

},[183]);