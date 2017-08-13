<template>
  <transition name="overlay-fade">
    <div ref="overlay" :class="overlayClass" :data-modal="name">
      <div v-draggable ref="modal" :class="modalClass" :style="modalStyle">
        <span class="backpack-header">Backpack</span>
        <div class="backpack-top-right" @click="$emit('close')">
          <img src="http://outwar.com/images/x.jpg">
        </div>

        <backpack-which @change="loadBackpack"></backpack-which>

        <div style="float:left;">

          <backpack-items
            @change="loadBackpack" :items="items">
          </backpack-items>

        </div>

      </div>

    </div>

  </transition>
</template>

<script>
//import Vue from 'vue'
import Items from './Backpack/Items.vue'
import Which from './Backpack/Which.vue'
import Draggable from './../directives/Draggable.js'

export default {

  components: {
    'backpack-which': Which,
    'backpack-items': Items,
  },

  computed: {
    modalClass() {
      return ['backback-box', 'backpack']
    },
    overlayClass () {
      return { 'backpack-overlay': true }
    },
    modalStyle() {
      let w = (window.innerWidth / 2) - (305 / 2) + 550
      return {
        width: '305px',
        height: 'auto',
        position: 'fixed',
        minHeight: '100px',
        left: (window.innerWidth / 2) - (305 / 2)+'px',
        top: '100px'
      }
    }
  },

  data() {
    return {
      items: []
    }
  },

  directives: {
    Draggable
  },

  methods: {
    loadBackpack(type) {
      axios.get(`/backpack/${type}`).then(response => {

        this.items = response.data;

        //console.log(this.items);

      })

    },

  },

  mounted() {
    this.loadBackpack('regular')
  },

  props: {
    name: {
      type: String,
      required: true
    },
    draggable: {
      type: [Boolean, String]
    }
  },



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

.backpack-header {
  font-weight: bold;
  color: #fff;
}

.backpack-top-right {
  float: right;
  vertical-align: middle;
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

</style>
