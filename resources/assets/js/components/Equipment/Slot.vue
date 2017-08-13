<template>
  <div :class="slotClass">

    <div v-if="item">
      <img
        @mouseover="show = item.id"
        @mouseout="show = !show"
        @click="remove"
        :src="item.item.image">
      <popup v-if="show === item.id" :item="item"></popup>
    </div>

  </div>
</template>

<script>
import Popup from './Popup.vue'

export default {

  props: {
    name: {
      type: String,
      required: true
    },
    item: {
      type: Object
    }
  },

  components: {
    Popup
  },

  computed: {
    slotClass() {
       return this.name
    }
  },

  data() {
    return {
      show: false
    }
  },

  methods: {
    remove() {
      axios.get('/equipment/remove/'+this.item.id).then(response => {
        this.item = null;
      })
    }
  }

}

</script>

<style>

.head {
  border: 1px solid #666;
  position: absolute;
  left: 118px;
  top: 7px;
  width: 62px;
  height: 46px;
}

.head img {
  max-width: 100%;
  max-height: 46px;
  display: block;
  margin: auto;
}

.neck {
  border: 1px solid #666;
  position: absolute;
  left: 197px;
  top: 12px;
  width: 41px;
  height: 41px;
}

.neck img {
  display: block;
  margin: auto;
}

.weapon {
  border: 1px solid #666;
  position: absolute;
  left: 45px;
  top: 67px;
  width: 56px;
  height: 96px;
}

.weapon img {
  display: block;
  margin: auto;
}

.body {
  border: 1px solid #666;
  position: absolute;
  left: 121px;
  top: 67px;
  width: 56px;
  height: 96px;
}

.body img {
  max-width: 100%;
  max-height: 96px;
  display: block;
  margin: auto;
}

.shield {
  border: 1px solid #666;
  position: absolute;
  left: 198px;
  top: 67px;
  width: 56px;
  height: 96px;
}

.shield img {
  display: block;
  margin: auto;
}

.pants {
  border: 1px solid #666;
  position: absolute;
  left: 118px;
  top: 175px;
  width: 62px;
  height: 75px;
}

.pants img {
  display: block;
  margin: auto;
}

.belt {
  border: 1px solid #666;
  position: absolute;
  left: 61px;
  top: 192px;
  width: 41px;
  height: 41px;
}

.belt img {
  display: block;
  margin: auto;
}

.ring {
  border: 1px solid #666;
  position: absolute;
  left: 197px;
  top: 192px;
  width: 41px;
  height: 41px;
}

.ring img {
  display: block;
  margin: auto;
}

.foot {
  border: 1px solid #666;
  position: absolute;
  left: 118px;
  top: 262px;
  width: 62px;
  height: 66px;
}

.foot img {
  display: block;
  margin: auto;
}

.orbs {
  border: 1px solid #666;
  position: absolute;
  left: 99px;
  top: 346px;
  width: 99px;
  height: 32px;
}

</style>
