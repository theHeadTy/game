<template>
  <div>

    <div :mob="mob">
      <span>{{ mob.name }}</span>
    </div>

  </div>
</template>

<script>

export default {

  props: ['mob']


}

</script>
