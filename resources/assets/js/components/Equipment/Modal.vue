<template>
  <transition name="overlay-fade">

    <div ref="overlay" :class="overlayClass" :data-modal="name">

      <div v-draggable ref="modal" :class="modalClass" :style="modalStyle">
        <span class="equipment-header">Equipment</span>

        <div class="equipment-top-right" @click="$emit('close')">
          <img src="http://outwar.com/images/x.jpg">
        </div>

        <equipment-items
          :items="items">
        </equipment-items>

      </div>

    </div>

  </transition>
</template>

<script>

import Draggable from './../../directives/Draggable.js'
import Equipment from './Equipment.vue'

export default {

  components: {
    'equipment-items': Equipment
  },

  computed: {
    overlayClass() {
      return 'equipment-overlay'
    },
    modalClass() {
      return ['equipment-box', 'equipment']
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

  directives: {
    Draggable
  },

  data() {
    return {
      items: null,

    }
  },

  methods: {

    loadEquipment() {
      axios.get('/equipment').then(response => {

        this.items = response.data

        //console.log(this.items);

      })
    },

  },

  mounted() {
    this.loadEquipment()
  },


  props: {
    name: {
      type: String,
      required: false
    }
  },

}

</script>


<style>

/* Equipment */

.equipment-overlay {
  position: fixed;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 199;
  opacity: 1;
}

.equipment-overlay .equipment-box {
  position: relative;
  /*overflow: hidden;*/
  box-sizing: border-box;
}

.equipment {
  background-color: black;
  text-align: left;
  padding: 0;
  border: 1px solid #333;
}

.equipment-header {
  font-weight: bold;
  color: #fff;
}

.equipment-top-right {
  float: right;
  vertical-align: middle;
}

/* Transitions */
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
