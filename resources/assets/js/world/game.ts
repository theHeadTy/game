import * as _ from 'lodash'
import { Keyboard, Key } from './../util/keyboard'
import { Player } from './player'

const keyboard = new Keyboard();

export class Game {
  public tiled: JSON;
  public player: Player;
  public elapsed: number;
  public delta;

  constructor(tiled: JSON) {
    this.elapsed = 0;
    this.delta = 0;

    this.player = new Player(tiled);

  }

  loop(time: number): void {

    this.delta = (time - this.elapsed) / 1000;
    this.delta = _.min([this.delta, .25]);
    this.elapsed = time;

    _.each(keyboard.keys, (key: Key) => {
      if (key.isDown) {
        let [action, ...params]: any = key.action.split(' ');
        if (action === 'move') {
          let [deltaX, deltaY]: any = _.map(params, _.toInteger);
          this.player.update(this.delta, deltaX, deltaY);
        }
      }
    });

    this.player.clear();
    this.player.render();

    window.requestAnimationFrame(() => {
      this.loop;
    })

  }
}
