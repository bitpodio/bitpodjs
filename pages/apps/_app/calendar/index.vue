<template>
  <div v-if="content">
    <Calendar :content="content" view-name="All Events" />
  </div>
</template>
<script>
import Calendar from '~/components/common/calendar'
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
