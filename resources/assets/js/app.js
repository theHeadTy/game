import './bootstrap';
import Vue from 'vue';

/* Components */
import WorldMap from './components/Map.vue'
import WorldMobs from './components/Mobs/Mobs.vue'
import Backpack from './components/Backpack.vue'
import Equipment from './components/Equipment.vue'
import Attack from './components/Attack.vue'
import Permissions from './components/Crews/Permissions.vue'
import Blacksmith from './components/Blacksmith.vue'

import WorldRaids from './components/Raids/Raids.vue'

//const bus = new Vue()

const app = new Vue({

    el: '#app',

    components: {
      WorldMap,
      WorldMobs,
      Backpack,
      Equipment,
      ProfileEquipment: require('./components/Equipment/Equipment.vue'),
      Attack,
      Permissions,
      Blacksmith,
      WorldRaids,
    },

    data: {
      mobs: null,
      raids: null,
      attackMob: null,
      showbp: false,
      showeq: false,
    },

    methods: {

      getMobs(mobs) {
        this.mobs = mobs;
      },
      sendAttackMob(mob) {
        this.attackMob = mob;
      },

      getRaids(raids) {
        this.raids = raids;
      },

      /* Open Backpack Modal */
      openBackpack() {
        this.showbp = true;
      },
      /* Close Backpack Modal */
      closeBackpack() {
        this.showbp = false
      },

      /* Open Equipment Modal */
      openEquipment() {
        this.showeq = true
      },
      /* Close Equipment Modal */
      closeEquipment() {
        this.showeq = false
      }

    },

});
