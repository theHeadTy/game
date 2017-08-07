<script>
/**
 * Component for the backpack menu links template.
 */
export default {

  name: 'backpack-links',

  props: {
    menu: {
      type: Array,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    showMenu: {
      type: Boolean,
      required: true
    }
  },

  template: `<div class="backpack-menu"
      v-show="showMenu === item.iid">
      <div
        v-for="link in menu" :key="link.id" :link="link">
        <div v-html="link.name"></div>
      </div>
    </div>`

}

</script>
