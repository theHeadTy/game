<template>

  <div :class="popupClass">

    <!-- Left side (name, stats, augs, info & desc)-->
    <div class="item-left">

      <span :class="nameClass">{{ item.item.name }}</span>

      <div v-if="item.item.level">
        <small>[Requires Level {{ item.item.level }}]</small>
      </div>
      <div v-if="item.item.bound">
        <small>[Playerbound]</small>
      </div>
      <div v-if="item.item.inventory">
        <small>[Inventory]</small>
      </div>

      <div>
        <small>[Slot - {{ item.item.slot }}]</small>
      </div>

      <div style="padding: 5px;"></div>

      <div v-for="(stat, key) in item.stats" :key="key" :stat="stat">
        <span v-if="stat > 0 && key != 'item_id'">
          <!-- {{ key | startCase(key) }}: -->
          +{{ stat * gemInc(key) | addCommas(stat) }} {{ key | startCase(key) }}
        </span>
      </div>


    </div>

    <!-- Right side (image, gems, augs) -->
    <div class="item-right">

      <div align="center" style="display: inline:block;padding-right:3px;">

        <img
          :src="image"
          style="padding-right: 3px;">

      </div>

        <div align="center" style="display: inline:block;padding-right:3px;">
          <i v-for="n in item.gems" class="fa fa-star" aria-hidden="true"></i>
          <i v-for="n in gems" class="fa fa-star-o" aria-hidden="true"></i>
        </div>

    </div>

    <div style="clear: both; position: relative; margin-bottom-1px;">

    <div style="padding: 10px;"></div>

    <div style="display: block; font-weight: bold;">
      <small><em>{{ item.item.description }}</em></small>
    </div>

    <div style="padding: 5px;"></div>

    <div style="display: block; color: yellow">
      <small><em>{{ item.item.info }}</em></small>
    </div>

  </div>

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

  computed: {
    popupClass() {
      return 'item-popup'
    },
    nameClass() {
      let rarity = this.item.item.rarity;
      return ['item-name', `${_.toLower(rarity)}`]
    },
    gems() {
      return _.range(this.item.gems, 5)
    },
    image() {
      return '/images/'+this.item.item.image
    }
  },

  filters: {
    startCase(value) {
      return _.startCase(value)
    },
    addCommas(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },

  methods: {
    gemInc(key) {
      let gems = (this.item.gems >= 5) ? 5 : this.item.gems,
          block = ['critical', 'block', 'rampage'].includes(key);

      return (
        (!block && gems > 0 && gems <= 5)
        ? _.round(.25 + gems)
        : 1
      )
    }
  }
}


</script>


<style>

.item-popup {
  position: absolute;
	border: 1px solid #333;
	background-color: #000;
  color: #fff;
  z-index: 1000;
	font-family: Verdana;
	font-size: 9pt;
  width: 275px;
}

.item-left {
  float: left;
  position: relative;
}

.item-right {
  float: right;
  position: relative;
}

.item-name {
  font-weight: bold;
  font-size: 14px;
}

.common {
  color: #DCDCDC;
}

.uncommon {

}

.rare {

}

</style>
