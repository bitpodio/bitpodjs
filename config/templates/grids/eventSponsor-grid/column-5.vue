<template>
  <div v-if="value" class="mxcol-200 text-truncate text-decoration-none">
    <a :href="value" target="_blank" class="text-decoration-none"
      ><v-icon left>fa-eye1</v-icon></a
    >
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
    value: {
      type: String,
      default: '',
      required: false,
    },
    context: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
}
</script>
