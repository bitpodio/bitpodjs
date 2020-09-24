<template>
  <div>
    <deleteItem
      :content="content"
      :view-name="viewName"
      :items="items"
      :on-delete-item="onDeleteItem"
      :refresh="refresh"
      :context="context"
    />
    <resendRegistrationEmail :items="items" />
  </div>
</template>

<script>
import resendRegistrationEmail from './resendRegistrationEmail.vue'
import deleteItem from '~/config/common/templates/grid/actions/row-select/delete-item.vue'
export default {
  components: {
    resendRegistrationEmail,
    deleteItem,
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
    context: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
}
</script>
