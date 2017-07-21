//import * as jTiled from './maps/map1.json';
import {RectangleInterface, Rectangle} from './rectangle'

//import {Tile} from './tilemap/tile'

//let Tiled = (<any>jTiled);

export class Camera {

  public x: number;
  public y: number;
  public width: number;
  public height: number;

  public max: any;
  public min: any;

  public map: any;
  public follow: any;
  public viewport: any;

  public screen: any;

  public viewRect: Rectangle;
  public mapRect: Rectangle;

  public tilesArray: any;
  public culledTiles: any;

  constructor(map: any) {
    this.map = map;

    this.x = 0;
    this.y = 0;

    this.width = map.canvas.width;
    this.height = map.canvas.height;

    this.max = {
      x: map.tileset.image.width - this.width,
      y: map.tileset.image.height - this.height
    };

    this.follow = false;

    // Viewport Rectangle (canvas sized)
    this.viewRect = new Rectangle({
      left: this.x, top: this.y,
      width: this.width, height: this.height
    });

    // Map Rectangle (full sized)
    this.mapRect = new Rectangle({
      left: 0, top: 0,
      width: map.tileset.image.width, height: map.tileset.image.height
    });

    //this.buildTileset();
    //this.cull();

  }

  startFollow(player: any): any {
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
    //this.cull();
  }
}
