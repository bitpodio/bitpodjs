<template>
  <div class="d-flex">
    <newItem :refresh="refresh" />
    <registrationType />
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
}
</script>
