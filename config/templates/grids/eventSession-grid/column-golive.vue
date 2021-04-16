<template>
  <div class="d-inline-flex">
    <div v-if="item.LocationType === 'Venue'">
      <div @click="routeToMap">
        <i class="fa fa-map-marker blue--text" aria-hidden="true"></i>
        <a class="blue--text"><i18n path="Common.ViewMap" /></a>
      </div>
    </div>
    <v-btn
      v-if="item.LocationType !== 'Venue'"
      :disabled="allowSession()"
      tile
      depressed
      color="success"
      x-small
      class="rounded"
      @click="goLive"
    >
      <i18n path="Common.JoinSession" />
      <v-icon right> mdi-video </v-icon>
    </v-btn>
    <copy
      v-if="link"
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
      link: '',
      copyLink: '',
    }
  },
  methods: {
    allowSession() {
      if (this.item.LocationType === 'Bitpod Virtual') {
        const roomName =
          (this.item.BitpodVirtualLink &&
            this.item.BitpodVirtualLink.split('/')[3]) ||
          'undefined'
        this.link = `apps/event/live/${roomName}?e=${this.$route.params.id}&n=${this.item.Name}`
        this.copyLink = `https://${this.$config.integrationLinks.BITOPD_VIRTUAL_LINK}/${roomName}`
      } else if (this.item.LocationType === 'Online event') {
        this.link = this.item.WebinarLink || ''
        this.copyLink = this.link
      } else {
        this.link = ''
        this.copyLink = ''
      }
      const endDate = new Date(this.item.StartDate)
      endDate.setMinutes(endDate.getMinutes() + this.item.Duration + 15)
      return (
        (this.item.LocationType === 'Bitpod Virtual' ||
          this.item.LocationType === 'Online event') &&
        endDate.getTime() < new Date().getTime()
      )
    },
    goLive() {
      window.open(this.link)
    },
    routeToMap() {
      if (this.item.LocationType === 'Venue') {
        const lat =
          this.item &&
          this.item._CurrentAddress &&
          this.item._CurrentAddress.LatLng &&
          this.item._CurrentAddress.LatLng.lat
        const lng =
          this.item &&
          this.item._CurrentAddress &&
          this.item._CurrentAddress.LatLng &&
          this.item._CurrentAddress.LatLng.lng
        const URL = `${nuxtconfig.axios.googleMapUrl}?q=${lat},${lng}`
        window.open(URL)
      }
    },
  },
}
</script>
