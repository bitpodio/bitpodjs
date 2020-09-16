<template>
  <div>
    <nuxt-link :to="route"> {{ value }}</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context'],
  computed: {
    route() {
      return `/apps/event${this.context.basePath}/${this.item.id}`
    },
  },
}
</script>
