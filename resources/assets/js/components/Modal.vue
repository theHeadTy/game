<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <button class="modal-default-button" @click="$emit('close')">X</button>
          <div class="modal-header"></div>

          <div style="padding: 5px;">

          <transition name="fade">
            <slot>

            </slot>
          </transition>


          </div>

        </div>
      </div>
    </div>
  </transition>
</template>
