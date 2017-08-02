import * as _ from 'lodash'
import Bluebird from 'bluebird'
import { Player } from './player'
import { Camera } from './camera'
import { Canvas } from './canvas'
import loadMap from './../../util/loader'

interface CanvasInterface {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

interface Viewport {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface Tile {
  sx: number;
  sy: number;
  dx: number;
  dy: number;
}

export class Render {

  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public camera: Camera;

  private tiled: any;
  private clone: any;


  public buffer: any;

  constructor(canvas: CanvasInterface, tiled: any) {
    this.canvas = canvas.canvas;
    this.ctx = canvas.ctx;
    this.tiled = tiled;
  }

  setCamera(camera: Camera): void {
    this.camera = camera;
  }

  get mapArray(): number[][][] {
    let mapArr: number[][][] = [],
        width: number = this.tiled.width,
        height: number = this.tiled.height;
    _.times(this.tiled.layers.length, (i: number) => {
      mapArr[i] = [];
      _.times(width, (r: number) => {
        mapArr[i][r] = [];
        _.times(height, (c: number) => {
          mapArr[i][r][c] = this.tiled.layers[i].data[r * width + c]
        })
      })
    })
    return mapArr;
  }

  map(gid: number, layerId: any, image: any): void {

    //console.time('#f')

    //console.log(layerId)

    let layer = layerId,
        //layer = this.tiled.layers[layerId].data,
        firstgid = 1,
        view = this.cullTiles(),
        width = this.tiled.width,
        columns = this.tiled.tilesets[0].columns,
        tileWidth: number = this.tiled.tilewidth,
        tileHeight: number = this.tiled.tileheight;

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);

    this.ctx.save()
    this.ctx.translate(_.round(-this.camera.x), _.round(-this.camera.y))

    _.each(_.range(view.startX, view.endX), (r: number) => {
      _.each(_.range(view.startY, view.endY), (c: number) => {

    //_.times(20, (r: number) => {
    //  _.times(20, (c: number) => {

        let tile = layer.data[r + width * c] - gid,
            frame = this.createTile(tile, r, c);
        this.ctx.drawImage(
          image,
          frame.sx, frame.sy,
          tileWidth, tileHeight,
          frame.dx, frame.dy,
          tileWidth, tileHeight
        )
      })
    })

    this.ctx.restore()

    //console.timeEnd('#f')

  }

  player(player: Player): void {
    let ctx = player.canvas.ctx,
      screenX = player.x - this.camera.x - (player.width / 2),
      screenY = player.y - this.camera.y - (player.height / 2);
    ctx.fillStyle = 'red';
    ctx.fillRect(screenX, screenY, player.width, player.height);
  }

  createTile(tile: number, row: number, col: number): Tile {
    let width = this.tiled.tilesets[0].columns,
        tileWidth = this.tiled.tilewidth,
        tileHeight = this.tiled.tileheight,
      sx = _.floor(tile % width) * tileWidth,
      sy = _.floor(tile / width) * tileHeight,
      dx = row * tileWidth,
      dy = col * tileHeight;

    return { sx, sy, dx, dy }

  }

  cullTiles(): Viewport {
    let startX = _.floor(this.camera.x / this.tiled.tilewidth),
        startY = _.floor(this.camera.y / this.tiled.tileheight),
        endX = _.round(startX + (this.camera.width / this.tiled.tilewidth)),
        endY = _.round(startY + (this.camera.height / this.tiled.tileheight)),
        width = this.tiled.width,
        height = this.tiled.height;

    endX = _.clamp(endX + 1, (width * 0.5), width);
    endY = _.clamp(endY + 1, (height * 0.5), height);

    return { startX, startY, endX, endY }

  }

}
