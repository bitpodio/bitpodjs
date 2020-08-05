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
// import importTemplate from '~/utility/helper.js'

// export async function importTemplate(templateFolderName, fileName) {
//   try {
//     this.newItemTemplate = await importFile(
//       `~/config/templates/grids/${templateFolderName}/new-item.vue`
//     )
//   } catch (e) {
//     this.newItemTemplate = importFile(
//       `~/config/common/templates/grid/column.vue`
//     )
//   }
// }
import { templateLoaderMixin } from '~/utility'
// const importTemplate = (filePath) => import(filePath)

// function loadTemplate(templatePath) {
//   return () => import(`~/config/templates/grids/${templatePath}`)
// }

function getGridTemplateInfo(content, viewName) {
  const view = content.views[viewName]
  return view.template || {}
}

// const templateLoaderMixin = {
//   computed: {
//     templateLoader() {
//       return (templateFolderName) =>
//         loadTemplate(`${templateFolderName}/actions/grid/new-item.vue`)
//     },
//   },
// }

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
