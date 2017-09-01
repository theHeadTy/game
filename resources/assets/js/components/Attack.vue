<template>
  <div>

    <table cellpadding="0" cellspacing="0" width="100%" style="height:505px;">
      <tr>
        <td align="center" valign="top" style="padding-top:10px;">
            <!-- Character Names -->
            <table border="0" cellspacing="0" cellpadding="0" width="600px;" style="font-family:Impact,sans-serif;font-weight:normal;font-size:18pt;">
              <tr>
                <td width="250" align="center" valign="middle">
                  <div id="attacker_name">{{ username }}</div>
                </td>
                <td width="100"></td>
                <td width="250" align="center" valign="middle">
                   <div id="defender_name">{{ targetname }}</div>
                </td>
              </tr>
            </table>

            <!-- Character Pics -->
            <table border="0" cellspacing="0" cellpadding="0" width="580" height="280" style="margin-top:20px;">
              <tr>
                <td width="270" valign="middle" align="center" style="background-image:url('http://placehold.it/250x250');background-repeat:no-repeat;background-position:center center;">
                  <table>
                    <tr>
                      <td v-show="show.turn === 'target'">
                        <div class="targetHit">{{ target.damage }}</div>
                      </td>
                    </tr>
                  </table>
                </td>
                <td width="40"></td>
                <td width="270" valign="middle" align="center" style="background-image:url('http://placehold.it/250x250');background-repeat:no-repeat;background-position:center center;">
                  <table>
                    <tr>
                      <td v-show="show.turn === 'player'">
                        <div class="playerHit">{{ user.damage }}</div>
                      </td>
                    </tr>
                  </table>
            		</td>
            	</tr>
            </table>

            <!-- Character Health Bars -->
            <table border="0" cellspacing="0" cellpadding="0" width="550" height="40" style="margin-left:8px;margin-top:50px;">
    		      <tr>
                <td width="245" valign="top" align="right">
                  <div class="playerHealth" :style="{ width: user.health + 'px' }"></div>
                </td>
                <td width="60"></td>
                <td width="245" valign="top" align="left">
                  <div class="targetHealth" :style="{ width: target.health + 'px' }"></div>
                </td>
              </tr>
            </table>

            <span v-show="show.message">{{ display.message }}</span>

          </td>
        </tr>
      </table>

      <div id="attackResult" v-show="show.result">

        {{ display.result }}

        <div v-show="display.gold > 0">Gold Gained: {{ display.gold }}</div>
        <div v-show="display.exp > 0">Exp Gained: {{ display.exp }}</div>
        <div v-show="display.strip > 0">Exp Stripped: {{ display.strip }}</div>

      </div>

  </div>
</template>

<script>

export default {

  created() {
    this.createLoop()
  },

  data() {
    return {
      show: {
        turn: false,
        message: false,
        result: false
      },

      display: {
        message: null,
        result: null,
        gold: 0,
        exp: 0,
        strip: 0
      },

      user: {
        health: 228,
        damage: null
      },

      target: {
        health: 228,
        damage: null
      }
    }
  },

  methods: {
    createTurn(turn) {

      this.show.turn = turn.turn;

      if (turn.turn === 'player') {

        this.user = {
          damage: turn.damage,
          health: turn.health
        }

      } else if (turn.turn === 'target') {

        this.target = {
          damage: turn.damage,
          health: turn.health
        }

      } else if (turn.turn === 'winner') {

        this.show = {
          message: false,
          result: false
        }

        this.display = {
          result: turn.message,
          gold: turn.gold,
          exp: turn.exp,
          strip: turn.strip
        }

      }

      if (turn.turn !== 'winner') {
        this.show.message = true
        this.display.message = turn.message
      }

    },
    createLoop() {
      _.each(this.attack, (turn, key) => {
        setTimeout(() => {
          this.createTurn(turn)
        }, (key * 800))
      })
    }
  },

  props: {
    username: {
      type: String,
      required: true
    },
    targetname: {
      type: String,
      required: true
    },
    attack: {
      type: Array,
      required: true
    }
  }

}

</script>
