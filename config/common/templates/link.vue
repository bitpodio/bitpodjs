<template>
  <div>
    <nuxt-link :to="route"> {{ value }}</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['item', 'value'],
  computed: {
    route() {
      return `${this.params.route}/${this.item.id}`
    },
  },
}
</script>
