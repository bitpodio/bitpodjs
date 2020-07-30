<template>
  <v-chip class="ma-2">
    {{ value }}
  </v-chip>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
}
</script>
