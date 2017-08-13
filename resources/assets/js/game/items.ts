import { find } from 'lodash'

export class Item {

  public items: any[];

  constructor(items: any) {
    this.items = items;
  }

  whereSlot(slot: string): any {
    return find(this.items, (obj) => {
      return obj.item.slot === slot
    })
  }

}
