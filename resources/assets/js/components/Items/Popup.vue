<template>
  <div :class="popupClass" style="display: block;">

    <!-- Left side (name, stats, augs, info & desc)-->
    <div class="item-left">

      <span :class="nameClass">{{ item.name }}</span>

      <div v-if="item.level">
        <small>[Requires Level {{ item.level }}]</small>
      </div>
      <div v-if="item.bound">
        <small>[Playerbound]</small>
      </div>
      <div v-if="item.inventory">
        <small>[Inventory]</small>
      </div>

      <div>
        <small>[Slot - {{ item.slot }}]</small>
      </div>

      <div style="padding: 5px;"></div>

      <div v-for="(stat, key) in item.stats" :key="key" :stat="stat">
        <span v-if="stat > 0 && key != 'item_id'">
          {{ key | startCase(key) }} {{ stat * gemInc(key) | addCommas(stat) }}
        </span>
      </div>

    </div>

    <!-- Right side (image, gems, augs) -->
    <div class="item-right">

      <div align="center">
        <img :src="item.image" style="display:block;margin-bottom:1px;">
      </div>

      <div align="center" style="display: flex;">
        <i v-for="n in item.gems" class="fa fa-star" aria-hidden="true"></i>
        <i v-for="n in gems" class="fa fa-star-o" aria-hidden="true"></i>
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
      return ['item-name', `${_.toLower(this.item.rarity)}`]
    },
    gems() {
      return _.range(this.item.gems, 5)
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

      return ((!block && gems > 0 && gems <= 5)
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
	z-index: 200;
	/*font-family: Verdana;
	font-size: 8pt;*/
  width: 300px;
}

.item-left {
  float: left;
}

.item-right {
  float: right;
}

.item-name {
  font-weight: bold;
  font-size: 14px;
}

.common {
  /*color: #6495ED;*/
  color: #DCDCDC;
}

.uncommon {

}

.rare {

}

</style>
