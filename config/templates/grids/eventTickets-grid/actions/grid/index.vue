<template>
  <div class="d-flex">
    <newItem
      :content="content"
      :view-name="viewName"
      :on-new-item-save="onNewItemSave"
      :refresh="refresh"
      :context="context"
    />
    <registrationType />
  </div>
</template>

<script>
import registrationType from './registrationType'
import newItem from '~/config/common/templates/grid/actions/grid/new-item.vue'
export default {
  components: {
    registrationType,
    newItem,
  },
  props: {
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
}
</script>
