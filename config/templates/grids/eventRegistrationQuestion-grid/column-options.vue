<template>
  <div>
    <v-chip
      v-for="val in value"
      :key="val"
      class="ma-2"
      small
      color="orange"
      text-color="white"
      >{{ val }}</v-chip
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
