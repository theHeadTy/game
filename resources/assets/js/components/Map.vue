<template>
  <div>
    <div class="col-md-6">

      <div id="stage">

        <canvas ref="map" id="map" height="350" width="350" moz-opaque></canvas>
        <canvas ref="player" id="player" width="350" height="350" moz-opaque></canvas>
        <canvas ref="path" id="path" width="20" height="20" moz-opaque></canvas>

      </div>

      <!-- debug -->
      <div>
        <small>x: {{ x }} - y: {{ y }}</small>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as _ from 'lodash'
import axios from 'axios'

import { loadMap, loadMapData }  from './../util/loader'

import {
  GameInterface, Game, Keyboard, Key, CanvasInterface, Canvas,
  Render, PlayerInterface, Player, CameraSettings, Camera, Mobs, Raids
} from './world/index'

import * as jTiled from './../world/maps/map2.json'

let Tiled = (<any>jTiled);

export default {

  name: 'world-map',

  props: ['map', 'world'],

  data() {
    return {
      x: null,
      y: null,
      render: null,
      camera: null,
      player: null,
      canvasPool: null,
      mobData: null,
      mapData: null,
      raidData: null,
      elapsed: 0,
      delta: 0,
    }
  },
  computed: {
    keyboard() {
      return new Keyboard();
    },
  },
  methods: {
    raids(): void {
      this.$emit('sendraids', this.raidData.room(this.x, this.y));
    },

    mobs(): void {
      this.$emit('sendmobs', this.mobData.inRoom(this.x, this.y));
    },

    update(): void {
      this.camera.update();
      this.x = this.player.nodeX;
      this.y = this.player.nodeY;
      this.mobs();
      this.raids();
    },

    draw(): void {

      Canvas.clearWorld(this.canvasPool);

      //let world = this.world,
      //    length = world.layers.length,
      //    image = world.tilesets[0].image;

      let world = Tiled,
          length = Tiled.layers.length,
          image = Tiled.tilesets[0].image;

      let gid;

      loadMap(image).then(img => {
        _.each(world.layers, (val: any, key: number) => {
          gid = (world.tilesets.length)
            ? world.tilesets[key].firstgid
            : world.tilesets[0].firstgid;

          this.render.map(gid, val, img);
        })
      })
      this.render.player(this.player);
    },

    loop(time: number): void {

      requestAnimationFrame(this.loop);

      this.delta = (time - this.elapsed) / 1000;
      this.delta = _.min([this.delta, .25]);
      this.elapsed = time;

      _.each(this.keyboard.keys, (key: Key) => {
        if (key.isDown) {
          let [action, ...params]: any = key.action.split(' ');
          if (action === 'move') {
            let [deltaX, deltaY]: any = _.map(params, _.toInteger);
            this.player.update(this.delta, deltaX, deltaY);
          }
        }
      });

      this.update();
      this.draw();
    },

    init(): void {
      setTimeout(() => {
        this.update();
        this.draw();
        requestAnimationFrame(this.loop)
      }, 10)
    }
  },

  mounted() {

    const mapCanvas: HTMLCanvasElement = this.$refs.map;
    const mapCtx = mapCanvas.getContext('2d')!

    const playerCanvas: HTMLCanvasElement = this.$refs.player;
    const playerCtx = playerCanvas.getContext('2d')!

    /* Add Canvas Pool to vue data */
    let canvasPool: CanvasInterface = {
      canvas: {
        map: mapCanvas,
        player: playerCanvas
      },
      ctx: {
        map: mapCtx,
        player: playerCtx
      }
    }

    this.canvasPool = canvasPool;


    /* Create new Render instance. */
    let renderConfig = {
      canvas: canvasPool.canvas.map,
      ctx: canvasPool.ctx.map,
    }
    this.render = new Render(renderConfig, Tiled);

    let cameraConfig: CameraSettings = {
      width: canvasPool.canvas.map.width,
      height: canvasPool.canvas.map.height,
      mapWidth: Tiled.width * Tiled.tilewidth,
      mapHeight: Tiled.height * Tiled.tileheight
      //mapWidth: this.world.width * this.world.tilewidth,
      //mapHeight: this.world.height * this.world.tileheight
    }
    this.camera = new Camera(cameraConfig);
    this.render.setCamera(this.camera);

    /* Create new Player instance. */
    let playerConfig: PlayerInterface = {
      map: {
        width: Tiled.width * Tiled.tilewidth,
        height: Tiled.height * Tiled.tileheight
      },
      canvas: new Canvas(canvasPool.canvas.player, canvasPool.ctx.player)
    }

    this.player = new Player(playerConfig);
    this.camera.start(this.player);

    this.mobData = new Mobs(1);

    this.raidData = new Raids(1);
    this.raidData.getAll();

    console.log(this.raidData.raids)

    /* Start */
    this.init();

  },

}



</script>
