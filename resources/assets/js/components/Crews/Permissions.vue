<template>
  <div>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Rank</th>
          <th v-for="(perm, index) in permissions" :key="index" :perm="perm">{{ perm }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rank, index) in ranks" :key="index" :rank="rank">
          <td>{{ rank.name }}</td>

          <td v-for="(perm, index) in permissions" :key="index" :perm="perm">
            <div class="btn-group btn-toggle">
              <input type="checkbox" value="rank" v-model="checkedRanks">
            </div>
          </td>

        </tr>
      </tbody>
    </table>
    <button @click="updatePerms">Update Permissions</button>

  </div>
</template>

<script>

export default {

  /*computed: {
    checkedRanks() {
      return _.find(this.roles, (item) => {
        return item.auth === 1;
      })
    }
  },*/

  data() {
    return {
      checkedRanks: []
    }
  },

  methods: {
    createChecked() {
      _.each(this.roles, (item) => {
        if (item.auth === 1) {
          this.checkedRanks.push(item.rank_id)
        }
      })
    },
    updatePerms() {
      console.log(this.checkedRanks);
    }
  },

  props: {
    permissions: {
      type: Array,
      required: true
    },
    ranks: {
      type: Array,
      required: true
    },
    roles: {
      type: Array,
      required: true
    }
  }

}

</script>
