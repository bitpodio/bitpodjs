<template>
  <div>
    <div v-if="item.isPercent === true">{{ value }}%</div>
    <div v-else>
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context'],
  methods: {
    refresh() {
      debugger
      this.$apollo.queries.item.refresh()
    },
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
