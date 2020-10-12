<template>
  <div class="mxcol-name d-block text-truncate">
    {{ formatDate }}
  </div>
</template>

<script>
import { formatedDate } from '~/utility/form.js'
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  computed: {
    formatDate() {
      const date = this.item.StartDate
      const timezone = this.item.Timezone
      const output = formatedDate(date, timezone)
      return output
    },
  },
}
</script>
