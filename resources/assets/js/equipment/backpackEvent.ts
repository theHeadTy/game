import * as _ from 'lodash'
import axios, {AxiosResponse} from 'axios'

const modal = require('./../util/backpack/window.js');


export class BackpackEvent {

  public main: Element;
  public all: HTMLCollectionOf<Element>;
  public close: Element;

  public types: any;

  constructor() {

    this.main = document.getElementById('playerBackpack');
    this.all = document.getElementsByClassName('whichBackpack');
    this.close = document.getElementById('bpWin_close');

    this.mainBackpackClick();

  }


  mainBackpackClick(): void {
    this.main.addEventListener('mouseup', () => {
      axios.get('/backpack/regular').then((response: AxiosResponse) => {
        let bp = modal.createModal('Backpack', 'bpWin', 316);
        bp.innerHTML = response.data;
        this.toggleEvents();
        this.closeBackpack();
      })
    });
    this.main.removeEventListener('mouseup', () => {} );
  }

  toggleEvents(): void {
    console.time('#f1');
    let elems = this.all;
    _.each(elems, (val: Element) => {
      _.each(['click','ontouchstart'], (e: string) => {
        val.addEventListener(e, () => {
          this.loadPage(val.id)
        }, false)
      })
    })
    console.timeEnd('#f1');

  }

  loadPage(which: string): void {
    axios.get('/backpack/'+which).then((response: AxiosResponse) => {
      document.getElementById('bpWin_content').innerHTML = response.data;
      this.toggleEvents();
      this.closeBackpack();
    })
  }

  closeBackpack(): void {
    document.getElementById('bpWin_close').addEventListener('mouseup', () => {
      modal.closeWindow('bpWin');
    })
    document.getElementById('bpWin_close').removeEventListener('mouseup', () => {});
  }
}
