<template>
  <div
    :class="columnClass[column.type]"
    class="text-truncate"
    :style="{ maxWidth: this.column.width }"
  >
    {{ value }}
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context', 'type', 'column'],
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
