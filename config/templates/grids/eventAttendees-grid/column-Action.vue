<template>
  <div>
    <div v-if="item.CheckIn">
      <v-chip
        class="ma-2"
        color="orange"
        text-color="white"
        label
        @click="updateDate"
      >
        Cancel Checkin
      </v-chip>
    </div>
    <div v-else>
      <v-icon></v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context'],
  methods: {
    refresh() {
      debugger
      this.$apollo.queries.tableData.refresh()
    },
    updateDate() {
      alert('are you sure, you want to cancel check in?')
      this.$axios
        .$put(`https://event.test.bitpod.io/svc/api/Attes/${this.item.id}`, {
          CheckIn: null,
        })
        .then((res) => {
          debugger
          this.refresh()
          return res
        })
        .catch((e) => {
          console.log('error', e)
        })
    },
  },
}
</script>
