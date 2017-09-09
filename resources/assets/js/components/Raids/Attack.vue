<template>
  <div>

    <!-- Crew & boss name/image -->
    <!--<div class="col-md-8 col-md-offset-2" style="text-align: center">
      <div class="col-md-4">
        <div style="text-align: center">
            <strong>{{ crew }}</strong>
        </div>
        <img src="http://via.placeholder.com/250x250">
      </div>
      <div class="col-md-4 col-md-offset-2" style="text-align: center">
        <div style="text-align: center">
          <strong>{{ boss }}</strong>
        </div>
        <img src="http://via.placeholder.com/250x250">
      </div>
    </div>-->

    <!-- Raid loop -->
    <div class="col-md-8 col-md-offset-2" style="font-weight: bold; color: #FFF;">
      <div v-for="(round, index) in rounds" :key="index" :index="index" :round="round">

        <!-- Crew turn -->
        <div v-if="round.turn === 'crew'">
          <div class="crew-hit" @mouseover="showElem.user = round" @mouseout="showElem.user = false">
            {{ round.message }}
            <span class="critical-hit" v-if="round.critical">CRITICAL</span>
            <span class="miss-hit" v-if="round.miss">MISSED</span>

            <!-- user elementals -->
            <div v-show="!round.miss && showElem.user === round && !round.crew">
              <elementals :elementals="showElem.user.elem"></elementals>
            </div>

          </div>
        </div>

        <!-- Boss turn -->
        <div v-else-if="round.turn === 'boss'">
          <div class="boss-hit" @mouseover="showElem.boss = round" @mouseout="showElem.boss = false">
            {{ round.message }}

            <!-- boss elementals -->
            <div v-show="showElem.boss === round">
              <elementals :elementals="showElem.boss.elem"></elementals>
            </div>

          </div>
        </div>

        <div v-else>
          <win-result :round="round"></win-result>
        </div>

        <div style="clear: both"></div>
      </div>
    </div>


  </div>
</template>

<script>
import WinResult from './WinResult.vue'
import Elementals from './Elementals.vue'
/**
 * Raid attack
 */
export default {

  components: {
    WinResult,
    Elementals
  },

  created() {
    this.createTurns()
    this.createRounds()
  },

  data() {
    return {
      turns: [],
      rounds: [],
      showElem: {
        user: false,
        boss: false
      }
    }
  },

  methods: {
    createRounds() {
      _.each(this.turns, (turn, key) => {
        setTimeout(() => {
          this.rounds.push(turn)
        }, 600 * key)
      })
    },
    createTurns() {
      _.each(this.data, (data, key) => {
        let turn = data.turn
        if (turn === 'crew') {
          _.each(data.users, (user, i) => {
            this.turns.push({
              turn: 'crew',
              message: user.hit,
              critical: user.critical,
              miss: user.miss,
              elem: user.elementals.dmg
            })
          })
          this.turns.push({
            turn: turn,
            crew: true,
            message: data.message
          })
        } else if (turn === 'boss') {
          this.turns.push({
            turn: turn,
            message: data.message,
            elem: data.elementals.dmg
          })
        } else {
          this.turns.push(data)
        }
      })
    }
  },

  props: {
    data: {
      type: Array,
      required: true
    },
    crew: {
      type: String,
      required: true
    },
    boss: {
      type: String,
      required: true
    }
  }

}

</script>

<style scoped>

.crew-name {
  float: left;
  margin-left: 175px;
}

.boss-name {
  float: right;
  margin-right: 175px;
}


.health-box {
  width: 25px;
  height: 25px;
  float: left;
  border: 1px dotted black;
  background-color: #8E8D8A;
}

.crew-hit {
  width: 250px;
  float: left;
  margin: 10px;
  border: 1px dotted black;
  background-color: #8E8D8A;
}

.boss-hit {
  width: 250px;
  float: right;
  border: 1px dotted black;
  text-align: center;
  background-color: #8E8D8A;
}

.critical-hit {
  color: red;
  margin: 5px;
  font-weight: bold;
}

.miss-hit {
  color: orange;
  margin: 5px;
  font-weight: bold;
}

</style>
