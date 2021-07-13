<template>
  <div v-if="date !== undefined && date && Timezone !== ''">
    {{ getTimeStampDate(date, userTimezone) }}
  </div>
</template>

<script>
import add from 'date-fns/add'
import sub from 'date-fns/sub'
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
      dateObj: {
        hours: '',
        minutes: '',
      },
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
      if (Timezone !== '') {
        let convertedDate
        const timezoneOffset = Timezone.match(/([A-Z]+[\\+-][0-9]+.*)/)[1]
          .split(' ')[0]
          .split('UTC')[1]
          .split(')')[0]
          .split(':')
        this.dateObj.hours = parseInt(timezoneOffset[0])
        this.dateObj.minutes = parseInt(timezoneOffset[1])
        if (timezoneOffset[0].includes('+')) {
          convertedDate = add(new Date(timestamp), this.dateObj)
        } else {
          convertedDate = sub(new Date(timestamp), Math.abs(this.dateObj))
        }
        const newDate = this.$d(
          new Date(convertedDate),
          'long',
          this.$i18n.locale
        )
        return newDate
      } else {
        const newDate = this.$d(new Date(timestamp), 'long', this.$i18n.locale)
        return newDate
      }
    },
  },
}
</script>
