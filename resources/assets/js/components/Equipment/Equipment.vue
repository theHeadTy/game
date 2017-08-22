<template>
  <div class="equipment-items">

    <div v-for="(slot, index) in slots" :key="index" :slot="slot">

      <item-slot :name="slot.toLowerCase()" :item="whereSlot(slot)"></item-slot>

    </div>

  </div>
</template>

<script>
import Popup from './Popup.vue'
import Slot from './Slot.vue'

export default {

  props: ['items'],

  components: {
    Popup,
    'item-slot': Slot
  },

  computed: {
    slots() {
      return getSlots()
    }
  },

  methods: {
    getImage(slot) {
      let item = _.find(this.items, (item) => {
        return item.item.slot === slot
      })
      return (item) ? item.item.image : null
    },
    whereSlot(slot) {
      let item = _.find(this.items, (obj) => {
        return obj.item.slot === slot
      })
      return item ? item : null
    }
  },

}

const getSlots = () => {
  return [
    'Head', 'Neck', 'Weapon', 'Body', 'Shield',
    'Belt', 'Pants', 'Ring', 'Foot', 'Orbs'
  ]
}

</script>

<style scoped>

.equipment-items {
  position: relative;
  width: 300px;
  height: 385px;
  padding-top: 10px;
  margin: 0 auto;
  background-color: #000000;
}

</style>
