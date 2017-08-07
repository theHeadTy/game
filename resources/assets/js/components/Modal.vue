<template>
  <transition name="overlay-fade">

    <div ref="overlay" class="backpack-overlay" :data-modal="name">
        <div ref="modal" :class="modalClass" :style="modalStyle">
          Backpack
          <div class="backpack-top-right" @click="$emit('close')">
            <img src="http://outwar.com/images/x.jpg">
          </div>

          <backpack-which></backpack-which>

          <div style="float:left;">

          <div class="backpack-tile" v-for="(item, index) in items" :key="item.id" :item="item">

            <!--<div :border-id="index" style="display:inline-block;height:100%;vertical-align:middle;">-->

            <div :border-id="index" style="position: relative">

              <img id="index"
                class="backpack-item-image"
                :src="item.image"
                @click="makeMenu($event, item);">

              <backpack-links
                :menu="menu"
                :item="item"
                :showMenu="showMenu">
              </backpack-links>

              <backpack-actions
                :item="item">
              </backpack-actions>

            </div>
          </div>

          <div v-for="n in extraSlots" class="backpack-tile"></div>

        </div>

      </div>
    </div>
  </transition>
</template>

<script>

import Vue from 'vue'
import BackpackMenu from './../mixins/BackpackMenu.vue'
import Links from './Backpack/Links.vue'
import Which from './Backpack/Which.vue'
import Actions from './Backpack/Actions.vue'

import axios from 'axios'
import * as _ from 'lodash'


export default {
  mixins: [BackpackMenu],
  name: 'bmodal',
  props: {
    name: {
      type: String,
      required: true
    },
    draggable: {
      type: [String, Boolean],
      default: false
    },
    classes: {
      type: [String, Array],
      default: 'backpack'
    }

  },

  components: {
    'backpack-which': Which,
    'backpack-links': Links,
    'backpack-actions': Actions
  },

  computed: {
    modalClass() {
      return ['backback-box', this.classes]
    },
    modalStyle() {
      let w = (window.innerWidth / 2) - (305 / 2);
      return {
        width: '305px',
        height: 'auto',
        position: 'fixed',
        minHeight: '100px',
        left: w+'px',
        top: '185px'
      }
    },
    extraSlots() {
      let len = this.items.length
      return 25 - ((len === 0) ? 1 : len)
    }
  },

  data() {
    return {
      items: [],
      dropItems: [],
    }
  },

  mounted() {
    this.loadBackpack();
  },

  methods: {
    loadBackpack() {
      axios.get('/backpack/regular').then(response => {
        this.items = response.data;
      })
    },
  }

}


</script>

<style>

.backpack-overlay {
  position: fixed;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
  opacity: 1;
}

.backpack-overlay .backpack-box {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.backpack {
  background-color: black;
  text-align: left;
  padding: 0;
  border: 1px solid #333;
}

.backpack-top-right {
  float: right;
}

.overlay-fade-enter-active, .overlay-fade-leave-active {
   transition: all 0.2s;
 }
 .overlay-fade-enter, .overlay-fade-leave-active {
   opacity: 0;
 }
 .nice-modal-fade-enter-active, .nice-modal-fade-leave-active {
   transition: all 0.4s;
 }
 .nice-modal-fade-enter, .nice-modal-fade-leave-active {
   opacity: 0;
   transform: translateY(-20px);
 }


.backpack-tile {
  display: block;
  margin: 0px auto;
  height: 60px;
  width: 60px;
  float: left;
  background: url('/images/backpack/bp_tile.gif');
}

.backpack-item-image {
  /*position: absolute;
  left: 0px;
  top: 0px;*/
  margin: 0px auto;
  max-width: 55px;
  max-height: 55px;
  padding: 2px;
}

.backpack-check {
  display: none;
}


.backpack-menu {
  position: absolute;
	border: 1px solid black;
	border-bottom-width: 0;
	font: normal 12px Verdana;
	line-height: 18px;
	z-index: 100;
  width: 100px;
  background-color: #666;
}

/* @todo - this goes in backpack menu component  as scoped */
.backpack a {
  width: 100%;
	display: block;
	text-indent: 3px;
	border-bottom: 1px solid black;
	padding: 1px 0;
	text-decoration: none;
	font-weight: bold;
}

.backpack a:hover {
  background-color: #273F2B;
}


</style>
