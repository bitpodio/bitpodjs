<template>
  <div>
    <v-list-item>
      <newItem :refresh="refresh" />
    </v-list-item>
    <v-list-item v-if="canExport">
      <export-csv
        :content="content"
        :view-name="viewName"
        :on-csv-export="onCsvExport"
        :export-in-progress="exportInProgress"
        :can-export="canExport"
        :refresh="refresh"
        :context="context"
      />
    </v-list-item>
    <v-list-item>
      <registrationType />
    </v-list-item>
    <seatmap-tickets />
  </div>
</template>

<script>
import registrationType from './registrationType'
import newItem from './new-item.vue'
import seatmapTickets from './seatmapTickets'
import SeatmapTickets from './seatmapTickets.vue'
import exportCsv from '~/config/common/templates/grid/actions/grid/export-csv.vue'
export default {
  components: {
    registrationType,
    newItem,
    seatmapTickets,
    SeatmapTickets,
    exportCsv,
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
    onCsvExport: {
      type: Function,
      default: () => {},
    },
    exportInProgress: {
      type: Boolean,
      default: false,
    },
    canExport: {
      type: Boolean,
      default: false,
    },
    context: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  mounted() {
    this.$emit('has-custom-grid-action', true)
  },
}
</script>
<style scoped>
@media (min-width: 600px) {
  .pad-right {
    margin-right: 150px;
  }
}
</style>
