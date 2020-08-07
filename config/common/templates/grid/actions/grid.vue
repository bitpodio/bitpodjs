<template>
  <div>
    <component
      :is="newItemTemplate || null"
      :content="content"
      :view-name="viewName"
    />
  </div>
</template>
<script>
import { templateLoaderMixin } from '~/utility'

function getGridTemplateInfo(content, viewName) {
  const view = content.views[viewName]
  return view.template || {}
}

export default {
  mixins: [templateLoaderMixin],
  props: ['content', 'viewName'],
  data() {
    return {
      newItemTemplate: null,
    }
  },
  computed: {},
  async mounted() {
    const templateInfo = getGridTemplateInfo(this.content, this.viewName)
    const templateFolderName = templateInfo.name
    this.newItemTemplate = await this.loadTemplate([
      `templates/grids/${templateFolderName}/actions/grid/new-item.vue`,
      `common/templates/grid/actions/grid/new-item.vue`,
    ])
  },
  methods: {},
}
</script>
