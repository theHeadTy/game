import * as _ from 'lodash'
import { Player } from './player'
import { Camera } from './camera'

interface CanvasInterface {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

interface ViewportInterface {
  startCol: number;
  endCol: number;
  startRow: number;
  endRow: number;
}

export class Render {

  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  public image: HTMLImageElement;
  public loaded: boolean;

  private tiled: any;

  public camera: Camera;

  private clone: any;

  constructor(canvas: CanvasInterface, tiled: any) {
    this.canvas = canvas.canvas;
    this.ctx = canvas.ctx;

    this.tiled = tiled;

    this.loadImage();

    this.clone = null;

  }

  loadImage(): void {
    new Promise((resolve, reject) => {
      let image = new Image();
      image.onload = () => {
        resolve(image);
      }
      image.onerror = (err) => {
         reject(err);
       }
       image.src = this.tiled.tilesets[0].image;
       this.image = image;
       this.loaded = true;
    });
  }

  setCamera(camera: Camera): void {
    this.camera = camera;
  }

  map(): void {

    let ctx: CanvasRenderingContext2D = this.ctx,
        offset = -1,
        layer = this.tiled.layers[0].data,
        firstgid = 1;

    _.times(16, (r: number) => {
      _.times(16, (c: number) => {

        let tile = layer[r + 16 * c] - firstgid,
          sourceX = _.floor(tile % 16) * 32,
          sourceY = _.floor(tile / 16) * 32,
          x = _.multiply(r, 32),
          y = _.multiply(c, 32);

          this.ctx.save();
          this.ctx.translate(_.round(-this.camera.x), _.round(-this.camera.y));
          this.ctx.drawImage(this.image, sourceX, sourceY, 32, 32, x, y, 32, 32);
          this.ctx.restore();

      })
    })

  }

  player(player: Player): void {
    let ctx = player.canvas.ctx,
      screenX = player.x - this.camera.x - (player.width / 2),
      screenY = player.y - this.camera.y - (player.height / 2);
    ctx.fillStyle = 'red';
    ctx.fillRect(screenX, screenY, player.width, player.height);
  }

}
