<template>
  <div>
    <div v-if="item.CheckIn === null">
      <v-chip
        class="ma-2"
        color="blue"
        text-color="white"
        label
        @click="updateDate"
      >
        Check In
      </v-chip>
    </div>
    <div v-else>
      <v-icon color="success">mdi-check</v-icon>
      <div>Checked in Just now</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context', 'tableData', 'refresh'],
  methods: {
    updateDate() {
      this.$axios
        .$put(`https://event.test.bitpod.io/svc/api/Attes/${this.item.id}`, {
          CheckIn: new Date(),
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
