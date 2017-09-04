<template>
  <div>

    <strong> {{ updatedText }} </strong>

    <table class="table table-bordered table-striped table-sm">
      <thead class="thead-default">
        <tr>
          <th>Rank</th>
          <th v-for="(name, index) in names" :key="index" :name="name">{{ name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rank, index) in ranks" :key="index" :rank="rank">
          <td>{{ rank.name }}</td>
          <td><input type="checkbox" :value="rank.edit.rid" v-model="rank.edit.checked"></td>
          <td><input type="checkbox" :value="rank.boot.rid" v-model="rank.boot.checked"></td>
          <td><input type="checkbox" :value="rank.invites.rid" v-model="rank.invites.checked"></td>
          <td><input type="checkbox" :value="rank.hitlist.rid" v-model="rank.hitlist.checked"></td>
          <td><input type="checkbox" :value="rank.ranks.rid" v-model="rank.ranks.checked"></td>
          <td><input type="checkbox" :value="rank.bank.rid" v-model="rank.bank.checked"></td>
          <td><input type="checkbox" :value="rank.raids.rid" v-model="rank.raids.checked"></td>
          <td><input type="checkbox" :value="rank.vault.rid" v-model="rank.vault.checked"></td>
          <td><input type="checkbox" :value="rank.shop.rid" v-model="rank.shop.checked"></td>
          <td><input type="checkbox" :value="rank.message.rid" v-model="rank.message.checked"></td>
          <td><input type="checkbox" :value="rank.permissions.rid" v-model="rank.permissions.checked"></td>
        </tr>
      </tbody>
      <tr>
        <td colspan="12">
          <button class="btn btn-primary" @click="updatePerms">Update</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
/**
 * Crew Permissions
 */
export default {

  created() {
    this.createRanks()
  },

  data() {
    return {
      ranks: [],
      updatedText: '',
    }
  },

  methods: {
    createRanks(i) {

      _.each(this.perms, (perm, key) => {

        this.ranks.push({
          id: perm.id,
          rid: perm.rank_id,
          name: perm.rank_name,
          edit: {
            id: perm.rank_id,
            checked: perm.edit
          },
          boot: {
            id: perm.rank_id,
            checked: perm.boot
          },
          invites: {
            id: perm.rank_id,
            checked: perm.invites
          },
          hitlist: {
            id: perm.rank_id,
            checked: perm.hitlist
          },
          ranks: {
            id: perm.rank_id,
            checked: perm.ranks
          },
          bank: {
            id: perm.rank_id,
            checked: perm.bank
          },
          raids: {
            id: perm.rank_id,
            checked: perm.raids
          },
          vault: {
            id: perm.rank_id,
            checked: perm.vault
          },
          shop: {
            id: perm.rank_id,
            checked: perm.shop
          },
          message: {
            id: perm.rank_id,
            checked: perm.message
          },
          permissions: {
            id: perm.rank_id,
            checked: perm.permissions
          },
        })

      })

    },

    updatePerms() {
        axios.post('/crews/permissions', { ranks: this.ranks }).then(res => {
          this.updatedText = res.data.status;
        }).catch(error => {
          this.updatedText = 'There seemed to be an error..'
          console.log(error);
        })
    }

  },

  props: {
    names: {
      type: Array,
      required: true
    },
    perms: {
      type: Array,
      required: true
    }
  }

}

</script>
