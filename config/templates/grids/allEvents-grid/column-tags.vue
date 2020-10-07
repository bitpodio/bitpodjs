<template>
  <div class="mxcol-name d-block text-truncate">
    <v-text v-for="val in value" :key="val" class="ma-2"> {{ val }},</v-text>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
}
</script>
