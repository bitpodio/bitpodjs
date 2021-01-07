<template>
  <div>
    <v-list-item>
      <editItem
        :content="content"
        :view-name="viewName"
        :items="items"
        :on-update-item="onUpdateItem"
        :refresh="refresh"
        :context="context"
      />
    </v-list-item>
    <v-list-item>
      <deleteItem
        :content="content"
        :view-name="viewName"
        :items="items"
        :on-delete-item="onDeleteItem"
        :refresh="refresh"
        :context="context"
      />
    </v-list-item>
    <v-list-item>
      <resendRegistrationEmail :items="items" />
    </v-list-item>
  </div>
</template>

<script>
import resendRegistrationEmail from './resendRegistrationEmail.vue'
import deleteItem from '~/config/common/templates/grid/actions/row-select/delete-item.vue'
import editItem from '~/config/common/templates/grid/actions/row-select/edit-item.vue'
export default {
  components: {
    resendRegistrationEmail,
    deleteItem,
    editItem,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
      required: false,
    },
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
}
</script>
