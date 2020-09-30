<template>
  <div class="d-inline-block text-truncate mxcol-name">
    <nuxt-link :to="route"> {{ value }}</nuxt-link>
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
  computed: {
    route() {
      return `/apps/event${this.context.basePath}/activity/${this.item.id}`
    },
  },
}
</script>
