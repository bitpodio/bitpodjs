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
      <i18n path="Common.GotoStage" />
      <v-icon right> mdi-video </v-icon>
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
      sessionName: '',
      linkReady: false,
      link: '',
      copyLink: '',
    }
  },
  mounted() {
    this.item.SessionId.map(async (id) => {
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$get(`${url}Sessions/${id}`)
        if (res) {
          this.sessionName = res.Name
          if (res.LocationType === 'Bitpod Virtual' && this.item.ZoomLink) {
            const roomName = this.item.ZoomLink.split('/')[3]
            this.link = `apps/event/live/${roomName}?e=${this.$route.params.id}&n=${this.sessionName}`
            this.copyLink = `https://${this.$config.integrationLinks.BITOPD_VIRTUAL_LINK}/${roomName}`
            this.linkReady = true
          }
          if (res.LocationType === 'Zoom' && this.item.ZoomLink) {
            this.link = this.item.ZoomLink
            this.copyLink = this.link
            this.linkReady = true
          }
          if (res.LocationType === 'Online meeting' && res.WebinarLink) {
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
