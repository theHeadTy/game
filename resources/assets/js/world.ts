import * as _ from 'lodash'
import axios from 'axios'
import {Draw, Camera, Keyboard, KeyboardSettings, Key } from './world/index'

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

map.testDraw();

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
      let [action, ...params] = key.action.split(' ');
      if (action == 'move') {
        let [deltaX, deltaY]: number[] = _.map(params, _.toInteger);
        player.move(delta, deltaX, deltaY);
        update();
        render();
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

function start() {
  axios(`/mobs/x/${_.floor(player.x / 32)}/y/${_.floor(player.y / 32)}`).then((response: any) => {
    $('#mobs').html(response.data);
  });
  setTimeout(() => {
      render();
      draw();
  }, 10);
  /*let timer = setInterval(() => {
    render();
    draw();
    clearInterval(timer);
  }, 10);
  */
}

window.onload = () => {
  start();
}
