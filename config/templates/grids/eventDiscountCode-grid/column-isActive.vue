<template>
  <v-checkbox v-model="checkbox" @change="updateOfferCode"></v-checkbox>
</template>

<script>
import nuxtconfig from '../../../../nuxt.config'
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
          `https://${nuxtconfig.axios.eventUrl}/svc/api/OfferCodes/${this.item.id}`,
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
