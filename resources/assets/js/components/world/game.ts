import './../../bootstrap.js'
import axios, {AxiosResponse} from 'axios'

import {
 CanvasPool, Canvas, Render, CameraSettings, Camera, Player
} from './index'


export interface GameInterface {
  canvasPool: CanvasPool;
  render: Render;
  camera: Camera;
  player: Player;
}

export class Game {
  public canvasPool: CanvasPool;
  public render: Render;
  public camera: Camera;
  public player: Player;

  constructor(map: any) {

  }

}
