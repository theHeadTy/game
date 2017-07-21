import * as _ from 'lodash'

import * as jTiled from './maps/map1.json'

import {Canvas} from './canvas'
import {Camera} from './camera'

import * as PF from "pathfinding";

import axios from 'axios'

// Tiled json
let Tiled = (<any>jTiled);

// Canvas
let mapCanvas = <HTMLCanvasElement>document.getElementById('map');
let canvas = new Canvas(mapCanvas);

export namespace Draw {

  interface SpritesheetInterface {
    [tile: number]: {
      x: number;
      y: number;
    }
  }

  export class Spritesheet {

    public sprite: any;

    set(): void {
      this.sprite = [];

      let layers = Tiled.layers[0].data, row = 0, col = 0;

      _.times(16, (row: number) => {
        _.times(16, (col: number) => {

          this.sprite.push({
            x: _.floor(row % 16) * 32,
            y: _.floor(col / 16) * 32
          });

        })
      })


      //console.log(this.sprite);

    }

  }

  interface ViewportInterface {
    start: { x: number, y: number };
    end: { x: number, y: number };
    offset: { x: number, y: number };

  }

  interface PlayerInterface {
    x: number;
    y: number;
    width: number;
    height: number;
    middle: {
      x: number,
      y: number
    },
    max: {
      x: number,
      y: number
    }
  }

  export class Player implements PlayerInterface {

    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public middle: any;
    public max: any;
    public min: any;

    public dirtyArr: any;
    public dirty: boolean;

    private speed: number;

    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    private map: Draw.Map;

    private path: any;


    constructor(map: Draw.Map) {

      this.map = map;

      this.width = 20;
      this.height = 20;

      this.middle = {
        x: (map.canvas.width / 2) - (this.width / 2),
        y: (map.canvas.height / 2) - (this.height / 2)
      }

      this.x = this.middle.x;
      this.y = this.middle.y;

      this.max = {
        x: map.tileset.image.width - (this.width / 2),
        y: map.tileset.image.height - (this.height / 2),
      };
      this.min = { x: (this.width / 2), y: (this.height / 2) };

      this.speed = 256;

      this.canvas = <HTMLCanvasElement>document.getElementById('player');
      this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');

      //this.dirty = false;
      this.dirtyArr = [];

    }

    /**
     * Get the x coordinate tile node the player is located in.
     * @return {number}
     */
    get nodeX(): number {
      return this.x / this.map.tileset.tile.width;
    }

    /**
     * Get the x coordinate tile node the player is located in.
     * @return {number}
     */
    get nodeY(): number {
      return this.y / this.map.tileset.tile.height;
    }


    /**
     * Move position on map.
     * @param {number} step
     * @param {number} x
     * @param {number} y
     * @return void
     */
    move(step: number, x: number, y: number): void {

      let pathCanvas = <HTMLCanvasElement>document.getElementById('path'),
        pathCtx = pathCanvas.getContext('2d');

      pathCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.x += x * this.speed * step;
      this.y += y * this.speed * step;

      this.x = _.clamp(this.x, this.min.x, this.max.x);
      this.y = _.clamp(this.y, this.min.y, this.max.y);

      axios(`/mobs/x/${_.floor(this.x / 32)}/y/${_.floor(this.y / 32)}`).then((response: any) => {
          $('#mobs').html(response.data);
      });

      //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }

  }

  interface TilesetInterface {
    image: {
      image: string;
      width: number;
      height: number;
    }
    tile: {
      width: number;
      height: number;
      count: number;
    }
    columns: number;
    layers: any;
  }

  interface CanInterface {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
  }

  class Tileset {

    get tileset(): TilesetInterface {
      let tiled = Tiled.tilesets[0];
      return {
        image: {
          image: tiled.image,
          width: tiled.imagewidth,
          height: tiled.imageheight
        },
        tile: {
          width: tiled.tilewidth,
          height: tiled.tileheight,
          count: tiled.tilewidth
        },
        columns: tiled.columns,
        layers: Tiled.layers[0].data
      }
    }
  }


  export class Map {

    public canvas: Canvas;
    public ctx: CanvasRenderingContext2D;
    public tileset: TilesetInterface;

    public spriteSheet: any;

    public viewport: ViewportInterface

    private image: HTMLImageElement;

    public sheet: any;

    public node: any[];

    public player: any;
    public camera: any;
    public path: any;

    public grid: any;

    public mobs: any;

    constructor() {

      // Canvas
      this.canvas = canvas;
      this.ctx = canvas.ctx;

      // Tileset
      this.tileset = new Tileset().tileset;
      this.loadImage();

      //this.testDraw();

      this.player;

      this.path = null;

      this.grid = null;

      this.mobs = [];

    }

    buildMap(): any[] {

      let node: any[] = [], mob: any = [], mobid: number = 0;

      _.times(this.tileset.columns, (row: number) => {
        node[row] = [];
        _.times(this.tileset.columns, (col: number) => {

          node[row][col] = this.tileset.layers[row * 16 + col];

        });
      });

      this.node = node;

      return this.node;

    }

    /**
     * Click Event for canvas (for pathfinding)
     * Currently using the 'stage' div which is wrapped
     * around the canvas.
     *
     * @param {MouseEvent} event
     * @return {x y} - End pathfinding coordinates.
     */
    canvasClick(event: MouseEvent): void {

      let canEvent = document.getElementById('path');

      let x: number = event.x;
      let y: number = event.y;

      x = _.floor(x / 32);
      y = _.floor(y / 32);

      x -= canEvent.offsetLeft;
      y -= canEvent.offsetTop;

      this.path = {x: x, y: y};

      this.drawPath();

    }

    canvasClear(): void {
      let can = <HTMLCanvasElement>document.getElementById('path'),
        cctx = can.getContext('2d');
      cctx.clearRect(0, 0, 350, 350);
    }

    testDraw(): void {
      document.getElementById('stage').addEventListener('click', this.canvasClick.bind(this), false);
      document.getElementById('stage').addEventListener('mouseup', this.canvasClear.bind(this), false);
    }

    loadImage(): void {
      new Promise((resolve: any, reject: any) => {
        let image = new Image();
        image.onload = () => {
          resolve(image);
        }
        image.onerror = (err) => {
          reject(err);
        }
        image.src = this.tileset.image.image;
        this.image = image;
      });

    }

    draw(layer: number, camera: Camera): void {


      this.canvas.clear();

      let layers = Tiled.layers[layer].data,
        imagewidth = this.tileset.image.width,
        imageheight = this.tileset.image.height,
        tilewidth = this.tileset.tile.width,
        tileheight = this.tileset.tile.height,
        columns = this.tileset.columns,
        offset = -1,
        startX = _.floor(camera.x / tilewidth),
        startY = _.floor(camera.y / tilewidth),
        endX = _.ceil(startX + (camera.width / tilewidth)) >> 0,
        endY =_ .ceil(startY + (camera.height / tileheight)) >> 0;

      endX = _.clamp(endX, 0, columns - 1);
      endY = _.clamp(endY, 0, columns - 1);

      _.each(_.range(startX, endX + 1), (row: number) => {
        _.each(_.range(startY, endY + 1), (col: number) => {

          let tileId = layers[row + 16 * col] + -1;

          let sourceX = _.floor(tileId % 16) * tilewidth;
          let sourceY = _.floor(tileId / 16) * tileheight;

          let destX = row * tilewidth,
            destY =  col * tileheight;

          this.ctx.save();
          this.ctx.translate(_.round(-camera.x), _.round(-camera.y));
          this.ctx.drawImage(this.image,
            _.round(sourceX), _.round(sourceY),
            32, 32,
            _.round(destX), _.round(destY),
            32, 32
          );
          this.ctx.restore();

        });
      });

    }

    drawPlayer(camera: any, player: Draw.Player): void {

      //this.mobs = [];

      this.player = player;
      this.camera = camera;

      let screenX = this.player.x - camera.x - (20 / 2),
        screenY = this.player.y - camera.y - (20 / 2);

      screenX = _.round(screenX);
      screenY = _.round(screenY);

      let testCanvas = document.createElement('canvas'),
        testCtx = testCanvas.getContext('2d');

      player.ctx.clearRect(0, 0, player.canvas.width, player.canvas.height);
      player.ctx.fillStyle = 'red';
      player.ctx.fillRect(screenX, screenY, player.width, player.height);


      document.getElementById('coords').innerHTML = `
        x: ${_.floor(player.x / 32)}
        y: ${_.floor(player.y / 32)}
      `

     // _.times(this.mobs.length, (index: number) => {
    //      if (this.mobs[index].x === _.floor(player.x / 32) && this.mobs[index].y === _.floor(player.y / 32)) {
    //          document.getElementById('mobs').innerHTML = this.mobs[index].name;
    //      }
     // });

      //let snapshot = Canvas.snapshot(player.canvas);

    }

    drawPath(): void {

      if (!this.path) { return }

      let pathCanvas = <HTMLCanvasElement>document.getElementById('path'),
        pathCtx = pathCanvas.getContext('2d');

      pathCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let endX = this.path.x, endY = this.path.y,
          startX = _.floor(this.player.x / 32),
          startY = _.floor(this.player.y / 32),

          sprite: HTMLImageElement,
          src = 'http://buildnewgames.com/assets/article//astar/spritesheet.png',
          tile, sx, sy, dx, dy;

          let grid = new PF.Grid(16, 16),
            gridBackup = grid.clone(),
            finder = new PF.AStarFinder(),
            path = finder.findPath(startX, startY, endX, endY, grid);

        //console.log(this.path);

        new Promise((resolve, reject) => {
          let image = new Image();
          image.onload = () => {
            resolve(image);
          }
          image.src = src;
          sprite = image;
        });

        let cameraW = this.camera.width, cameraH = this.camera.height,
          cameraX = this.camera.x, cameraY = this.camera.y;

        let pCanvas = <HTMLCanvasElement>document.createElement('canvas'),
          pctx = pCanvas.getContext('2d');

        _.times(path.length, (index: number) => {

          tile = (index === 0) ? 2 : ((index === path.length - 1) ? 3 : 4);

          sx = tile * 32;
          sy = 0;

          //let offsetX = _.round(endX + (-startX / 32));
          //let offsetY = _.round(endY + (-startY / 32));

          let offsetX = _.round(-cameraX / 32);
          let offsetY = _.round(-cameraY / 32);

          dx = _.round(path[index][0] * 32 - offsetX); //-this.player.x / 32);
          dy = _.round(path[index][1] * 32 - offsetY); //-this.player.y / 32)

          //(-this.camera.y / 32);

          pathCtx.save();
          pathCtx.drawImage(sprite, sx, sy, 32, 32, dx, dy, 32, 32);
          pathCtx.restore();

        });

        this.path = null;

    }

    createView(camera: Camera): any {
      let width = this.tileset.tile.width,
        height = this.tileset.tile.height,
        columns = this.tileset.columns,
        startX = camera.x / width,
        startY = camera.y / width,
        endX = startX + (camera.width / width) >> 0,
        endY = startY + (camera.height / height) >> 0,
        viewX = _.round(-camera.x + (startX * width)),
        viewY = _.round(-camera.y + (startY * height));
    }
  }
}
