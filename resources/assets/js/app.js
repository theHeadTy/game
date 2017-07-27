/**
 * App - Main vue instance
 */
import './bootstrap';
import Vue from 'vue';

//Vue.component('world-map', require('./components/Map.vue'))

import Map from './components/Map.vue'
import Mobs from './components/Mobs.vue'

//Vue.component('world-mobs', require('./components/Mobs.vue'))

const app = new Vue({
    el: '#app',

    components: {
      'world-map': Map,
      'world-mobs': Mobs
    },

    data: {
      mobs: null,

    },

    methods: {

      sendMobs(mobs) {
        this.mobs = mobs;
      },


    },

    created() {
      /* Websocket */
      //Echo.join('mobs').listen('Mobs', (e) => {
      //  this.mobs = e.mobs;
      //});
    }
});
