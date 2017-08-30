<template>
  <div>

    <!-- left side -->
    <div class="col-md-6 col-md-offset2">

      <strong>Talk {{ mob.name }}</strong>

      <div v-for="(quest, index) in quests" :key="index" :quest="quest">

        <a @click="showQuestModal = quest.id">{{ quest.name }}</a>

          <quest-modal
            v-if="showQuestModal === quest.id"
            @close="showQuestModal = !showQuestModal">

            <quest-view :quest="quest"></quest-view>

          </quest-modal>


      </div>

    </div>

    <!-- right side -->
    <div class="col-md-6 col-md-offset2">

      <img :src="image">

    </div>


  </div>
</template>

<script>

import Modal from './../Modal.vue'
import View from './Quest/View.vue'

export default {

  computed: {
    image() {
      return (this.mob.image)
        ? this.mob.image : 'http://placehold.it/250x250'
    },
  },

  components: {
    'quest-modal': Modal,
    'quest-view': View
  },

  data() {
    return {
      showQuestModal: null
    }
  },

  props: {
    mob: {
      type: Object,
      required: true
    },
    quests: {
      type: Array,
      required: true
    }

  }


}

</script>
