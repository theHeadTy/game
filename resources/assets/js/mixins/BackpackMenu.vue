
<script>


export default {

  name: 'backpack-menu',

  data() {
    return {
      menu: [],
      showMenu: false,
    }
  },

  methods: {

    makeMenu(event, item) {

      this.showMenu = item.iid

      let opts = item.options,
          menu = this.menu = [];

      if (this.showMenu) {
        event.stopPropagation();
      }

      _.each(opts, (val) => {
        menu.push({
          name: this.makeMenuContent(val, item)
        })
      })
      console.log(menu);
    },

    makeMenuContent(value, item) {
      switch (value) {
        case 'e':
          return `<a @click="equip(item);">Equip</a>`
          break;
        case 'd':
          return `<a @click="drop(item);">Drop</a>`
          break;
        case 'z':
          return `<a @click="value(item);">Valut</a>`
          break;
        case 'v':
          return `<a @click="view(item);">View</a>`
          break;
      }
    },

    equip(item) {
      console.log('equipped item?');
      //axios.get('/backpack/equip/'+item.iid).then(response => {
      //  if (response.data.status === 'ok'){
          //item.splice(item.iid, 1);
      //    console.log('item can now be removed from the backpack object!');
      //  }
      //})
    }

  }

}
</script>
