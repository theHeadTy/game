import * as Vue from 'vue'
import * as _ from 'lodash'
import axios from 'axios'
import { Draw, Camera, Keyboard, KeyboardSettings, Key } from './world/index'

// @todo needs to be called from the database, but for dev this works.
import * as jTiled from './world/maps/map1.json'

let keyboard = new Keyboard(),
  moving = false,
  elapsed = 0,
  drawPending = false,
  startTime = -1,
  progress = 0,
  animLength = 2000,
  map = new Draw.Map(),
  camera = new Camera(map),
  player = new Draw.Player(map);

camera.startFollow(player);

function draw() {
  drawPending = false;
  requestDraw();
}


function requestDraw() {
  if (!drawPending) {
    drawPending = true;
    requestAnimationFrame(loop);
  }
}


// Game Loop
// @todo - add a render & update function to keep logic seperated.
function loop(timestamp: number): void  {

  let delta = (timestamp - elapsed) / 1000;
  delta = _.min([delta, .25]);
  elapsed = timestamp;

  //progress = 0;
  if (startTime < 0) {
    startTime = timestamp;
  } else {
    progress = timestamp - startTime;
  }

  draw();

  _.each(keyboard.keys, (key: Key) => {
    if (key.isDown) {
      let [action, ...params]: any = key.action.split(' ');
      if (action == 'move') {
        let [deltaX, deltaY]: any = _.map(params, _.toInteger);
        player.move(delta, deltaX, deltaY);

        update();
        render();

        getNewMobs();

      }
    }
  });

}


function update() {
  camera.update();
}

function render() {

  map.draw(0, camera);
  map.drawPlayer(camera, player);
  map.drawPath();

}

async function getNewMobs(): Promise<any> {
  try {
    let data = await findMobs();
    $('#mobs').html(data);
  } catch (err) {
    console.log(err)
  }
}

function findMobs(): Promise<any> {
  let x = _.floor(player.x / 32),
      y = _.floor(player.y / 32),
      url: string = `/mobs/x/${y}/y/${x}`
  return new Promise((resolve) => {
    let data = axios.get(url).then((response) => {
      return response.data;
    });
    resolve(data);
  }).then((val: any) => {
    return val;
  });
}

function start() {

  map.clickEventOn();

  /* Draw Game */
  _.delay(() => {
      render();
      draw();
      getNewMobs();
  }, 10);

}

window.onload = () => {
  start();
}
