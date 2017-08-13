<template>
  <div class="equipment-items">

    <item-slot name="head" :item="whereSlot('Head')"></item-slot>

    <item-slot name="neck" :item="whereSlot('Neck')"></item-slot>

    <item-slot name="weapon" :item="whereSlot('Weapon')"></item-slot>

    <item-slot name="body" :item="whereSlot('Body')"></item-slot>

    <item-slot name="shield" :item="whereSlot('Shield')"></item-slot>

    <item-slot name="pants" :item="whereSlot('Pants')"></item-slot>

    <item-slot name="belt" :item="whereSlot('Belt')"></item-slot>

    <item-slot name="ring" :item="whereSlot('Ring')"></item-slot>

    <item-slot name="foot" :item="whereSlot('Foot')"></item-slot>

    <item-slot name="orbs" :item="whereSlot('Orbs')"></item-slot>
<!--
    <div class="head">

      <div align="center" v-if="whereSlot('Head')">
        <img
          @mouseover="show = whereSlot('Head').id"
          @mouseout="show = !show"
          :src="getImage('Head')">

        <div v-if="show === head.id">
          <popup :item="head"></popup>
        </div>

      </div>

    </div>

    <div class="neck"></div>
    <div class="weapon"></div>

    <div class="body">

      <div align="center" v-if="whereSlot('Body')">
        <img
          @mouseover="show = whereSlot('Body').id"
          @mouseout="show = !show"
          :src="getImage('Body')">

        <div v-if="show === whereSlot('Body').id">
          <popup :item="whereSlot('Body')"></popup>
        </div>

      </div>

    </div>
    <div class="shield"></div>
    <div class="pants"></div>
    <div class="belt"></div>
    <div class="ring"></div>
    <div class="foot"></div>
    <div class="orbs"></div>

  -->

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


</script>

<style scoped>

.equipment-items {
  position: relative;
  width: 300px;
  height: 385px;
  padding-top: 10px;
  margin: 0 auto;
}

</style>
