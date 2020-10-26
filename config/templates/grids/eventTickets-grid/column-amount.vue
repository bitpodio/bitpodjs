<template>
  <div>{{ Symbol }}{{ value }}.00</div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      Symbol: '',
    }
  },
  mounted() {
    this.getCurrency()
  },
  methods: {
    async getCurrency() {
      try {
        const res = await this.$axios.$get(
          `${this.$bitpod.getApiUrl()}Events/${this.$route.params.id}`
        )
        if (res) {
          this.getCurrencySymbol(res.Currency)
          return res
        }
      } catch (e) {
        console.log('Error', e)
      }
    },

    getCurrencySymbol(Currency) {
      this.Symbol = Number()
        .toLocaleString(Currency, { style: 'currency', currency: Currency })
        .slice(0, 1)
    },
  },
}
</script>
