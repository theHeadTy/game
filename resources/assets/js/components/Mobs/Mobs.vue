<template>
  <div>

    <div :mob="mob">

      <div>

        {{ mob.name }} |

        <a @click="showMob = !showMob"><small>View</small></a> |

        <a @click="showAttack = true">
          <small>Attack</small>
        </a>

        <span v-show="mob.type === 'quest'"> |
          <a @click="showQuest = !showQuest">
            <small>Talk</small>
          </a>
        </span>

    </div>


    </div>

    <mob-view
      v-show="showMob"
      @close="showMob = !showMob"
      :mob="mob">
    </mob-view>

    <mob-talk
      v-show="showQuest && mob.type === 'quest'"
      @close="showQuest = !showQuest"
      :mob="mob">
    </mob-talk>

    <mob-attack
      v-show="showAttack"
      :mob="mob"
      @close="showAttack = false">
    </mob-attack>

  </div>
</template>

<script>
import View from './View.vue'
import Attack from './Attack.vue'
import Talk from './Talk.vue'
import { Mobs } from './../world/mobs.ts'

export default {

  props: {
    mob: {
      type: Object,
      required: false
    }
  },

  data() {
    return {
      showAttack: false,
      showMob: false,
      showQuest: false
    }
  },

  components: {
    'mob-attack': Attack,
    'mob-view': View,
    'mob-talk': Talk,
  },

  computed: {
    type() {
      return this.mob.type;
    }
  },

}

</script>
