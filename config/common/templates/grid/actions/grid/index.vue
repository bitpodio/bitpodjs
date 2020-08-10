<template>
  <div>
    <component
      :is="newItem || null"
      :content="content"
      :view-name="viewName"
      :on-new-item-save="onNewItemSave"
    />
  </div>
</template>
<script>
import { templateLoaderMixin } from '~/utility'

export default {
  mixins: [templateLoaderMixin],
  props: ['content', 'viewName', 'onNewItemSave'],
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
