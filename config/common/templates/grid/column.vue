<template>
  <div :class="{ 'text-right': isNumber }">
    {{ value }}
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context', 'type'],
  data() {
    return {
      items: [],
      isNumber: this.type === 'number',
      // isNumber: true,
    }
  },
}
</script>
