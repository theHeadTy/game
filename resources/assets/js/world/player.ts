import * as _ from 'lodash'

let canvas = <HTMLCanvasElement>document.getElementById('player'),
    ctx = canvas.getContext('2d');

export class Player {

  public x: number;
  public y: number;

  private speed: number;

  constructor(tiled: JSON) {
    this.speed = 256;
  }

  update(delta: number, x: number, y: number): void {
    this.x += delta * this.speed;
    this.y += delta * this.speed;
  }

  clear(): void {
    ctx.clearRect(0, 0, 350, 350)
  }

  render(): void {
    ctx.fillStyle = 'red'
    ctx.fillRect(175, 175, 20, 20)
  }

}
