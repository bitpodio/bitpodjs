<template>
  <div>
    <v-list-item>
      <newItem
        :content="content"
        :view-name="viewName"
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
    <v-list-item>
      <campaign
        :button-label="$t('Common.EmailCampaign')"
        template="General Template"
        my-template="My General Template"
      />
    </v-list-item>
    <v-list-item>
      <invitationHistory />
    </v-list-item>
    <v-list-item>
      <importContact
        sample-file-name="v1573631144/Contact.csv"
        :template-data="fieldNames"
        model-name="Contact"
      />
    </v-list-item>
  </div>
</template>

<script>
import invitationHistory from './invitationHistory.vue'
import importContact from '~/components/common/import'
import campaign from '~/config/templates/grids/eventInvites-grid/actions/grid/sendEventInvite.vue'
import newItem from '~/config/common/templates/grid/actions/grid/new-item.vue'
import exportCsv from '~/config/common/templates/grid/actions/grid/export-csv.vue'
export default {
  components: {
    invitationHistory,
    newItem,
    campaign,
    importContact,
    exportCsv,
  },
  props: {
    content: {
      type: null,
      default: null,
    },
    viewName: {
      type: String,
      required: true,
    },
    refresh: {
      type: null,
      default: null,
    },
    onNewItemSave: { type: Function, default: () => {} },
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
  },
  data() {
    return {
      fieldNames: ['FirstName', 'LastName', 'Email', 'Organization', 'Job'],
    }
  },
  mounted() {
    this.$emit('has-custom-grid-action', true)
  },
}
</script>
