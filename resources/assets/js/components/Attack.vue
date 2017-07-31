<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <button class="modal-default-button" @click="$emit('close')">X</button>

          <div text-align="center">
            <div class="row">

              <div class="col-md-4">
                <div class="row">
                  <h1>Player</h1>
                </div>
                <transition name="fade">
                  <h1 v-if="showTurn === 'target'">- {{ targetDamage }}</h1>
                </transition>
              </div>

              <div class="col-md-4">
                <div class="row">
                  <h1>Target</h1>
                </div>
                <transition name="fade">
                  <h1 v-if="showTurn === 'player'">- {{ playerDamage }}</h1>
                </transition>
              </div>

            </div> <!-- end row -->
          </div> <!-- end center -->

          <div class="col-md-8">
            <div class="row">
            <!-- Show attack message -->
            <transition name="fade">
              <div align="center" v-if="showMessage">
                <span>{{ displayMessage }}</span>
              </div>
            </transition>
            </div>
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
      hp: 100,
      attack: 10,
      critical: 0,
      block: 0
    }

    /* @note - will be stored in the database */
    let mobStats = {
      name: this.attackMob.name,
      hp: 90,
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
    }
  },

  methods: {
    fight() {

      var attackArr = this.attack.buildAttack(),
          len = attackArr.length,
          self = this;

      (function loop(i) {
        if (i <= len) {
          ++i;
          _.delay(() => {
            loop(i)

            let turn = attackArr[i]['turn'],
                damage = attackArr[i]['damage'],
                message = attackArr[i]['message'];

            self.showTurn = turn;
            self.showMessage = true;

            if (turn === 'player') {
              self.playerDamage = damage;
            } else if (turn === 'target') {
              self.targetDamage = damage;
            } else if (turn === 'winner') {
              self.showResult = true;
              self.displayResult = message;
            }
            self.displayMessage = message;

          }, 800);
        }
      })(0);
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
