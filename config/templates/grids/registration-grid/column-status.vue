<template>
  <div>
    <v-chip
      small
      :class="{
        orange: value === 'Cancelled',
        red: value === 'Failed',
        orange: value === 'Pending',
        success: value === 'Success',
      }"
      text-color="white"
    >
      {{ value }}
    </v-chip>
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
