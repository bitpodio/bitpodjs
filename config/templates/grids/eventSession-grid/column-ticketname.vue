<template>
  <div>
    <v-chip
      v-for="val in (item && item.TicketName && item.TicketName.split(',')) ||
      []"
      :key="val"
      class="ma-0"
      small
      color="orange"
      text-color="white"
      >{{ val }}</v-chip
    >
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
}
</script>
