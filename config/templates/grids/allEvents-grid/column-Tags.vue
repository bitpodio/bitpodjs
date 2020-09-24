<template>
  <div>
    <v-text v-for="value in value" :key="value" class="ma-2">
      {{ value }},</v-text
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
