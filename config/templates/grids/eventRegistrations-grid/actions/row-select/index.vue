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
  props: ['content', 'viewName', 'items', 'refresh', 'onDeleteItem', 'context'],
}
</script>
