import axios from 'axios' //, {AxiosResponse} from 'axios'

export interface GameInterface {
  map: any;
  loadMap(url: string);
}

export class Game {

  public map: any;

  constructor() {
    this.loadMap('/map/1');
  }

  loadMap(url: string): void {
    let map;
    axios.get('/map/1').then((res: any) => {
      map = 'fucking fuck'
    });
    map = (!map) ? 'fuck fuck' : map;
    this.map = map;
  }
}
