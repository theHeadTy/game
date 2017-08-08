import Vue from 'vue'
/**
 * Draggable directive
 * v-draggable
 */
export default Vue.directive('draggable', {
  bind(el) {
    if (el) {
      let startX,
          startY,
          cacheX,
          cacheY,
          move = ['mousemove', 'touchmove'],
          up = ['mouseup', 'touchend'],
          mousemove = (event) => {
          let destX = event.clientX - cacheX,
                destY = event.clientY - cacheY
            el.style.left = startX + destX + 'px'
            el.style.top = startY + destY + 'px'
            event.preventDefault()
          },
          mouseup = (event) => {
            document.removeEventListener('mousemove', mousemove)
            document.removeEventListener('mouseup', mouseup)

            document.removeEventListener('touchmove', mousemove)
            document.removeEventListener('touchend', mouseup)

            event.preventDefault()
          },
          mousedown = (event) => {
            startX = el.offsetLeft
            startY = el.offsetTop
            cacheX = event.clientX
            cacheY = event.clientY

            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseup)

            document.addEventListener('touchmove', mousemove)
            document.addEventListener('touchend', mouseup)
            event.preventDefault()
          }

        el.addEventListener('mousedown', mousedown)
        el.addEventListener('touchstart', mousedown)

    }
  }
})
