<template>
  <div v-if="date !== undefined && date">
    {{ getTimeStampDate(date, userTimezone) }}
  </div>
</template>

<script>
import dateInUtc from 'date-in-utc'
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
    context: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      date: this.item.timeStamp,
      userTimezone: this.$store.state.userProfileTimezone,
    }
  },
  methods: {
    getTimeStampDate(timestamp, Timezone) {
      const timezoneOffset =
        parseInt(this.userTimezone.split(')')[0].split('UTC')[1]) + 8
      const convertedDate = dateInUtc(
        timezoneOffset,
        new Date(timestamp)
      ).toLocaleString()
      const newDate = this.$d(
        new Date(convertedDate),
        'long',
        this.$i18n.locale
      )
      return newDate
    },
  },
}
</script>
