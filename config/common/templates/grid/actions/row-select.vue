<template>
  <div>
    <component
      :is="rowSelectTemplates['edit-item'] || null"
      :content="content"
      :view-name="viewName"
      :items="items"
    />
    <component
      :is="rowSelectTemplates['delete-item'] || null"
      :content="content"
      :view-name="viewName"
      :items="items"
    />
    test
    <!-- <EditItem :content="content" :item="item" />
    <DeleteItem :content="content" :item="item" /> -->
  </div>
</template>
<script>
import { templateLoaderMixin } from '~/utility'
const SELECT_TEMPLATES = ['edit-item', 'delete-item']

function getGridTemplateInfo(content, viewName) {
  const view = content.views[viewName]
  return view.template || {}
}

export default {
  mixins: [templateLoaderMixin],
  props: ['content', 'viewName', 'items'],
  data() {
    return {
      rowSelectTemplates: {},
    }
  },
  computed: {},
  mounted() {
    const templateInfo = getGridTemplateInfo(this.content, this.viewName)
    const templateFolderName = templateInfo.name
    SELECT_TEMPLATES.forEach(async (selectTemplateName) => {
      this.rowSelectTemplates[selectTemplateName] = await this.loadTemplate([
        `templates/grids/${templateFolderName}/actions/row-select/${selectTemplateName}.vue`,
        `common/templates/grid/actions/row-select/${selectTemplateName}.vue`,
      ])
    })
  },
  methods: {},
}
</script>
