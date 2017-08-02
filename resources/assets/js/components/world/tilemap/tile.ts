/*
 * Tile Interface
 * @usage tile.push(<Tile>{})
 * instead of tile.push(new Tile({})).
 */
export interface Tile {
  index: number;
  id: number;
  source: {
    x: number,
    y: number
    width: number,
    height: number
  },
  dest: {
    x: number,
    y: number,
    width: number,
    height: number
  }
}
