<template>
  <div>
    <v-chip
      v-for="value in value"
      :key="value"
      class="ma-2"
      small
      color="orange"
      text-color="white"
      >{{ value }}</v-chip
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
