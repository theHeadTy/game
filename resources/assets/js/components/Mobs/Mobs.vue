<template>
  <div>

    <div :mob="mob">

      <div>

        {{ mob.name }} |

        <a @click="showMob = !showMob"><small>View</small></a> |

        <a @click="loadAttack">
          <small>Attack</small>
        </a>

        <span v-show="mob.type === 'quest'"> |
          <a @click="showQuest = !showQuest">
            <small>Talk</small>
          </a>
        </span>

    </div>


    </div>

    <!-- Mob view -->
    <mob-view
      v-if="showMob"
      @close="showMob = !showMob"
      :mob="mob">
    </mob-view>

    <!-- Mob talk -->
    <talk-modal v-if="showQuest && mob.type === 'quest'">

      <mob-talk
        @close="showQuest = false"
        :mob="mob"
        :quests="quests">
      </mob-talk>

    </talk-modal>


    <!-- Mob Attack -->
    <mob-attack
      v-if="showAttack"
      :mob="mob"
      :player="player"
      @close="showAttack = false">
    </mob-attack>

  </div>
</template>

<script>
import View from './View.vue'
import Attack from './Attack.vue'
import Talk from './Talk.vue'
import { Mobs } from './../world/mobs.ts'
import Modal from './../Modal.vue'

export default {

  data() {
    return {
      showAttack: false,
      showMob: false,
      showQuest: false,
      quests: [],
      player: null
    }
  },

  created() {
    this.loadQuests()
  },

  components: {
    'mob-attack': Attack,
    'mob-view': View,
    'mob-talk': Talk,
    'talk-modal': Modal,
  },

  methods: {
    loadQuests() {
      if (this.mob.type === 'quest') {
        axios.get('/mob/talk/'+this.mob.id).then(response => {
          this.quests = response.data;
        })
      }
    },

    loadAttack() {
      axios.get('/find-player').then(res => {
        this.showAttack = true
        this.player = res.data
      })
    }
  },

  props: {
    mob: {
      type: Object,
      required: false
    }
  },

}

</script>
