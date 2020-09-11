<template>
  <div>{{ Symbol }}{{ value }}.00</div>
</template>

<script>
import nuxtconfig from '../../../../nuxt.config'
export default {
  props: ['item', 'value', 'context'],
  data() {
    return {
      Symbol: '',
    }
  },
  mounted() {
    this.getCurrency()
  },
  methods: {
    getCurrency() {
      return this.$axios
        .$get(
          `https://${nuxtconfig.axios.eventUrl}/svc/api/Events/${this.$route.params.id}`
        )
        .then((res) => {
          this.getCurrencySymbol(res.Currency)
          return res
        })
    },

    getCurrencySymbol(Currency) {
      this.Symbol = Number()
        .toLocaleString(Currency, { style: 'currency', currency: Currency })
        .slice(0, 1)
    },
  },
}
</script>
