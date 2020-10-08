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
    this.date = format(new Date(this.item.StartDate), 'PPp')
  },
}
</script>
