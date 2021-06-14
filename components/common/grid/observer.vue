<template>
  <div :data-test-id="`grid-${dataTestId}`" class="observer" />
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => null,
    },
    dataTestId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    observer: null,
    timeoutId: null,
  }),
  mounted() {
    const options = this.options || {}
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        if (this.timeoutId) clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(() => {
          if (entry && entry.isIntersecting) {
            this.$emit('intersect')
            this.timeoutId = null
          }
        }, 150)
      }
    }, options)

    this.observer.observe(this.$el)
  },
  destroyed() {
    this.observer.disconnect()
  },
}
</script>
