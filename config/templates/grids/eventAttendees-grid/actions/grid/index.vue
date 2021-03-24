<template>
  <div>
    <v-list-item>
      <importContact
        sample-file-name="v1574252622/Attendee.csv"
        :template-data="fieldNames"
        model-name="Attendee"
      />
    </v-list-item>
    <v-list-item>
      <newItem
        :content="content"
        :view-name="viewName"
        :items="items"
        :on-new-item-save="onNewItemSave"
        :refresh="refresh"
        :context="context"
      />
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
  </div>
</template>

<script>
import newItem from '~/config/common/templates/grid/actions/grid/new-item.vue'
import exportCsv from '~/config/common/templates/grid/actions/grid/export-csv.vue'
import importContact from '~/components/common/import'
export default {
  components: {
    newItem,
    exportCsv,
    importContact,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
      required: false,
    },
    viewName: {
      type: String,
      required: false,
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
    onDeleteItem: {
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
  data() {
    return {
      fieldNames: [
        { Field: 'Salutation' },
        { Field: 'FirstName' },
        { Field: 'LastName' },
        { Field: 'Email' },
        { Field: 'Phone' },
        { Field: 'CompanyName' },
        { Field: 'Job Title' },
      ],
    }
  },
  mounted() {
    this.$emit('has-custom-grid-action', true)
  },
}
</script>
