import './../../bootstrap.js'
import * as _ from 'lodash'
import axios from 'axios'

export class Mob {
  public mobs: any[];
  public nmobs: any[];
  constructor(mobs: any[]) {
    this.mobs = mobs;
    this.getAllMobs(1);
  }

  /**
   * Send an ajax request to get all of the mobs in the current world zone.
   * @param {Number} id - ID of the zone.
   * @return void
   */
  getAllMobs(id: number): void {
    let mobArr: any[] = [];
    axios.get(`/mobs/room/${id}`).then((response: any) => {
      mobArr.push(response.data);
    });
    this.nmobs = mobArr;
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
    _.find(this.mobs, (obj: any) => {
      if (obj.x === x && obj.y === y) {
        mobArr.push(obj);
      }
    })
    return mobArr;
  }

}
