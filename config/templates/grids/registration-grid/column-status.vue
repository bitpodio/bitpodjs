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
      Status: 'value',
    }
  },
}
</script>

<style scoped>
.v-chip.Success {
  background: #0cb14b;
}
.v-chip.Pending {
  background: orange;
}
.v-chip.Failed {
  background: #f25955;
}
.v-chip.Cancelled {
  background: orange;
}
</style>
