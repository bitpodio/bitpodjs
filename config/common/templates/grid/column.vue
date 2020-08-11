<template>
  <div :class="columnClass[type]">
    {{ value }}
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context', 'type'],
  data() {
    return {
      columnClass: {
        number: 'type-number',
        date: 'type-date',
        checkbox: 'type-checkbox',
      },
      isNumber: this.type === 'number',
      // isNumber: true,
    }
  },
}
</script>

<style scoped>
.type-number {
  text-align: right;
}
</style>
