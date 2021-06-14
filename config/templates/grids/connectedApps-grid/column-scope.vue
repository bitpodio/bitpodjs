<template>
  <div>
    <v-chip
      v-for="val in chipValue"
      :key="val"
      class="ma-0"
      small
      color="orange"
      text-color="white"
      >{{ val.displayName }}</v-chip
    >
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
  computed: {
    chipValue() {
      return this.value
    },
  },
}
</script>
