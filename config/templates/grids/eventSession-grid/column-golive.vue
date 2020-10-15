<template>
  <a
    v-if="item.LocationType === 'Bitpod Virtual'"
    :href="route"
    target="_blank"
  >
    <v-btn x-small color="primary">start</v-btn>
  </a>
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
    route() {
      const roomName =
        (this.item.BitpodVirtualLink &&
          this.item.BitpodVirtualLink.split('/')[3]) ||
        'undefined'
      return `/apps/event/live/${roomName}?e=${this.$route.params.id}`
    },
  },
}
</script>
