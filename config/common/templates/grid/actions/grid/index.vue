<template>
  <div>
    <component :is="newItem || null" :content="content" :view-name="viewName" />
  </div>
</template>
<script>
import { templateLoaderMixin } from '~/utility'

export default {
  mixins: [templateLoaderMixin],
  props: ['content', 'viewName'],
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
