<template>
  <div v-if="date !== undefined && date" class="key-date">
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
      date: this.item.expiresat,
    }
  },
}
</script>
