export interface CanvasInterface {
  canvas: {
    map: HTMLCanvasElement,
    player: HTMLCanvasElement
  },
  ctx: {
    map: CanvasRenderingContext2D,
    player: CanvasRenderingContext2D
  }
}

export class Canvas {

  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  public width: number;
  public height: number;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D,
    width?: number, height?: number) {

    this.canvas = canvas;
    this.ctx = context;

    this.width = width || canvas.width;
    this.height = height || canvas.height;

  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  static clearWorld(pool: CanvasInterface): void {

    let mapWidth = pool.canvas.map.width,
        mapHeight = pool.canvas.map.height,
        playerWidth = pool.canvas.player.width,
        playerHeight = pool.canvas.player.height;

    pool.ctx.map.clearRect(0, 0, mapWidth, mapHeight);
    pool.ctx.player.clearRect(0, 0, playerWidth, playerHeight);

  }

  static clearDirty(x: number, y: number, pool: CanvasInterface): void {
    pool.ctx.map.clearRect(x, y, 350, 350);
    pool.ctx.player.clearRect(x, y, 350, 350);

  }

  /**
   * Reset Transofrmation matrix.
   * @return void
   */
  resetTransform(): void {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

}
