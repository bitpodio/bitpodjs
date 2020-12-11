<template>
  <i18n-n
    v-if="Currency !== ''"
    :value="value"
    :format="{ key: 'currency', currency: Currency }"
    :locale="$i18n.locale"
  >
  </i18n-n>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    refresh: {
      type: Function,
      default: () => false,
    },
  },
  data() {
    return {
      Symbol: '',
      Currency: '',
    }
  },
  mounted() {
    this.getCurrency()
    this.$eventBus.$on('event-tickets-currency-updated', this.getCurrency)
  },
  methods: {
    async getCurrency() {
      try {
        const res = await this.$axios.$get(
          `${this.$bitpod.getApiUrl()}Events/${this.$route.params.id}`
        )
        if (res) {
          this.Currency = res.Currency
          this.refresh()
          return res
        }
      } catch (e) {
        console.log('Error', e)
      }
    },
  },
}
</script>
