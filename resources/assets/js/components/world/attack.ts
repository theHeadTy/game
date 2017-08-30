import * as _ from 'lodash'

/**
 * Skills that come to mind..
 *
 *
 * rand(1, level + (boost here)) + (boost from genDamage function)
 */


interface AttackTurn {
  turn: string;
  message: string;
  damage: number;
  hp: number;
}

export class Attack {
  public player: any;
  public target: any;

  public attackArr: any = [];

  constructor(player: any, target: any) {
    this.player = player;
    this.target = target;

  }


  private message(name: string, damage: number): string {
    return `${name} hits for ${damage}`
  }

  private turn(turn: string, message: string, damage: number, hp: number): AttackTurn {
    return {
      turn: turn,
      message: message,
      damage: damage,
      hp: hp
    }
  }

  buildAttack(): any[] {

    let attackArr: any[] = [],
        player = this.player,
        target = this.target,
        turn = 'player',
        playerHp = player.stats.hp,
        targetHp = target.stats.hp;

    do {

      if (turn === 'player') {

        let damage = this.genDamage(player.stats.attack, player.stats.hp, player.stats.level),
            message = this.message(player.name, damage);

        targetHp -= damage;

        let width = 228 * ((targetHp <= 0) ? 0 : targetHp) / target.stats.hp

        attackArr.push(
          this.turn(turn, message, damage, width)
        )

        turn = (targetHp <= 0) ? 'winner' : 'target';

        continue;

      } else if (turn === 'target') {

        let damage = this.genDamage(
              target.stats.attack, target.stats.hp, target.stats.level
            ),
            message = this.message(target.name, damage);

        playerHp -= damage;

        let width = 228 * ((playerHp <= 0) ? 0 : playerHp) / player.stats.hp

        attackArr.push(
          this.turn(turn, message, damage, width)
        )

        turn = (playerHp <= 0) ? 'winner' : 'player'

        continue;

      } else if (turn === 'winner') {

        let winner = (playerHp <= 0) ? target.name : player.name;

        attackArr.push({
          turn: turn,
          message: this.winner(winner),
          winner: winner,
          gold: this.goldGain(),
          exp: this.expGain()
        });

        break;

      }

    } while (true);
    return attackArr;
  }

  winner(name: string): string {
    let message;
    if (name === this.player.name) {
      message = `You have won!`
    } else {
      message = `${this.target.name} has won!`
    }
    return message
  }

  genDamage(attack: number, hp: number, level: number): number {
    let damage: number;

    level = _.random(1, level)
    damage = _.round((attack * attack) / (attack + hp) * level);

    return damage + 1;

  }

  goldGain(): number {
    let level = this.target.stats.level,
        lean = _.random(0, 2),
        gold = _.round(lean * (Math.pow(1.055, level)) + 8
          + Math.pow(1.055, (Math.pow(level, 1.085))));

    return gold;
  }

  expGain(): number {
    let level = this.target.stats.level

    return _.round(2 * 3 * (Math.pow(1.055, level)) + 8
      + Math.pow(1.055, (Math.pow(level, 1.085)) - 3 * this.goldGain()))
  }

}
