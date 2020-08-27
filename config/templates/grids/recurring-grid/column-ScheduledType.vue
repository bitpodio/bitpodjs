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
      return `/apps/event/list/Event/All Events`
    },
  },
}
</script>
