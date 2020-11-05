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
  },
  computed: {
    route() {
      return this.localePath(
        `/apps/event/recurringcalendar/${this.$props.item.id}`
      )
    },
  },
}
</script>
