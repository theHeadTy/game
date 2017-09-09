<template>
  <div>

    <div class="raid-result">

      <div v-if="round.win">
        <span class="winner">Winner!</span>
      </div>
      <div v-else>
        <span class="looser">Loss!</span>
      </div>

      {{ round.message }}
      <div v-if="round.points > 0">
        {{ round.points }} Points
      </div>
      <div v-if="round.gold > 0">
        {{ round.gold }} Gold
      </div>
      <div v-if="round.exp > 0">
        {{ round.exp }} Exp
      </div>
    </div>

  </div>
</template>

<script>

export default {

  props: {
    round: {
      type: Object,
      required: true
    }
  }

}

</script>

<style scoped>

.raid-result {
  margin: 10px;
  text-align: center;
  border: 1px dotted black;
  background-color: #8E8D8A;
}

.winner {
  color: green;
  font-size: 14px;
}

.looser {
  color: red;
  font-size: 14px;
}

</style>
