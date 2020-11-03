<template>
  <div class="d-inline-flex">
    <v-btn
      v-if="allowSession()"
      tile
      depressed
      color="success"
      x-small
      class="rounded"
      @click="goLive"
    >
      <i18n path="Common.JoinSession" />
      <v-icon right>
        mdi-video
      </v-icon>
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
        this.link = `apps/event/live/${roomName}?e=${this.$route.params.id}`
        this.copyLink = `https://${nuxtconfig.integrationLinks.BITOPD_VIRTUAL_LINK}/${roomName}`
      } else if (this.item.LocationType === 'Online event') {
        this.link = this.item.WebinarLink || ''
        this.copyLink = this.link
      } else {
        this.link = ''
        this.copyLink = ''
      }
      const endDate = new Date(this.item.StartDate)
      endDate.setMinutes(endDate.getMinutes() + this.item.Duration)
      return (
        (this.item.LocationType === 'Bitpod Virtual' ||
          this.item.LocationType === 'Online event') &&
        endDate.getTime() > new Date().getTime()
      )
    },
    goLive() {
      window.open(this.link)
    },
  },
}
</script>
