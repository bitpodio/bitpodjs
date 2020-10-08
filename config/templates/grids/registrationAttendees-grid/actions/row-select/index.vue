<template>
  <div>
    <editItem
      :content="content"
      :view-name="viewName"
      :items="items"
      :on-update-item="onUpdateItem"
      :refresh="refresh"
      :context="context"
    />
    <deleteItem
      :content="content"
      :view-name="viewName"
      :items="items"
      :on-delete-item="onDeleteItem"
      :refresh="refresh"
      :context="context"
    />

    <printBadges :items="items" :context="context" />
  </div>
</template>

<script>
import printBadges from './print-badges.vue'
import deleteItem from '~/config/common/templates/grid/actions/row-select/delete-item.vue'
import editItem from '~/config/common/templates/grid/actions/row-select/edit-item.vue'
export default {
  components: {
    printBadges,
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
