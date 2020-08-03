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
const importTemplate = (filePath) => import(filePath)

function getGridTemplateInfo(content, viewName) {
  const view = content.views[viewName]
  return view.template || {}
}

export default {
  props: ['content', 'viewName'],
  data() {
    return {
      newItemTemplate: null,
    }
  },
  computed: {
    slotTemplateLoader() {
      return (templateFolderName) => () =>
        import(
          `~/config/templates/grids/${templateFolderName}/actions/grid/new-item.vue`
        )
    },
  },
  mounted() {
    debugger
    const templateInfo = getGridTemplateInfo(this.content, this.viewName)
    const templateFolderName = templateInfo.name
    this.loadNamedSlotTemplate(templateFolderName)
    // try {
    //   this.newItemTemplate = await importTemplate(
    //     `~/config/templates/grids/${templateFolderName}/new-item.vue`
    //   )
    // } catch (e) {
    //   this.newItemTemplate = importTemplate(
    //     `~/config/common/templates/grid/column.vue`
    //   )
    // }
  },
  methods: {
    async loadNamedSlotTemplate(templateFolderName) {
      try {
        await this.slotTemplateLoader(templateFolderName)()
        this.newItemTemplate = () =>
          this.slotTemplateLoader(templateFolderName)()
      } catch (e) {
        this.newItemTemplate = importTemplate(
          `~/config/common/templates/grid/column.vue`
        )
      }
    },
  },
}
</script>
