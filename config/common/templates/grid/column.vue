<template>
  <div :class="columnClass[type]">
    {{ value }}
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context', 'type', 'column'],
  data() {
    debugger
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
