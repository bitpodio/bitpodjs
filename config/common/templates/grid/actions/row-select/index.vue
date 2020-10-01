<template>
  <div>
    <component
      :is="editItem || null"
      v-if="isHiddenAction('edit')"
      :content="content"
      :view-name="viewName"
      :items="items"
      :on-update-item="onUpdateItem"
      :refresh="refresh"
      :context="context"
    />
    <component
      :is="deleteItem || null"
      v-if="isHiddenAction('delete')"
      :content="content"
      :view-name="viewName"
      :items="items"
      :on-delete-item="onDeleteItem"
      :refresh="refresh"
      :context="context"
    />
  </div>
</template>
<script>
import { templateLoaderMixin } from '~/utility'
import { gridActionMixin } from '~/utility/form'

export default {
  mixins: [templateLoaderMixin, gridActionMixin],
  props: {
    content: {
      type: null,
      default: null,
    },
    viewName: {
      type: String,
      required: true,
    },
    refresh: {
      type: null,
      default: null,
    },
    items: { type: Array, default: () => [] },
    onUpdateItem: { type: Function, default: () => {} },
    onDeleteItem: { type: Function, default: () => {} },
    context: {
      type: null,
      default: null,
    },
  },
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
