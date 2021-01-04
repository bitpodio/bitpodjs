<template>
  <div>
    <v-list-item>
      <importContact
        sample-file-name="v1574252622/Attendee.csv"
        :template-data="fieldNames"
        model-name="attendee"
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
  mounted() {
    this.$emit('has-custom-grid-action', true)
  },
}
</script>
