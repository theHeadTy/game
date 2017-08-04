<template>
  <div>

    <div :mob="mob">

      <div>
        {{ mob.name }} |

        <a id="show-modal" @click="mobAttack(mob)"><small>Attack</small></a>

        <span v-show="type === 'quest'"> | <small>Talk</small></span>
      </div>


    </div>

    <!-- Displays the attack in a modal box -->
    <div v-if="showAttack">
      <world-attack
        :attack-mob="attackMob"
        @close="showAttack = false">
      </world-attack>
    </div>


  </div>
</template>

<script>
import Vue from 'vue'
import Attack from './Attack.vue'
import { Mobs } from './world/mobs.ts'

export default {

  name: 'world-mobs',

  props: ['mob'],

  data() {
    return {
      showAttack: false,
      attackMob: null
    }
  },

  components: {
    'world-attack': Attack
  },

  computed: {
    type() {
      return this.mob.type;
    }
  },

  methods: {
    mobAttack(mob) {

      this.showAttack = true;

      //this.$emit('send', mob);

      this.attackMob = mob;

      //console.log(`attacking mob ${mob}`);

    }
  }
}

</script>
