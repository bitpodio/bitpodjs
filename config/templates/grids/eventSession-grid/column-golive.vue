<template>
  <v-btn
    v-if="allowSession"
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
  computed: {
    allowSession() {
      const endDate = new Date(this.item.StartDate)
      endDate.setMinutes(endDate.getMinutes() + this.item.Duration)
      return (
        this.item.LocationType === 'Bitpod Virtual' &&
        endDate.getTime() > new Date().getTime()
      )
    },
  },
  methods: {
    goLive() {
      const roomName =
        (this.item.BitpodVirtualLink &&
          this.item.BitpodVirtualLink.split('/')[3]) ||
        'undefined'
      window.open(`apps/event/live/${roomName}?e=${this.$route.params.id}`)
    },
  },
}
</script>
