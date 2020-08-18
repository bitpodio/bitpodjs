<template>
  <div :class="columnClass[type]" :style="{ maxWidth: myComputedHeight }">
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
    }
  },
  computed: {
    myComputedHeight() {
      return '150px'
    },
  },
}
</script>

<style scoped>
.type-number {
  text-align: right;
}
</style>
