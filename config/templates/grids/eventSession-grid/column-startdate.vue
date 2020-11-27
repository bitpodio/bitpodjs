<template>
  <div>
    {{ $d(new Date(getZonedTime(item.StartDate)), 'long', $i18n.locale) }}
  </div>
</template>

<script>
import { utcToZonedTime } from 'date-fns-tz'
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  methods: {
    getZonedTime(datetime) {
      return utcToZonedTime(new Date(datetime || null), this.item.Timezone)
    },
  },
}
</script>
