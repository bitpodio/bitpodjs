<template>
  <div class="d-inline-flex">
    <importContact
      sample-file-name="v1574252622/Attendee.csv"
      :template-data="fieldNames"
      model-name="attendee"
    />
    <newItem
      :content="content"
      :view-name="viewName"
      :items="items"
      :on-update-item="onUpdateItem"
      :refresh="refresh"
      :context="context"
    />
  </div>
</template>

<script>
import newItem from '~/config/common/templates/grid/actions/grid/new-item.vue'
import importContact from '~/components/common/import'
export default {
  components: {
    newItem,
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
    onUpdateItem: {
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
  data() {
    return {
      fieldNames: [
        'Salutation',
        'FirstName',
        'LastName',
        'Email',
        'Phone',
        'CompanyName',
        'Job Title',
      ],
    }
  },
}
</script>
