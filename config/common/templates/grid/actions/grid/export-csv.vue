<template>
  <v-col v-if="canExport" class="px-0">
    <v-btn text small @click="onCsvExport">
      <v-icon left>fa-download</v-icon>
      <span>
        <i18n path="Drawer.ExportToCSV" />
      </span>
    </v-btn>
    <v-dialog v-model="exportInProgress" persistent width="300">
      <v-card elevation="2" outlined tile>
        <v-card-title class="mb-3">
          <i18n path="Common.ExportInProgress" />
        </v-card-title>
        <v-card-text class="d-flex justify-center align-center">
          <v-progress-circular
            :size="70"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-card-text>
        <v-card-actions class="d-flex justify-end mt-2">
          <v-btn color="primary" text @click.stop="cancelExport">
            <i18n path="Drawer.Cancel" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { gridActionMixin } from '~/utility/form'
export default {
  mixins: [gridActionMixin],
  props: {
    content: {
      type: null,
      default: null,
    },
    viewName: {
      type: String,
      required: true,
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
      type: null,
      default: null,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  methods: {
    cancelExport() {
      this.$store.commit('setExportInProgress', false)
    },
  },
}
</script>

<style></style>
