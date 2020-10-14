<template>
  <div>
    <v-chip
      class="ma-2"
      small
      text-color="white"
      :class="{
        orange: value === 'Group',
        success: value === 'Personal',
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
