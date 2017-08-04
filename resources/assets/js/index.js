import * as _ from 'lodash'
import axios from 'axios'
import { createModal, closeWindow } from './util/backpack/window.js'

import { BackpackEvent } from './equipment/BackpackEvent'

export function tBackpack() {
  console.log('backpack clicked.');
}

$(document).ready(function() {

  let backpack = new BackpackEvent();

});
