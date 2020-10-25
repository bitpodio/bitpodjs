<template>
  <div class="d-inline-flex">
    <v-btn
      v-if="linkReady"
      tile
      depressed
      color="success"
      x-small
      class="rounded"
      @click="goLive"
    >
      Join Session
      <v-icon right>
        mdi-video
      </v-icon>
    </v-btn>
    <copy
      v-if="linkReady"
      class="pl-2"
      :text-to-copy="copyLink"
      icon-size="15"
      :unique-id="`btn${item.id}`"
      tooltip="Copy attendee link"
    />
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
      link: '',
      copyLink: '',
    }
  },
  mounted() {
    this.item.SessionId.map(async (id) => {
      try {
        const res = await this.$axios.$get(
          `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Sessions/${id}`
        )
        if (res) {
          if (res.LocationType === 'Bitpod Virtual') {
            const roomName = this.item.ZoomLink.split('/')[3]
            this.link = `apps/event/live/${roomName}?e=${this.$route.params.id}`
            this.copyLink = `https://${nuxtconfig.integrationLinks.BITOPD_VIRTUAL_LINK}/${roomName}`
            this.linkReady = true
          }
          if (res.LocationType === 'Zoom') {
            this.link = this.item.ZoomLink
            this.copyLink = this.link
            this.linkReady = true
          }
          if (res.LocationType === 'Online meeting') {
            this.link = res.WebinarLink
            this.copyLink = this.link
            this.linkReady = true
          }
        }
      } catch (e) {
        console.log('Error', e)
      }
    })
  },
  methods: {
    goLive() {
      window.open(this.link)
    },
  },
}
</script>
