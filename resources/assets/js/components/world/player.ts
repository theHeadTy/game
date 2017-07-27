import * as _ from 'lodash'
import { Canvas } from './canvas'

export interface PlayerInterface {
  width?: number;
  height?: number;
  map: {
    width: number,
    height: number
  },
  canvas: Canvas;
}

export class Player implements PlayerInterface {
  /* Public */
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  public map: {
    width: number,
    height: number,
  }
  public canvas: Canvas;

  /* Private */
  private speed: number;
  private middle: {
    x: number,
    y: number
  }
  private min: {
    x: number,
    y: number
  }
  private max: {
    x: number,
    y: number
  }

  private tileWidth: number;
  private tileHeight: number;

  constructor(config: PlayerInterface) {
    this.x = 0;
    this.y = 0;
    this.width = config.width || 20;
    this.height = config.height || 20;
    this.map = { width: config.map.width, height: config.map.height };
    this.canvas = config.canvas;
    this.config();
  }

  config(): void {
    this.min = { x: this.width / 2, y: this.height / 2  }
    this.max = {
      x: this.map.width - this.min.x,
      y: this.map.height - this.min.y
    }
    this.middle = {
      x: (this.canvas.width / 2) - this.min.x,
      y: (this.canvas.height / 2) - this.min.y
    }
    this.x = this.middle.x;
    this.y = this.middle.y;
    this.speed = 256;

    /* Tile Properties */
    this.tileWidth = 32;
    this.tileHeight = 32;
  }

  update(step: number, stepX: number, stepY: number): void {
    this.x += stepX * this.speed * step;
    this.y += stepY * this.speed * step;
    this.x = _.clamp(this.x, this.min.x, this.max.x);
    this.y = _.clamp(this.y, this.min.y, this.max.y);
  }

  get nodeX(): number {
    return _.floor(this.x / this.tileWidth);
  }

  get nodeY(): number {
    return _.floor(this.y / this.tileHeight);
  }

}
