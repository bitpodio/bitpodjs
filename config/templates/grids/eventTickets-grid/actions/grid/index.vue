<template>
  <div>
    <v-list-item>
      <newItem :refresh="refresh" />
    </v-list-item>
    <v-list-item>
      <registrationType />
    </v-list-item>
    <seatmapTickets />
  </div>
</template>

<script>
import registrationType from './registrationType'
import newItem from './new-item.vue'
import seatmapTickets from './seatmapTickets.vue'
export default {
  components: {
    registrationType,
    newItem,
    seatmapTickets,
  },
  props: {
    viewName: {
      type: String,
      default: '',
    },
    content: {
      type: Object,
      default: () => {},
      required: false,
    },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
    onNewItemSave: {
      type: Function,
      default: () => false,
      required: false,
    },
    context: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  mounted() {
    this.$emit('hasGridOption', true)
  },
}
</script>
