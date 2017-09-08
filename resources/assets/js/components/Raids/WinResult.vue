<template>
  <div>

    <div class="raid-result">
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

<style>

.raid-result {
  margin: 10px;
  text-align: center;
  border: 1px dotted black;
  background-color: #8E8D8A;
}

</style>
