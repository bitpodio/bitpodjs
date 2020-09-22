<template>
  <div class="d-flex">
    <newItem
      :content="content"
      :view-name="viewName"
      :on-new-item-save="onNewItemSave"
      :refresh="refresh"
      :context="context"
    />
    <div class="mt-3">
      <campaing />
    </div>
  </div>
</template>

<script>
import campaing from '~/config/templates/grids/eventInvites-grid/actions/grid/new-item.vue'
import newItem from '~/config/common/templates/grid/actions/grid/new-item.vue'
export default {
  components: {
    campaing,
    newItem,
  },
  props: ['content', 'viewName', 'onNewItemSave', 'refresh', 'context'],
}
</script>
