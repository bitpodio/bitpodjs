<template>
  <div
    v-if="date !== undefined && date"
    class="mxcol-name d-block text-truncate"
  >
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
  },
  data() {
    return {
      date: this.item.StartDate,
    }
  },
}
</script>
