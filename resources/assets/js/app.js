import './bootstrap';
import Vue from 'vue';

/* Components */
import WorldMap from './components/Map.vue'
import WorldMobs from './components/Mobs.vue'
import Backpack from './components/Backpack.vue'
import Equipment from './components/Equipment.vue'

//const bus = new Vue()

const app = new Vue({

    el: '#app',

    components: {
      WorldMap,
      WorldMobs,
      Backpack,
      Equipment,
    },

    data: {
      mobs: null,
      attackMob: null,
      showbp: false,
      showeq: false,
    },

    methods: {

      sendMobs(mobs) {
        this.mobs = mobs;
      },

      sendAttackMob(mob) {
        this.attackMob = mob;
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
