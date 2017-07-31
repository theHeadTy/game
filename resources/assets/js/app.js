/**
 * App - Main vue instance
 */
import './bootstrap';
import Vue from 'vue';

import WorldMap from './components/Map.vue'
import WorldMobs from './components/Mobs.vue'

const app = new Vue({

    el: '#app',

    components: {
      WorldMap,
      WorldMobs
    },

    data: {
      mobs: null,
      attackMob: null,
    },

    methods: {

      sendMobs(mobs) {
        this.mobs = mobs;
      },

      sendAttackMob(mob) {
        this.attackMob = mob;
      }

    },

    created() {
      /* Websocket */
      //Echo.join('mobs').listen('Mobs', (e) => {
      //  this.mobs = e.mobs;
      //});
    }
});
