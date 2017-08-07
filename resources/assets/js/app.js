import './bootstrap';
import Vue from 'vue';

import WorldMap from './components/Map.vue'
import WorldMobs from './components/Mobs.vue'
import Backpack from './components/Backpack.vue'


const app = new Vue({

    el: '#app',

    components: {
      WorldMap,
      WorldMobs,
      Backpack,
    },

    data: {
      mobs: null,
      attackMob: null,
      showbp: false,
    },

    methods: {

      sendMobs(mobs) {
        this.mobs = mobs;
      },

      sendAttackMob(mob) {
        this.attackMob = mob;
      },

      openBackpack() {
        this.showbp = true;
      },
      closeBackpack() {
        this.showbp = false;
      }
    },


});
