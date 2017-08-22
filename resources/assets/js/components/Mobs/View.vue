<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <button class="modal-default-button" @click="$emit('close')">X</button>

          <div class="modal-header"></div>

          <div style="padding: 5px;">

            <div class="col-md-6 col-md-offset2">

              <strong>{{ mob.name }}</strong>

              <div> {{ mob.description }} </div>

              <div>
                <a @click="$emit('close')">Back to world</a>
              </div>



            </div>

            <div class="col-md-6 col-md-offset2">

              <img src="http://placehold.it/250x250">

            </div>

          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {

  props: {
    mob: {
      type: Object,
      required: true
    }
  },

}

</script>
