<template>
  <div>
    <v-chip small :color="`${value}`" text-color="white"> {{ value }}</v-chip>
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context'],
  data() {
    return {
      Type: 'value',
    }
  },
}
</script>

<style scoped>
.v-chip.Personal {
  background: #0cb14b;
}
.v-chip.Group {
  background: orange;
}
</style>
