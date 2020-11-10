<template>
  <div v-if="item.EndDate" class="mxcol-name d-block text-truncate">
    {{ getEventEndDate(item.EndDate, item.Timezone) }}
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
  methods: {
    getEventEndDate(EndDate, Timezone) {
      EndDate = new Date(EndDate).toISOString()
      return this.$d(
        new Date(formatedDate(EndDate, Timezone)),
        'long',
        this.$i18n.locale
      )
    },
  },
}
</script>
