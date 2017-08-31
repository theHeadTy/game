<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <button class="modal-default-button" @click="$emit('close')">X</button>

          <div class="modal-header"></div>

          <table cellpadding="0" cellspacing="0" width="100%" style="height:505px;">
          	<tr>
              <td align="center" valign="top" style="padding-top:10px;">

                <!-- Character Names -->
                <table border="0" cellspacing="0" cellpadding="0" width="600px;" style="font-family:Impact,sans-serif;font-weight:normal;font-size:18pt;">
                  <tr>
                    <td width="250" align="center" valign="middle">
                		  <div id="attacker_name">{{ player.name }}</div>
                		</td>
                		<td width="100"></td>
                		<td width="250" align="center" valign="middle">
                		  <div id="defender_name">{{ mob.name }}</div>
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
                            <transition name="fade">
                              <div class="targetHit">{{ targetDamage }}</div>
                            </transition>
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

          <transition name="bounce">
          <div id="attackResult" v-show="showResult">
            {{ displayResult }}
          </div>
        </transition>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import * as _ from 'lodash'
import { Attack } from './../world/attack.ts'

export default {

  mounted() {

    /*axios.get('/find-player').then(res => {

      this.player = res.data;

      console.log(this.player);

      this.target =  mobStats;

      this.attack = new Attack(this.player, this.mob)

      this.fight()

    })*/

      this.fight()

  },

  data() {
    return {
      attack: null,
    //  player: null,
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
    fightTurn(val) {

      let turn = val.turn,
          damage = val.damage,
          message = val.message;
      this.showTurn = turn;

      console.log(turn);

      if (turn === 'player') {
        this.playerDamage = damage;

        this.health.target = val.hp;

      //  console.log(val.hp + ' php');

      } else if (turn === 'target') {
        this.targetDamage = damage;

        this.health.player = val.hp;

      //  console.log(val.hp + ' thp');

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
      //let attackArr = this.attack.buildAttack()
      axios.get(`/mob/${this.mob.id}/attack`).then(res => {
        _.each(res.data, (val, key) => {
          console.log(res.data);
          setTimeout(() => {
            this.fightTurn(val)
          }, (key * 800))
        })
      })
    },

    updateStats(gold, exp, win) {
      axios.post(`/mob/${this.mob.id}/attack`, {
        win: win,
        gold: gold,
        exp: exp,
        cost: this.mob.stats.cost
      }).then(res => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
    }

  },

  props: {
    mob: {
      type: Object,
      required: true
    },
    player: {
      type: Object,
      required: true
    }
  }

}

</script>

<style>

@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

</style>
