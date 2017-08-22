<template>
  <div>
    <div class="backpack-which-top">
      <img @click="$emit('change', 'regular')" src="/images/backpack/bp_top_regular.gif">
      <img @click="$emit('change', 'quest')" src="/images/backpack/bp_top_quest_2.gif">
      <img @click="$emit('change', 'orbs')" src="/images/backpack/bp_top_orb_2.gif">
      <img @click="$emit('change', 'potions')" src="/images/backpack/bp_top_potion_2.gif">
      <img @click="$emit('change', 'keys')" src="/images/backpack/bp_top_key_2.gif">
    </div>
    <div class="backpack-which-top-right"></div>
    <div style="padding:1px;"></div>
</div>
</template>

<style>

.backpack-which-top {
  display: flex;
  height: 21px;
  background: url('/images/backpack/bp_top_border.gif');
  background-repeat: repeat-x;
  margin: 0 auto;
  text-align: center;
}

.backpack-which-top-right {
  width: 7px;
  background: url('/images/backpack/bp_left_b.gif');
  background-repeat: repeat-y;
}

</style>
