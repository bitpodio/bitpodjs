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
  props: ['content', 'viewName', 'onNewItemSave', 'refresh', 'context'],
}
</script>
