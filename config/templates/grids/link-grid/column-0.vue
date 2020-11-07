<template>
  <div>
    <nuxt-link :to="route"> {{ value }}</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: null,
      default: null,
    },
    value: {
      type: null,
      default: null,
    },
    context: {
      type: null,
      default: null,
    },
  },
  computed: {
    route() {
      return this.localePath(
        `/apps/event${this.context.basePath}/${this.item.id}`
      )
    },
  },
}
</script>
