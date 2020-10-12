<template>
  <div>
    <div v-if="item.CheckIn === null">
      <v-chip
        class="ma-1 ml-0"
        color="blue"
        text-color="white"
        label
        small
        @click="updateDate"
      >
        Check In
      </v-chip>
    </div>
    <div v-else style="display: flex;">
      <v-icon color="success fs-16">mdi-check</v-icon>
      <div>Checked in Just now</div>
    </div>
  </div>
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
  methods: {
    async updateDate() {
      const URL = `https://${nuxtconfig.axios.eventUrl}/svc/api/Attes/${this.item.id}`
      try {
        const res = await this.$axios.$put(URL, {
          CheckIn: new Date(),
        })
        if (res) {
          this.refresh()
        }
      } catch (e) {
        console.error(
          `Errors in config/templates/grids/registrationAttendees-grid/column-checkin.vue on updateDate method context: API: ${URL}`,
          e
        )
      }
    },
  },
}
</script>
