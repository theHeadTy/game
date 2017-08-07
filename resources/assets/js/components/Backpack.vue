<template>

  <div>

      <bmodal @close="$emit('close')" name="bpWin" draggable="true"></bmodal>

  </div>

</template>


<script>

import Vue from 'vue'
import Modal from './Modal.vue'

export default {

  components: {
    'bmodal': Modal,
  },

  methods: {
    closeBackpack() {
      this.showBackpack = false;
    }
  },

  name: 'backpack',


}

</script>

<style>

.backpack {
  background-color: black;
  text-align: left;
  padding: 0;
  border: 1px solid #333;
}

.dialog-flex {
  width: 100%;
  height: 100%;
}

.dialog-content {
  flex: 1 0 auto;
  width: 100%;

}
.dialog-c-title {
    font-weight: 600;
    padding: 15px;
}

</style>
