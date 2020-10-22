<template>
  <v-btn
    v-if="linkReady"
    tile
    depressed
    color="success"
    x-small
    class="rounded text-capitalize"
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
      link: '',
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
            this.link = `apps/event/live/${
              this.item.ZoomLink.split('/')[3]
            }?e=${this.$route.params.id}`
            this.linkReady = true
          }
          if (res.LocationType === 'Zoom') {
            this.link = this.item.ZoomLink
            this.linkReady = true
          }
          if (res.LocationType === 'Online meeting') {
            this.link = res.WebinarLink
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
