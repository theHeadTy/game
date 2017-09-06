import * as _ from 'lodash'
import axios, { AxiosResponse } from 'axios'

export class Raids {

  public mapid: number;
  public raids: any[];

  constructor(mapid: number) {
    this.mapid = mapid;
  }

  getAll(): void {
    axios.get('/raids/room/'+this.mapid).then((res: AxiosResponse) => {
      this.raids = res.data;
    })
  }

  room(x: number, y: number): any[] {
    let raids: any = [];
    _.find(this.raids, (raid) => {
      if (raid.x === x && raid.y === y) {
        raids.push(raid);
      }
    })
    return raids;
  }
}
