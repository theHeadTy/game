<template>
  <transition name="fade" v-if="accepted === quest.id">

    <div style="padding: 5px;">

      <p> {{ quest.accepted }} </p>

      <a @click="$emit('close')">Go back</a>

    </div>

  </transition>
</template>


<script>


export default {

  created() {
    this.acceptQuest()
  },

  methods: {
    acceptQuest() {
      axios.get('/quest/accept/'+this.quest.id).then(res => {
        this.$emit('accept', true)
      })
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

}


</script>
