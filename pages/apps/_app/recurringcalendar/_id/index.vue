<template>
  <div v-if="content">
    <Calendar />
  </div>
</template>
<script>
import Calendar from '~/components/common/recurringCalendar'
import { configLoaderMixin } from '~/utility'
export default {
  components: {
    Calendar,
  },
  mixins: [configLoaderMixin],
  computed: {
    content() {
      return this.contents ? this.contents.Event : null
    },
  },
}
</script>
