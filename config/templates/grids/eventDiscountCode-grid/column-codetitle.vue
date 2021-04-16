<template>
  <div>
    <v-chip class="ma-2 ml-0" small color="green" text-color="white">
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
