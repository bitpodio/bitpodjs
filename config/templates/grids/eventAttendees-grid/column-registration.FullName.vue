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
      const regId = this.item.registration
        ? atob(this.item.registration.id).split(':')[1]
        : ''
      return `/apps/event${this.context.basePath}/${regId}`
    },
  },
}
</script>
