import Bluebird from 'bluebird'
import axios from 'axios'

/**
 * Load world map image.
 * @param {String} src
 * @return {Callback|Promise}
 */
export function loadMap(src: string): Promise<any> {
  function load(src: string): Promise<any> {
    if (!src) {
      return Bluebird.reject();
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
      image.onerror = (error) => {
        reject(image)
        console.log(error)
      }
    })
  }

  async function create(): Promise<any> {
    try {
      return await load(src);
    } catch (error) {
      console.log(error)
    }
  }
  return create()


}

export function loadTileAtlas(url: string): any {
  let map: any;
  function load(url: string): any {
      axios.get(url).then((response: any) => {
      return response.data;
    });
  }
  async function init(): Promise<any> {
    try {
      return await load(url)
    } catch(error) {
      console.log(error)
    }
  }
  return init();
}
