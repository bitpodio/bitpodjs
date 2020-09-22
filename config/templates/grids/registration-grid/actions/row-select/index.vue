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
    <resendRegistrationEmail :items="items" />
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
  props: [
    'content',
    'viewName',
    'items',
    'refresh',
    'onDeleteItem',
    'onUpdateItem',
    'context',
  ],
}
</script>
