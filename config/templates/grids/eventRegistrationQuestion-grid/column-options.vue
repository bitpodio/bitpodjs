<template>
  <div class="mxcol-200 text-truncate">
    <v-chip
      v-for="val in value"
      :key="val"
      class="ma-0 mr-1"
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
