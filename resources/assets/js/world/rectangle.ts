/**
 * Rectangle Interface
 */
export interface RectangleInterface {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * World Rectangle
 *
 * @class Rectangle
 * @implements RectangleInterface
 */
export class Rectangle implements RectangleInterface {

  public left: number;
  public top: number;
  public width: number;
  public height: number;
  public right: number;
  public bottom: number;

  constructor(config: RectangleInterface) {
    this.left = config.left;
    this.top = config.top;
    this.width = config.width;
    this.height = config.height;
    this.right = (this.left + this.width);
    this.bottom = (this.top + this.height);
  }

  set(left: number, top: number, width?: number, height?: number): void {
    this.left = left;
    this.top = top;
    this.width = width || this.width;
    this.height = height || this.height;
    this.right = (this.left + this.width);
    this.bottom = (this.top + this.height);
  }

  within(rect: Rectangle): boolean {
    return (
      rect.left <= this.left &&
      rect.right >= this.right &&
      rect.top <= this.top &&
      rect.bottom >= this.bottom
    );
  }

  offset(rect: Rectangle, left: number, top: number): Rectangle {
    rect.left += left;
    rect.top += top;
    return rect;
  }


}
