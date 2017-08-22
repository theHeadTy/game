<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <button class="modal-default-button" @click="reset(); $emit('close')">X</button>

          <div class="modal-header"></div>

          <table cellpadding="0" cellspacing="0" width="100%" style="height:505px;">
          	<tr>
              <td align="center" valign="top" style="padding-top:10px;">

                <!-- Character Names -->
                <table border="0" cellspacing="0" cellpadding="0" width="600px;" style="font-family:Impact,sans-serif;font-weight:normal;font-size:18pt;">
                  <tr>
                    <td width="250" align="center" valign="middle">
                		  <div id="attacker_name">Player Name</div>
                		</td>
                		<td width="100"></td>
                		<td width="250" align="center" valign="middle">
                		  <div id="defender_name">Target Name</div>
                		</td>
                	</tr>
                </table>

                <!-- Character Pics -->
                <table border="0" cellspacing="0" cellpadding="0" width="580" height="280" style="margin-top:20px;">
                  <tr>
                    <td width="270" valign="middle" align="center" style="background-image:url('http://placehold.it/250x250');background-repeat:no-repeat;background-position:center center;">
                      <table>
                        <tr>
                          <td v-show="showTurn === 'target'">
                            <div class="targetHit">{{ targetDamage }}</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td width="40"></td>
                		<td width="270" valign="middle" align="center" style="background-image:url('http://placehold.it/250x250');background-repeat:no-repeat;background-position:center center;">
                  		<table>
                        <tr>
                          <td v-show="showTurn === 'player'">
                            <div class="playerHit">{{ playerDamage }}</div>
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
                      <div class="playerHealth" :style="{ width: health.player + 'px' }"></div>
                    </td>
                    <td width="60"></td>
                    <td width="245" valign="top" align="left">
                      <div class="targetHealth" :style="{ width: health.target + 'px' }"></div>
                    </td>
                  </tr>
                </table>

                <span v-show="showMessage">{{ displayMessage }}</span>

              </td>
            </tr>
          </table>


          <div id="attackResult" v-show="showResult">
            {{ displayResult }}
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import * as _ from 'lodash'
import { Attack } from './../world/attack.ts'

export default {

  created() {

    /* @note - will be stored in the database */
    let playerStats = {
      name: 'Player',
      hp: 30,
      attack: 10,
      critical: 0,
      block: 0,
      level: 1
    }

    let mobStats = {
      name: this.mob.name,
      hp: this.mob.stats.hp,
      attack: this.mob.stats.attack,
      critical: this.mob.stats.critical,
      block: this.mob.stats.block,
      level: this.mob.stats.level
    }


    this.player = playerStats;

    this.target =  mobStats;

    this.attack = new Attack(this.player, this.target)


    this.fight()
  },

  data() {
    return {
      attack: null,
      player: null,
      target: null,

      showTurn: false,
      playerDamage: '',
      targetDamage: '',

      showMessage: false,
      displayMessage: '',

      showResult: false,
      displayResult: '',

      health: {
        player: 228,
        target: 228
      }

    }
  },

  methods: {
    reset() {
      console.log('closing atk');
      Object.assign(this.$data, this.$options.data())
    },
    fightTurn(val) {
      let turn = val.turn,
          damage = val.damage,
          message = val.message;
      this.showTurn = turn;

      if (turn === 'player') {
        this.playerDamage = damage;

        this.health.target = val.hp.width;

      } else if (turn === 'target') {
        this.targetDamage = damage;

        this.health.player = val.hp.width;

      } else if (turn === 'winner') {
        this.showMessage = false;
        this.showResult = true;
        this.displayResult = message;
      }
      if (turn !== 'winner') {
        this.showMessage = true;
        this.displayMessage = message;

      }

    },

    fight() {
      let attackArr = this.attack.buildAttack();
      _.each(attackArr, (val, key) => {
        setTimeout(() => {
          this.fightTurn(val)
        }, (key * 800))
      })
    }
  },

  props: {
    mob: {
      type: Object,
      required: true
    }
  }

}

</script>


<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 700px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Verdana;
  height: 100%;
}
.modal-r-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Verdana;
  height: 100%;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}

</style>
