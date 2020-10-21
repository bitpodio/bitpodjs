<template>
  <v-btn
    v-if="linkReady"
    tile
    color="success"
    small
    class="rounded"
    @click="goLive"
  >
    Join Session
    <v-icon right>
      mdi-video
    </v-icon>
  </v-btn>
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
    value: {
      type: String,
      default: '',
      required: false,
    },
    context: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  data() {
    return {
      linkReady: false,
      roomname: '',
      type: '',
    }
  },
  mounted() {
    this.item.SessionId.map(async (id) => {
      try {
        const result = await this.$axios.$get(
          `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Registrations/${this.item.id}/attendee`
        )
        const res = await this.$axios.$get(
          `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Sessions/${id}`
        )
        if (res && result) {
          if (res.BitpodVirtualLink) {
            this.roomname = `${res.BitpodVirtualLink.split('/')[3]}-${new Date(
              result[0].BookingDate || null
            )
              .getTime()
              .toString(36)}`
            this.linkReady = true
          }
          this.type = res.Type
        }
      } catch (e) {
        console.log('Error', e)
      }
    })
  },
  methods: {
    goLive() {
      let roomName
      if (this.type === 'Group') {
        roomName = this.roomname
      } else {
        roomName = `${
          this.item.FirstName.trim().replace(/[^a-zA-Z ]/g, '') || 'unknown'
        }-${this.item.LastName.trim().replace(/[^a-zA-Z ]/g, '') || 'user'}-${
          this.item.RegistrationId
        }`.toLowerCase()
      }
      window.open(`apps/event/live/${roomName}?e=${this.$route.params.id}`)
    },
  },
}
</script>
