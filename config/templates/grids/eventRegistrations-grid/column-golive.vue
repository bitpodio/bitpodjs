<template>
  <a v-if="linkReady" :href="route()" target="_blank">
    <v-btn x-small color="primary">start</v-btn>
  </a>
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
    route() {
      if (this.type === 'Group') {
        return `/apps/event/live/${this.roomname}?e=${this.$route.params.id}`
      }
      const privateRoomName = `${
        this.item.FirstName.trim().replace(/[^a-zA-Z ]/g, '') || 'unknown'
      }-${this.item.LastName.trim().replace(/[^a-zA-Z ]/g, '') || 'user'}`
      return `/apps/event/live/${privateRoomName.toLowerCase()}-${this.item.RegistrationId.toLowerCase()}?e=${
        this.$route.params.id
      }`
    },
  },
}
</script>
