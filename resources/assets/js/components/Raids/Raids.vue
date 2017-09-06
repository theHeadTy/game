<template>
  <div>

    <div v-for="raid in raids" :key="raid.id" :raid="raid">
      {{ raid.name }} | <a :href="createRaid(raid.id)">Attack</a>
    </div>

  </div>
</template>

<script>

export default {

  methods: {
    createRaid(id) {
      return '/raids/create/'+id
    }
  },

  props: {
    raids: {
      type: Array,
    }
  }

}

</script>
