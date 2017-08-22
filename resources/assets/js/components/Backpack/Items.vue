<template>
  <div>

    <div class="backpack-tile" v-for="(item, index) in items" :key="item.id" :item="item">

      <div ref="itemBorder" :borderid="item.id" :class="borderClass">

        <div class="backpack-image-align">

          <img
            @mouseover="active = item.id"
            @mouseout="active = !active"
            class="backpack-item-image"
            :src="getImage(item)"
            @click.prevent="showMenu = item.id">

        </div>


        <item-popup class="menu-popup" v-show="active === item.id" :item="item"></item-popup>

        <backpack-menu
          @iequip="equipItem"
          @idrop="dropItem"
          :showMenu="showMenu"
          :item="item"
          :index="index">
        </backpack-menu>

        <input class="backpack-check" type="checkbox" :value="item.id" v-model="drop">
        <input class="backpack-check" type="checkbox" :value="item.id" v-model="sell">
        <input class="backpack-check" type="checkbox" :value="item.id" v-model="vault">

      </div>

    </div>

    <div
      @click="showMenu = false"
      v-for="i in extraSpace"
      class="backpack-tile">
    </div>

    <div align="center" style="inline: block" v-show="dropWarning === true">
      <p><strong>Are you sure you would like to perform this action?</strong></p>
      <button class="btn" @click="submitAction">Submit</button>
      <button class="btn" @click="cancelAction">Cancel</button>
    </div>

  </div>
</template>

<script>

import Menu from './Menu.vue'
import Popup from './../Equipment/Popup.vue'

export default {

  props: {
    items: {
      type: Array,
      required: true
    }
  },

  components: {
    'backpack-menu': Menu,
    'item-popup': Popup
  },

  computed: {
    extraSpace() {
      let count = this.items.length
      return 25 - ((!count) ? 0 : ((count === 0) ? 1 : count))
    },
    borderClass() {
      return 'border-off'
    }
  },

  data() {
    return {
      showMenu: false,
      active: false,
      drop: [],
      sell: [],
      vault: [],
      dropWarning: false,
    }
  },

  methods: {
    getImage(item) {
      return '/images/'+item.item.image
    },

    equipItem(type) {
      this.$emit('change', type)
    },

    dropItem(index) {

      let drop = this.drop,
          border = this.$refs.itemBorder,
          id = this.items[index].id;

      drop.push(id)

      border[index].style.border = 2 + 'px solid red'

      this.dropWarning = (drop.length) ? true : false

    },

    submitAction() {

      axios.post('/backpack/drop', this.drop).then(response => {
        let data = response.data;
        if (data.status === 'ok') {
          this.$emit('change', 'regular')
        }
      })

    },

    cancelAction() {
      let border = this.$refs.itemBorder
      _.times(border.length, (i) => {
        border[i].style.border = 0 + 'px'
      })
      this.drop.splice(0, this.drop.length)
      this.dropWarning = false
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
  vertical-align: middle;
}

.backpack-item-image {
  margin: 0px auto;
  max-width: 55px;
  max-height: 55px;
  padding: 0;
  vertical-align: middle;
}

.backpack-image-align {
  padding: 2px;
  text-align: center;
  margin: 0 auto;
}

.backpack-check {
  display: none;
  width: 0px;
  height: 0px;
}

.border-off {
  position: relative;
  border: 0px;
}

.border-on {
  position: relative;
  border: 2px solid red;
}

</style>
