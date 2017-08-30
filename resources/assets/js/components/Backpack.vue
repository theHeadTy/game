<template>

  <div>

      <backpack-modal
        @close="$emit('close')"
        name="bpWin">
      </backpack-modal>

  </div>

</template>


<script>

import Modal from './Backpack/Modal.vue'

export default {

  components: {
    'backpack-modal': Modal,
  },

}

</script>
