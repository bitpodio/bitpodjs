<template>
  <div
    :class="columnClass[column.type]"
    class="text-truncate"
    :style="{ maxWidth: column.width }"
    :title="value"
  >
    {{ value }}
  </div>
</template>

<script>
export default {
  props: {
    column: {
      type: null,
      default: null,
    },
    value: {
      type: null,
      default: null,
    },
  },
  data() {
    return {
      columnClass: {
        number: 'type-number',
        date: 'type-date',
        checkbox: 'type-checkbox',
      },
    }
  },
}
</script>

<style scoped>
.type-number {
  text-align: right;
}
</style>
