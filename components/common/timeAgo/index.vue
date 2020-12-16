<template>
  <div :class="{ 'fs-smaller': smallFontSize }">{{ timeAgo }}</div>
</template>
<script>
export default {
  props: {
    date: {
      type: Date,
      required: true,
    },
    smallFontSize: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    timeAgo() {
      return this.getData(this.date)
    },
  },
  methods: {
    getData(dateParam) {
      const a = new Date()
      const b = new Date(dateParam)
      let c = a.getTime() - b.getTime()
      c /= 1000
      if (c < 1) {
        return 'just now'
      } else {
        c /= 60
        if (c < 1) {
          return new Intl.RelativeTimeFormat(this.$i18n.locale, {
            style: 'long',
          }).format(Math.floor(c * 60) * -1, 'seconds')
        } else {
          c /= 60
          if (c < 1) {
            return new Intl.RelativeTimeFormat(this.$i18n.locale, {
              style: 'long',
            }).format(Math.floor(c * 60) * -1, 'minutes')
          } else {
            c /= 24
            if (c < 1) {
              return new Intl.RelativeTimeFormat(this.$i18n.locale, {
                style: 'long',
              }).format(Math.floor(c * 24) * -1, 'hours')
            } else {
              c /= 30
              if (c < 1) {
                return new Intl.RelativeTimeFormat(this.$i18n.locale, {
                  style: 'long',
                }).format(Math.floor(c * 30) * -1, 'days')
              } else {
                c /= 12
                if (c < 1) {
                  return new Intl.RelativeTimeFormat(this.$i18n.locale, {
                    style: 'long',
                  }).format(Math.floor(c * 12) * -1, 'months')
                } else {
                  return new Intl.RelativeTimeFormat(this.$i18n.locale, {
                    style: 'long',
                  }).format(Math.floor(c) * -1, 'years')
                }
              }
            }
          }
        }
      }
    },
  },
}
</script>
<style scoped>
.fs-smaller {
  font-size: 0.75rem;
}
</style>
