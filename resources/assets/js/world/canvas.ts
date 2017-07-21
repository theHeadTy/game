export class Canvas {

  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public width?: number;
  public height?: number;

  public bufferCanvas: HTMLCanvasElement;
  public bufferCtx: CanvasRenderingContext2D;

  public cloneCanvas: HTMLCanvasElement;

  /**
   * Canvas Constructor -
   * Creates the canvas -
   * Sets context, width & height
   */
  constructor(canvas: HTMLCanvasElement, width?: number, height?: number) {
    this.canvas = <HTMLCanvasElement>canvas;
    this.canvas.addEventListener('mousedown', onmousedown, false);
    this.ctx = this.getContext();
    this.width = width || this.canvas.width;
    this.height = height || this.canvas.height;

    this.bufferCanvas = document.createElement('canvas');
    this.bufferCtx = this.bufferCanvas.getContext('2d');

    this.cloneCanvas = this.canvas;

  }

  // Unneccessary?
  getContext(): CanvasRenderingContext2D {
    let canvas = <HTMLCanvasElement>this.canvas
    return <CanvasRenderingContext2D>canvas.getContext('2d')
  }

  /**
   * Clear Canvas
   * @return void
   */
  clear(): void {
    this.resetTransform();
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  /**
   * Reset Transofrmation matrix.
   * @return void
   */
  resetTransform(): void {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  static snapshot(canvas: HTMLCanvasElement): any {
    let image = new Image();
    image.src = canvas.toDataURL();
    return image;
  }

}
