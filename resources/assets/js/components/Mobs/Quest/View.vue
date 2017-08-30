<template>
  <div>

    <div class="col-md-6 col-md-offset2">
      <strong>{{ quest.name }}</strong>

      <div v-if="inQuest === false && !showAccept">

        <p>{{ quest.before }} - {{ quest.id }}</p>

        <button @click="showAccept = quest.id">Accept Quest</button>

      </div>

      <div v-else-if="inQuest === true && !showAccept">

        <quest-step :quest="quest" :id="quest.id"></quest-step>

      </div>


      <quest-accept
        v-if="showAccept === quest.id"
        @accept="acceptQuest"
        @close="showAccept = false"
        :quest="quest"
        :accepted="showAccept">
      </quest-accept>

    </div>

    <div class="col-md-6 col-md-offset2">

      <img src="http://placehold.it/250x250">

    </div>

  </div>
</template>

<script>
import Accept from './Accept.vue'
import Step from './Step.vue'

export default {

  components: {
    'quest-accept': Accept,
    'quest-step': Step,
  },

  created() {
    this.loadQuest();
  },

  data() {
    return {
      inQuest: false,
      showAccept: false,
      questData: null,
    }
  },

  methods: {
    loadQuest() {
      axios.get('/quest/'+this.quest.id).then(response => {
        if (response.data.inQuest === true) {
          this.inQuest = true;
        }
      })
    },
    acceptQuest(val) {
      this.inQuest = (val) ? true : false
      console.log('accepting quest!');
    },
  },

  props: {
    quest: {
      type: Object,
      required: true
    }
  }

}

</script>
