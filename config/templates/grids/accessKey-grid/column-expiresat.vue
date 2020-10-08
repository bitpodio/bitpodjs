<template>
  <div>
    {{ date }}
  </div>
</template>

<script>
import format from 'date-fns/format'
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
    const d = this.item.expiresat
    this.date = d ? format(new Date(d), 'PPp') : ''
  },
}
</script>
