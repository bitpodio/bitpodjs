<template>
  <div>
    <component
      :is="newItem || null"
      v-if="isHiddenAction('new')"
      :content="content"
      :view-name="viewName"
      :on-new-item-save="onNewItemSave"
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
  props: ['content', 'viewName', 'onNewItemSave', 'refresh', 'context'],
  data() {
    return {
      newItem: null,
    }
  },
  computed: {
    _components() {
      return {
        newItem: {
          locations: [
            `templates/grids/${this.templateFolderName}/actions/grid/new-item.vue`,
            `common/templates/grid/actions/grid/new-item.vue`,
          ],
        },
      }
    },
  },
  methods: {},
}
</script>
