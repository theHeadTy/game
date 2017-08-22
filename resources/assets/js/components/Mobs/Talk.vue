<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <button class="modal-default-button" @click="$emit('close')">X</button>

          <div class="modal-header"></div>

          <div style="padding: 5px;">

            <div class="col-md-6 col-md-offset2">

              <strong>Talk {{  }}</strong>



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

  created() {
    this.loadQuest()
  },

  data() {
    return {
      quest: null
    }
  },

  methods: {
    loadQuest() {
      axios.get('/quest/'+this.mob.id).then(response => {
        this.quest = response.data
        console.log(this.quest);
      })
    }
  },

  props: {
    mob: {
      type: Object,
      required: true
    }
  }


}

</script>
