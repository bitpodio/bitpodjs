<template>
  <v-col v-if="canExport" class="px-0">
    <v-btn text small @click="onCsvExport">
      <v-icon left>fa-upload</v-icon>
      <span>
        <i18n path="Drawer.ExportToCSV" />
      </span>
    </v-btn>
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
}
</script>

<style></style>
