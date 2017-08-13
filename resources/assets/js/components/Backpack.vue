<template>

  <div>

      <bmodal @close="$emit('close')" name="bpWin" draggable=".backpack"></bmodal>

  </div>

</template>


<script>

import Modal from './Modal.vue'

export default {

  components: {
    'bmodal': Modal,
  },

}

</script>
