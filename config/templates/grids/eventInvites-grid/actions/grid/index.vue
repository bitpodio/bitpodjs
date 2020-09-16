<template>
  <div class="d-flex">
    <newItem
      :content="content"
      :view-name="viewName"
      :on-new-item-save="onNewItemSave"
      :refresh="refresh"
      :context="context"
    />
    <newAction />
  </div>
</template>
<script>
import newAction from './new-action.vue'
import newItem from '~/config/common/templates/grid/actions/grid/new-item.vue'
export default {
  components: {
    newAction,
    newItem,
  },
  props: ['content', 'viewName', 'onNewItemSave', 'refresh', 'context'],
}
</script>
