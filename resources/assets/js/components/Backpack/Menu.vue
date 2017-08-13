<template>
  <div>

    <div class="backpack-menu" v-show="showMenu === item.id">

      <div v-for="link in menuLinks" :key="link.id" :link="link">

        <div v-if="link.name === 'e'">
          <a @click="equip">Equip</a>
        </div>
        <div v-else-if="link.name === 'd'">
          <a @click="drop(index)">Drop</a>
        </div>
        <div v-else-if="link.name === 'z'">
          <a @click="vault(item.iid)">Vault</a>
        </div>
        <div v-else-if="link.name === 'v'">
          <a @click="view(item.iid)">View</a>
        </div>

      </div>

    </div>

  </div>
</template>


<script>

/**
 * Show Menu - Drop down menu for each item in the players backpack.
 * Equip, Drop, Vault, View, Sell..
 */

export default {

  props: {
    item: {
      type: Object,
      required: true
    },
    showMenu: {
      type: [Boolean, Number],
      required: true
    },
    index: {
      type: Number,
      required: true
    },

  },

  data() {
    return {
      menuLinks: []
    }
  },

  created() {
    this.createMenu()
  },

  methods: {
    createMenu() {

      let opts = this.item.item.options,
          menu = this.menuLinks = [];

      _.each(opts, (val) => {
        menu.push({
          name: val
        })
      })
    },

    equip() {

      axios.get('/backpack/equip/'+this.item.id).then(response => {
        let data = response.data;
        if (data.status === 'ok') {

          this.$emit('iequip', this.item.item.type)

        } else if (data.status === 'fail') {
          console.log('Error in backpack');
        }
      })

    },

    drop(index) {
      this.$emit('idrop', index)
    },

    vault(id) {

    },

    view(id) {

    }
  }

}

</script>

<style>

.backpack-menu {
  position: absolute;
	border: 1px solid black;
	border-bottom-width: 0;
	font: normal 12px Verdana;
	line-height: 18px;
	z-index: 100;
  width: 100px;
  background-color: #666;
}

.backpack a {
  width: 100%;
	display: block;
	text-indent: 3px;
	border-bottom: 1px solid black;
	padding: 1px 0;
	text-decoration: none;
	font-weight: bold;
}

.backpack a :hover {
  background-color: #273F2B;
}

</style>
