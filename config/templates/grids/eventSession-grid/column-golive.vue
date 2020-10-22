<template>
  <v-btn
    v-if="item.LocationType === 'Bitpod Virtual'"
    tile
    color="success"
    small
    class="rounded"
    @click="goLive"
  >
    <i18n path="Common.JoinSession" />
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
