<template>
  <div>

    <span style="font-style:bold;color:orange;font-size:12px;">Objectives</span>

    <div v-for="(step, index) in steps" :key="index" :step="step">

      {{ step.description }}

        <quest-kill :step="step" v-if="step.kill_id !== null"></quest-kill>

        <quest-item v-if="step.item_id !== null"></quest-item>

    </div>

  </div>
</template>

<script>
import Kill from './Kill.vue'
import Item from './Item.vue'

export default {

  components: {
    'quest-kill': Kill,
    'quest-item': Item
  },

  created() {
    this.loadStep()
  },

  data() {
    return {
      steps: null
    }
  },

  methods: {
    loadStep() {
      axios.get(`/quest/${this.id}/step`).then(res => {
        this.steps = res.data;
        console.log(this.steps);
      })
    }
  },

  props: {
    quest: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  }

}

</script>
