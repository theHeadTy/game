import { find } from 'lodash'
interface EquipmentSlots {
  head: string;
}

export class Equipment {

  public items: any;

  constructor(items: any) {
    this.items = items;
  }

  slot(slot: string): any {
    return find(this.items, (obj: any) => {
      return obj.item.slot === slot
    })
  }

}
