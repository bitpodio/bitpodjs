<template>
  <div>
    <v-chip small :color="`${value}`" text-color="white"> {{ value }}</v-chip>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
      required: false,
    },
  },
  data() {
    return {
      Type: 'value',
    }
  },
}
</script>

<style scoped>
.v-chip.Free {
  background: #0cb14b;
}
.v-chip.Paid {
  background: orange;
}
.v-chip.Donation {
  background: orange;
}
</style>
