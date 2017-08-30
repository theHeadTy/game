webpackJsonp([0],{

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(335),
  /* template */
  __webpack_require__(336),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/vagrant/Code/game/resources/assets/js/components/Mobs/Quest/Accept.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Accept.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3405425b", Component.options)
  } else {
    hotAPI.reload("data-v-3405425b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 335:
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


/* harmony default export */ __webpack_exports__["default"] = ({
  created: function created() {
    this.acceptQuest();
  },


  methods: {
    acceptQuest: function acceptQuest() {
      var _this = this;

      axios.get('/quest/accept/' + this.quest.id).then(function (res) {
        _this.$emit('accept', true);
      });
    }
  },

  props: {
    quest: {
      type: Object,
      reuired: true
    },
    accepted: {
      type: [Number, Boolean],
      required: true
    }
  }

});

/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.accepted === _vm.quest.id) ? _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    staticStyle: {
      "padding": "5px"
    }
  }, [_c('p', [_vm._v(" " + _vm._s(_vm.quest.accepted) + " ")]), _vm._v(" "), _c('a', {
    on: {
      "click": function($event) {
        _vm.$emit('close')
      }
    }
  }, [_vm._v("Go back")])])]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3405425b", module.exports)
  }
}

/***/ })

});