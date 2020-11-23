<template>
  <div class="mxcol-150 d-block text-truncate">
    <v-text v-for="val in value" :key="val" class="event-tags">
      {{ val }}</v-text
    >
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
}
</script>
