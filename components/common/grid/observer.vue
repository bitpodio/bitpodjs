<template>
  <div
    :data-test-id="`grid-${dataTestId}`"
    class="observer observer-position"
    :style="{ height: height }"
  />
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
    height: {
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
            this.$el.setAttribute(
              'data-test-id-loaded',
              `grid-${this.dataTestId}`
            )
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
<style scoped>
.observer-position {
  position: absolute;
  z-index: -1;
  width: 1px;
}
</style>
