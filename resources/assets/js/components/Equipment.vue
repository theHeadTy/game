<template>

  <div>

      <equipment-modal
        @close="$emit('close')"
        name="eqWin">
      </equipment-modal>

  </div>

</template>


<script>

import Modal from './Equipment/Modal.vue'

export default {

  components: {
    'equipment-modal': Modal
  },

}

</script>
