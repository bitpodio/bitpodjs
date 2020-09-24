<template>
  <v-checkbox v-model="checkbox" @change="updateRecurringSession"></v-checkbox>
</template>

<script>
import nuxtconfig from '~/nuxt.config'
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
  },
  data() {
    return {
      checkbox: this.item.SeatReservation,
    }
  },
  methods: {
    async updateRecurringSession() {
      try {
        const res = await this.$axios.$patch(
          `https://${nuxtconfig.axios.eventUrl}/svc/api/Sessions/${this.item.id}`,
          {
            SeatReservation: this.checkbox,
          }
        )
        if (res) {
          this.refresh()
        }
      } catch (e) {
        console.log('Error', e)
      }
    },
  },
}
</script>
