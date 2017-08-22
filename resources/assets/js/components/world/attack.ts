import * as _ from 'lodash'

interface AttackStats {
  name: string;
  hp: number;
  attack: number;
  critical: number;
  block: number;
  level: number;
}

interface AttackTurn {
  turn: string,
  message: string,
  damage: number,
  hp: {
    player: number,
    target: number,
    width: number
  }
}

export class Attack {
  public player: AttackStats;
  public target: AttackStats;

  public attackAr: any;

  constructor(player: AttackStats, target: AttackStats) {
    this.player = player;
    this.target = target;
  }

  /**
   * Builds the attack, making it into an array.
   */
  buildAttack(): any[] {

    let attackArr: any = [],
        player = this.player,
        mob = this.target,
        turn = 'player',
        playerHp = player.hp,
        mobHp = mob.hp;

    do {

      if (turn === 'player') {

        let message = `${player.name} hits for ${player.attack}`,
            damage = this.genDamage(player.attack, player.hp, player.level);

        mobHp -= damage;

        let attackTurn: AttackTurn = {
          turn: turn,
          message: message,
          damage: damage,
          hp: {
            player: playerHp,
            target: mobHp,
            width: 228 * ((mobHp <= 0) ? 0 : mobHp) / mob.hp
          }
        }

        attackArr.push(attackTurn);

        turn = (mobHp <= 0) ? 'winner' : 'target';
        continue;

      } else if (turn === 'target') {

        let message = `${mob.name} hits for ${mob.attack}`,
            damage = this.genDamage(mob.attack, mob.hp, mob.level);

        playerHp -= damage;

        let attackTurn: AttackTurn = {
          turn: turn,
          message: message,
          damage: damage,
          hp: {
            player: playerHp,
            target: mobHp,
            width: 228 * ((playerHp <= 0) ? 0 : playerHp) / player.hp
          }
        }

        attackArr.push(attackTurn);

        turn = (playerHp <= 0) ? 'winner' : 'player'
        continue;

      } else if (turn === 'winner') {
        let winner = (playerHp <= 0) ? mob.name : player.name,
            winDisplay = this.winner(winner);

        /*if (winner === player.name) {
          winDisplay = `You have won!`;
        } else {
          winDisplay = `${mob.name} has won!`;
        }*/

        attackArr.push({ turn: turn, message: winDisplay, winner: winner });
        break;
      }

    } while (true);
    return attackArr;
  }

  winner(name: string): string {
    let message;
    if (name === this.player.name) {
      message = 'You have won!'
    } else {
      message = `${this.target.name} has won!`
    }
    return message
  }


  /**
   * Damage formula, based off the attack, hp & level of attacker.
   * @param {Number} attack
   * @param {Number} hp
   * @param {Number} level
   */
  genDamage(attack: number, hp: number, level: number): number {
    let damage: number = 0;

    level = _.random(1, level)
    damage = _.round((attack * attack) / (attack + hp) + level);

    return damage;
  }

}
