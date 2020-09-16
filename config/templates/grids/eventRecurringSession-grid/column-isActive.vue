<template>
  <v-checkbox v-model="checkbox" @change="updateRecurringSession"></v-checkbox>
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
    updateRecurringSession() {
      this.$axios
        .$patch(
          `https://${nuxtconfig.axios.eventUrl}/svc/api/Sessions/${this.item.id}`,
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
