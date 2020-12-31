<template>
  <div>
    <v-list-item v-if="isHiddenAction('new')">
      <component
        :is="newItem || null"
        v-if="isHiddenAction('new')"
        :content="content"
        :view-name="viewName"
        :on-new-item-save="onNewItemSave"
        :refresh="refresh"
        :context="context"
      />
    </v-list-item>
    <v-list-item v-if="isHiddenAction('exportCsv') && canExport">
      <component
        :is="exportCSV || null"
        v-if="isHiddenAction('export-csv')"
        :content="content"
        :view-name="viewName"
        :on-csv-export="onCsvExport"
        :can-export="canExport"
        :export-in-progress="exportInProgress"
        :refresh="refresh"
        :context="context"
      />
    </v-list-item>
  </div>
</template>
<script>
import { templateLoaderMixin } from '~/utility'
import { gridActionMixin } from '~/utility/form'

export default {
  mixins: [templateLoaderMixin, gridActionMixin],
  props: {
    content: {
      type: null,
      default: null,
    },
    viewName: {
      type: String,
      required: true,
    },
    onNewItemSave: {
      type: Function,
      default: () => {},
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
    refresh: {
      type: null,
      default: null,
    },
    context: {
      type: null,
      default: null,
    },
  },
  data() {
    return {
      newItem: null,
      exportCSV: null,
    }
  },
  computed: {
    _components() {
      return {
        newItem: {
          locations: [
            `templates/grids/${this.templateFolderName}/actions/grid/new-item.vue`,
            `common/templates/grid/actions/grid/new-item.vue`,
          ],
        },
        exportCSV: {
          locations: [
            `templates/grids/${this.templateFolderName}/actions/grid/export-csv.vue`,
            `common/templates/grid/actions/grid/export-csv.vue`,
          ],
        },
      }
    },
  },
  mounted() {
    this.$emit('hasGridOption', true)
  },
  methods: {},
}
</script>
