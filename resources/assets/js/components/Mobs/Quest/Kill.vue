<template>
  <div class="quest-kill">

    <strong>{{ step.mob.name }}:</strong> {{ userKills }} / {{ step.kill_amount }} Killed

  </div>
</template>

<script>

export default {

  created() {
    this.userAmount()
  },

  data() {
    return {
      userKills: 0
    }
  },

  methods: {
    userAmount() {
      let questId = this.step.quest_id,
          mobId = this.step.kill_id;
      axios.get(`/quest/${questId}/user-kills/mob/${mobId}`).then(res => {
        this.userKills = res.data.kills;
      })
    }
  },

  props: {
    step: {
      type: Object,
      required: true
    }
  }

}

</script>

<style>

.quest-kill {
  padding: 5px;
}

</style>
