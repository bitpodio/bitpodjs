<template>
  <div>
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
      return `/apps/event${this.context.basePath}/invite/${this.item.id}`
    },
  },
}
</script>
