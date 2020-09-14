<template>
  <div>
    <component
      :is="editItem || null"
      :content="content"
      :view-name="viewName"
      :items="items"
      :on-update-item="onUpdateItem"
      :refresh="refresh"
    />
    <component
      :is="deleteItem || null"
      :content="content"
      :view-name="viewName"
      :items="items"
      :on-delete-item="onDeleteItem"
      :refresh="refresh"
    />
  </div>
</template>
<script>
import { templateLoaderMixin } from '~/utility'

export default {
  mixins: [templateLoaderMixin],
  props: [
    'content',
    'viewName',
    'items',
    'onUpdateItem',
    'onDeleteItem',
    'refresh',
  ],
  data() {
    return {
      editItem: null,
      deleteItem: null,
    }
  },
  computed: {
    _components() {
      return {
        editItem: {
          locations: [
            `templates/grids/${this.templateFolderName}/actions/row-select/edit-item.vue`,
            `common/templates/grid/actions/row-select/edit-item.vue`,
          ],
        },
        deleteItem: {
          locations: [
            `templates/grids/${this.templateFolderName}/actions/row-select/delete-item.vue`,
            `common/templates/grid/actions/row-select/delete-item.vue`,
          ],
        },
      }
    },
  },
}
</script>
