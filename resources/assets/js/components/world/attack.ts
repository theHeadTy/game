import * as _ from 'lodash'

interface AttackStats {
  name: string;
  hp: number;
  attack: number;
  critical: number;
  block: number;
}

interface AttackTurn {
  turn: string,
  message: string,
  damage: number,
  hp: {
    player: number,
    target: number,
    width: number
  },
  type: string
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
        mobHp = mob.hp,
        playerStartHP = player.hp,
        mobStartHP = mob.hp;

    do {

      if (turn === 'player') {

        let message = `${player.name} hits for ${player.attack}`,
            damage = player.attack;

        mobHp -= damage;

        let attackTurn: AttackTurn = {
          turn: turn,
          message: message,
          damage: damage,
          hp: {
            player: playerHp,
            target: mobHp,
            width: 228 * ((mobHp <= 0) ? 0 : mobHp) / mobStartHP
          },
          type: 'hit'
        }

        attackArr.push(attackTurn);

        turn = (mobHp <= 0) ? 'winner' : 'target';
        continue;

      } else if (turn === 'target') {

        let message = `${mob.name} hits for ${mob.attack}`,
            damage = mob.attack;

        playerHp -= damage;

        let attackTurn: AttackTurn = {
          turn: turn,
          message: message,
          damage: damage,
          hp: {
            player: playerHp,
            target: mobHp,
            width: 228 * ((playerHp <= 0) ? 0 : playerHp) / playerStartHP
          },
          type: 'hit'
        }

        attackArr.push(attackTurn);

        turn = (playerHp <= 0) ? 'winner' : 'player'
        continue;

      } else if (turn === 'winner') {
        let winner = (playerHp <= 0) ? mob.name : player.name;
        attackArr.push({
          turn: turn,
          message: `${winner} wins!`,
          type: 'win'
        });
        break;
      }

    } while (true);
    return attackArr;
  }

}
