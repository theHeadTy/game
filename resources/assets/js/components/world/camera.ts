import * as _ from 'lodash'
import { RectangleInterface, Rectangle } from './rectangle'
//import { Canvas } from './canvas'
import { Player } from './player'

export interface CameraSettings {
  width: number;
  height: number;
  mapWidth: number;
  mapHeight: number;
}

export class Camera {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public mapWidth: number;
  public mapHeight: number;

  public min: any;
  public max: any;

  public follow: any;
  public screen: any;

  public viewRect: Rectangle;
  public mapRect: Rectangle;

  constructor(settings: CameraSettings) {
    this.x = 0;
    this.y = 0;
    this.width = settings.width;
    this.height = settings.height;
    this.mapWidth = settings.mapWidth;
    this.mapHeight = settings.mapHeight;

    this.max = {
      x: this.mapWidth - this.width,
      y: this.mapHeight - this.height
    }

    this.follow = false;

    // Viewport Rectangle (canvas sized)
    this.viewRect = new Rectangle({
      left: this.x, top: this.y,
      width: this.width, height: this.height
    });

    // Map Rectangle (full sized)
    this.mapRect = new Rectangle({
      left: 0, top: 0,
      width: this.mapWidth, height: this.mapHeight
    });

  }

  start(player: Player): void {
    this.follow = player;
    this.screen = { x: this.width / 2, y: this.height / 2 };
  }

  update(): void {

    if (this.follow.x - this.x + this.screen.x > this.width) {
      this.x = this.follow.x - (this.width - this.screen.x);
    } else if (this.follow.x - this.screen.x < this.x) {
      this.x = this.follow.x - this.screen.x;
    }
    if (this.follow.y - this.y + this.screen.y > this.height) {
      this.y = this.follow.y - (this.height - this.screen.y);
    } else if (this.follow.y - this.screen.y < this.y) {
      this.y = this.follow.y - this.screen.y
    }

    this.viewRect.set(this.x, this.y);

    if (!this.viewRect.within(this.mapRect)) {
      if (this.viewRect.left < this.mapRect.left) {
        this.x = this.mapRect.left;
      }
      if (this.viewRect.top < this.mapRect.top) {
        this.y = this.mapRect.top;
      }
      if (this.viewRect.right > this.mapRect.right) {
        this.x = this.mapRect.right - this.width;
      }
      if (this.viewRect.bottom > this.mapRect.bottom) {
        this.y = this.mapRect.bottom - this.height;
      }
    }
  }

}
