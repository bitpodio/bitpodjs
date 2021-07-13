<template>
  <div v-if="date !== undefined && date && Timezone !== ''">
    {{ getTimeStampDate(date, userTimezone) }}
  </div>
  <div v-else>
    {{ $d(new Date(date), 'long', $i18n.locale) }}
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
    context: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      date: this.item.timeStamp,
      userTimezone: this.$store.state.userProfileTimezone || '',
    }
  },
  methods: {
    getDate(timestampDate) {
      const newDate = this.$d(
        new Date(timestampDate),
        'long',
        this.$i18n.locale
      )
      return newDate
    },
    getTimeStampDate(timestamp, Timezone) {
      const timezoneOffset = parseInt(
        this.userTimezone.split(')')[0].split('UTC')[1]
      )
      const convertedDate =
        new Date(timestamp).getTime() + 3600000 * timezoneOffset
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
