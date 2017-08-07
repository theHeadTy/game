<template>
  <div>
    <input class="backpack-check" type="checkbox" value="item.iid" v-model="dropItems">
    <input class="backpack-check" type="checkbox" value="item.iid" v-model="sellItems">
    <input class="backpack-check" type="checkbox" value="item.iid" v-model="vaultItems">
  </div>
</template>

<script>

export default {

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      dropItems: [],
      sellItems: [],
      vaultItems: []
    }
  },

}

</script>

<style scoped>

.backpack-check {
  display: none;
}

</style>
