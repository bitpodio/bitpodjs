<template>
  <v-checkbox v-model="checkbox" @change="updateOfferCode"></v-checkbox>
</template>

<script>
export default {
  props: ['item', 'value', 'context', 'refresh'],
  data() {
    return {
      checkbox: this.item.isActive,
    }
  },
  methods: {
    updateOfferCode() {
      this.$axios
        .$put(
          `https://event.test.bitpod.io/svc/api/OfferCodes/${this.item.id}`,
          {
            isActive: this.checkbox,
          }
        )
        .then((res) => {
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
