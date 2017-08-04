import Bluebird from 'bluebird'
import axios, { AxiosResponse } from 'axios'

/**
 * Load world map image.
 * @param {String} src
 * @return {Promise}
 *
 * @example
 *  loadMap('src_to_image_here').then(img => {
 *    canvasRender(img)
 *  })
 */
export function loadMap(src: string): Promise<any> {
  function load(src: string): Bluebird<any> {
    if (!src) {
      return Bluebird.reject(src);
    }
    let image: HTMLImageElement = new Image();
        image.src = src;
    return new Bluebird((resolve, reject) => {
      if (image.naturalWidth) {
        resolve(image)
      } else if (image.complete) {
        reject(image)
      }
      image.onload = () => {
        resolve(image)
      }
      image.onerror = (error: ErrorEvent) => {
        reject(image)
        console.log(error)
      }
    })
  }

  async function initLoad(): Promise<any> {
    try {
      return await load(src);
    } catch (error) {
      console.log(error)
      return;
    }
  }
  return initLoad()

}

export function loadMapData(url): Promise<any> {
  function load(url): Promise<any> {
    return axios.get(url).then((response: AxiosResponse) => {
      return JSON.parse(response.data)
    })
  }

  async function getMap(): Promise<any> {
    try {
      return await load(url)
    } catch (error) {
      console.log(error)
      return null
    }
  }
  return getMap();
}
