<template>
  <div>
    {{ date }}
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
  },
  data() {
    return {
      date: '',
    }
  },
  mounted() {
    const output = new Date(this.item.expiresat).toLocaleString()
    this.date = output === 'Invalid Date' ? '' : output
  },
}
</script>
