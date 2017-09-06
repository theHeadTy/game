<template>
  <div>

    <span style="text-align: center">
      <strong>{{ gemCompleted }}</strong>
    </span>

    <!--<div v-if="itemSelected.id">
      <div class="item-selected">
        <img @click="gemItem(itemSelected.id)" :src="image(itemSelected.image)">
        <button class="btn btn-default">Gem Item</button>
      </div>
      <hr />
    </div>-->

    <div v-if="itemSelected.id" style="item-selected">
      <img :src="image(itemSelected.image)">
      <div><button class="btn btn-primary" @click="gemItem(itemSelected.id)">Gem Item</button></div>
      <div><button class="btn btn-primary">UnGem Item</button></div>
      <hr />
    </div>


    <!-- user items -->
    <div class="col-md-7" style="background-color: black; padding: 0">
      <div class="blacksmith-items" v-for="(item, index) in items" :key="index" :item="item">

          <img
            :src="image(item.item.image)"
            @mouseover="itemPop = item.id"
            @mouseout="itemPop = !itemPop"
            @click="selectItem(item)">

            <item-popup v-show="itemPop === item.id" :item="item"></item-popup>

      </div>
    </div>

    <div class="col-md-3 col-md-offset-1">
      <table class="table table-bordered">
        <thead>
        <tr>
          <td></td>
          <td><i class="fa fa-star" aria-hidden="true"></i></td>
          <td><i class="fa fa-star" aria-hidden="true"></i></td>
          <td><i class="fa fa-star" aria-hidden="true"></i></td>
          <td><i class="fa fa-star" aria-hidden="true"></i></td>
          <td><i class="fa fa-star" aria-hidden="true"></i></td>
        </tr>
      </thead>
      <tbody>
        <tr class="blacksmith-tr-common">
          <td>Common</td>
          <td>5</td>
          <td>6</td>
          <td>7</td>
          <td>8</td>
          <td>9</td>
        </tr>
        <tr class="blacksmith-tr-uncommon">
          <td>UnCommon</td>
          <td>10</td>
          <td>12</td>
          <td>14</td>
          <td>16</td>
          <td>18</td>
        </tr>
        <tr class="blacksmith-tr-rare">
          <td>Rare</td>
          <td>15</td>
          <td>30</td>
          <td>45</td>
          <td>60</td>
          <td>70</td>
        </tr>
        <tr class="blacksmith-tr-elite">
          <td>Elite</td>
          <td>20</td>
          <td>40</td>
          <td>60</td>
          <td>80</td>
          <td>100</td>
        </tr>
        <tr class="blacksmith-tr-godly">
          <td>Elite</td>
          <td>25</td>
          <td>50</td>
          <td>75</td>
          <td>100</td>
          <td>125</td>
        </tr>
      </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import Popup from './Equipment/Popup.vue'
/**
 * Blacksmith
 */
export default {

  components: {
    'item-popup': Popup
  },

  data() {
    return {
      itemPop: false,
      itemSelected: [{
        id: null,
        image: null,
      }],
      gemCompleted: null
    }
  },

  methods: {
    /*createCost(rarity, gems) {
      let cost;
      switch (rarity) {
        case 'Common':
          if (gems === 0) { cost = 5 }
          else if (gems === 1) { cost = 6 }
          else if (gems === 2) { cost = 7 }
          else if (gems === 3) { cost = 8 }
          else if (gems === 3) { cost = 9 }
        break;
        case 'Uncommon':
          if (gems === 0) { cost = 10 }
          else if (gems === 1) { cost = 12 }
          else if (gems === 2) { cost = 14 }
          else if (gems === 3) { cost = 16 }
          else if (gems === 3) { cost = 18 }
        break;
        case 'Rare':
          if (gems === 0) { cost = 15 }
          else if (gems === 1) { cost = 30 }
          else if (gems === 2) { cost = 45 }
          else if (gems === 3) { cost = 60 }
          else if (gems === 3) { cost = 70 }
        break;
      }
      return cost;
    },
    createRarity(id) {
      let item = _.find(this.items, (item) => {
        return item.id === id
      });
      return this.createCost(item.item.rarity, item.gems)
    },
    */
    gemItem(id) {
      //let cost = this.createRarity(id)
      //console.log(cost + ' is the cost')
      axios.post('/blacksmith', { id: id }).then(res => {
        this.gemCompleted = res.data.status
      }).catch(error => {
        console.log(error)
      })
    },
    ungem(id) {
      return;
    },
    selectItem(item) {
      this.itemSelected = {
        id: item.id,
        image: item.item.image
      }
    },
    image(img) {
      return '/images/'+img
    }
  },

  props: {
    items: {
      type: Array,
      required: true
    }
  }

}

</script>

<style>


.blacksmith-items {
  padding: 2px;
  margin: 5px;
  white-space: nowrap;
  display: inline-block;
}

.blacksmith-tr-common {
  font-weight: bold;
  text-align: center;
  background-color: #FFFFFF;
}

.blacksmith-tr-uncommon {
  font-weight: bold;
  text-align: center;
  background-color: #C0C0C0;
}

.blacksmith-tr-rare {
  font-weight: bold;
  text-align: center;
  background-color: #00FF00;
}

.blacksmith-tr-elite {
  font-weight: bold;
  text-align: center;
  background-color: #FFD700;
}

.blacksmith-tr-godly {
  font-weight: bold;
  text-align: center;
  background-color: red;
}


.item-image {
  margin: 0 auto;
  padding: 0;
  vertical-align: middle;
}

.item-selected {
  width: 200px;
  margin: 0 auto;
  text-align: center;
  border: 1px solid #708090;
  background-color: #ccc;
}


</style>
