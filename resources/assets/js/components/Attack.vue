<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <!-- Character Names -->
          <table border="0" cellspacing="0" cellpadding="0" width="600px;" style="font-family:Impact,sans-serif;font-weight:normal;font-size:18pt;">
            <tr>
              <td width="250" align="center" valign="middle">
          		  <div id="attacker_name">
                  <a href="/characters/687030">Player Name</a>
                </div>
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
                    <!--<td id="attacker_window"></td>-->
                    <td v-if="showTurn === 'target'">
                      <div class="targetHit">{{ targetDamage }}</div>
                    </td>
                  </tr>
                </table>
              </td>
              <td width="40"></td>
          		<td width="270" valign="middle" align="center" style="background-image:url('http://placehold.it/250x250');background-repeat:no-repeat;background-position:center center;">
            		<table>
                  <tr>
                    <!--<td id="defender_window"></td>-->
                    <td v-if="showTurn === 'player'">
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
              <!--style="background-image:url(/images/health_bar.jpg);background-repeat:no-repeat;background-position:center center;"-->
              <td width="245" valign="top" align="right">
                <div class="playerHealth" v-bind:style="{ width: pHealth + 'px' }"></div>

                <!--:style="{ width: pHealth + 'px' }"></div>-->

              </td>
              <td width="60"></td>
              <td width="245" valign="top" align="left">
              <!-- style="background-image:url(/images/health_bar.jpg);background-repeat:no-repeat;background-position:center center;"> -->
                <div class="targetHealth" v-bind:style="{ width: tHealth + 'px' }"></div>

                <!--:style="{ width: tHealth + 'px' }"></div>-->

              </td>
            </tr>
          </table>



          <span v-if="showMessage">{{ displayMessage }}</span>

          <a @click="$emit('close')">back to world</a>



          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import * as _ from 'lodash'
import { Attack } from './world/attack.ts'

export default {

  computed: {
    attack() {
      return new Attack(this.player, this.target);
    }
  },

  created() {
    /* @note - will be stored in the database */
    let playerStats = {
      name: 'Player',
      hp: 30,
      attack: 10,
      critical: 0,
      block: 0
    }

    /* @note - will be stored in the database */
    let mobStats = {
      name: this.attackMob.name,
      hp: 20,
      attack: 10,
      critical: 0,
      block: 0
    }

    this.player = playerStats;
    this.target = mobStats;

    this.fight();

  },

  data() {
    return {
      player: null,
      target: null,
      showTurn: false,
      playerDamage: '',
      targetDamage: '',

      showMessage: false,
      displayMessage: '',

      showResult: false,
      displayResult: '',

      tHealth: 228,
      pHealth: 228

    }
  },

  methods: {

    fightTurn(val) {
      let turn = val.turn,
          damage = val.damage,
          message = val.message;
      this.showTurn = turn;

      if (turn === 'player') {
        this.playerDamage = damage;

        this.tHealth = val.hp.width;
        console.log('player - ' + val.hp.width);

      } else if (turn === 'target') {
        this.targetDamage = damage;

        console.log('target - ' + val.hp.width)

        this.pHealth = val.hp.width;

      } else if (turn === 'winner') {
        this.showResult = true;
        this.displayResult = message;
        this.showMessage = false;
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

      /*
      var attackArr = this.attack.buildAttack(),
          len = attackArr.length,
          self = this;

      const loop = (i) => {
        if (i <= len) {
          setTimeout(() => {

            let turn = attackArr[i]['turn'],
                damage = attackArr[i]['damage'],
                message = attackArr[i]['message'];

            this.showTurn = turn;

            if (turn === 'player') {
              this.playerDamage = damage;
            } else if (turn === 'target') {
              this.targetDamage = damage;
            } else if (turn === 'winner') {
              this.showResult = true;
              this.displayResult = message;
            }
            if (turn !== 'winner') {
              this.showMessage = true;
              this.displayMessage = message;
            }

            loop(++i)

          }, 800);
        }
      }
      loop(0);
      */
    }
  },

  name: 'world-attack',

  props: ['attack-mob'],

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
