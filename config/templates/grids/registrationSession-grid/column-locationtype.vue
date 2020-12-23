<template>
  <div v-if="value">
    <v-chip
      small
      :class="{
        primary: value === 'Venue',
        success: value === 'Bitpod Virtual',
        warning: value === 'Online event',
      }"
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
}
</script>
