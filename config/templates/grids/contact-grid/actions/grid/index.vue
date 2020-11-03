<template>
  <div class="d-flex">
    <newItem
      :content="content"
      :view-name="viewName"
      :on-new-item-save="onNewItemSave"
      :refresh="refresh"
      :context="context"
    />
    <div>
      <campaign
        :button-label="$t('Common.EmailCampaign')"
        template="General Template"
        my-template="My General Template"
      />
    </div>
    <invitationHistory />
    <importContact
      sample-file-name="v1573631144/Contact.csv"
      :template-data="fieldNames"
      model-name="contact"
    />
  </div>
</template>

<script>
import invitationHistory from './invitationHistory.vue'
import importContact from '~/components/common/import'
import campaign from '~/config/templates/grids/eventInvites-grid/actions/grid/sendEventInvite.vue'
import newItem from '~/config/common/templates/grid/actions/grid/new-item.vue'
export default {
  components: {
    invitationHistory,
    newItem,
    campaign,
    importContact,
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
}
</script>
