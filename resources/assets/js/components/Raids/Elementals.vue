<template>
  <div class="elementals">
    <div v-for="(elem, index) in elementals" :key="index" :elem="elem">
      <span :style="{ color: elem.color }">{{ index }}: {{ elem.dmg }}</span>
    </div>
  </div>
</template>

<script>

export default {

  props: ['elementals']

}

</script>

<style scoped>

.elementals {
  font-weight: bold;
  position: absolute;
  width: 100px;
  text-align: left;
  padding: 5px;
  margin: 0 auto;
  background-color: black;
}


</style>
