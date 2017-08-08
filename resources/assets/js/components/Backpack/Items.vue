<template>
  <div>

    <div class="backpack-tile" v-for="(item, index) in items" :key="item.id" :item="item">
      <div :border-id="index" style="position: relative">

        <img
          @mouseover="active = !active"
          @mouseout="active = !active"
          class="backpack-item-image"
          :src="item.image"
          @click.prevent="showMenu = item.iid">

        <item-popup class="menu-popup" v-show="active" :item="item"></item-popup>

        <backpack-menu
          @iequip="equipItem(...arguments)"
          :showMenu="showMenu"
          :item="item">
        </backpack-menu>

        <backpack-actions :item="item"></backpack-actions>

      </div>
    </div>

    <div @click="showMenu = false" v-for="i in extraSpace" class="backpack-tile"></div>

    <!--<div v-show="active" class="menu-popup"></div>-->


  </div>
</template>

<script>

import Menu from './Menu.vue'
import Actions from './Actions.vue'

import Popup from './../Items/Popup.vue'

export default {

  components: {
    'backpack-menu': Menu,
    'backpack-actions': Actions,
    'item-popup': Popup
  },

  computed: {
    extraSpace() {
      let count = this.items.length
      return 25 - ((!count) ? 0 : ((count === 0) ? 1 : count))
    }
  },

  props: {
    items: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      showMenu: false,
      active: false,
    }
  },

  methods: {
    equipItem(item, cache) {

      let index = this.items.indexOf(item),
          type = item.type;

      this.items.splice(index, 1);

      if (cache.length) {
        _.each(cache, (val) => {
          this.items.push(Object.assign({}, val))
        })
      }

      console.log(this.items)

    }
  }


}

</script>

<style>

.backpack-tile {
  display: block;
  margin: 0px auto;
  height: 60px;
  width: 60px;
  float: left;
  background: url('/images/backpack/bp_tile.gif');
}

.backpack-item-image {
  margin: 0px auto;
  max-width: 55px;
  max-height: 55px;
  padding: 2px;
}

</style>
