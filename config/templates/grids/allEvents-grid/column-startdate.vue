<template>
  <div v-if="item.StartDate" class="mxcol-name d-block text-truncate">
    {{ getEventStartDate(item.StartDate, item.Timezone) }}
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
    getEventStartDate(StartDate, Timezone) {
      StartDate = new Date(StartDate).toISOString()
      return this.$d(
        new Date(formatedDate(StartDate, Timezone)),
        'long',
        this.$i18n.locale
      )
    },
  },
}
</script>
