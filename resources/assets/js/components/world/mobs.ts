import './../../bootstrap.js'
import * as _ from 'lodash'
import axios from 'axios'

export class Mobs {
  public allMobs: any[];
  public roomMobs: any[];
  private roomId: number;
  constructor(id: number) {
    this.roomId = id;
    this.all(id);
  }

  /**
   * Send an ajax request to get all of the mobs in the current zone.
   * @param {Number} id - ID of the zone.
   * @return void
   */
  all(id?: number): void {
    id = id || this.roomId;
    axios.get(`/mobs/room/${id}`).then((response: any) => {
      this.allMobs = response.data;
    });
  }

  /**
   * Iterates over the array of the mobs in the current zone,
   * and matches the players x & y coordinates finding the mobs
   * that belong in that room.
   * @param {Number} x
   * @param {Number} y
   * @return {Array}
   */
  inRoom(x: number, y: number): any[] {
    let mobArr: any = [];
    _.find(this.allMobs, (obj: any) => {
      if (obj.x === x && obj.y === y) {
        mobArr.push(obj);
      }
    })
    return mobArr;
  }

}
