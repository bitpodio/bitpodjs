<template>
  <div>
    <div v-if="item.BusinessType === 'Recurring'">
      <nuxt-link :to="recurringroute"> {{ value }}</nuxt-link>
    </div>
    <div v-else>
      <nuxt-link :to="route"> {{ value }}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context'],
  computed: {
    route() {
      return `/apps/event${this.context.basePath}/${this.item.id}`
    },
    recurringroute() {
      return `/apps/event${this.context.basePath}/recurring/${this.item.id}`
    },
  },
}
</script>
