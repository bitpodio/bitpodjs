// const importFile = (filePath) => import(filePath)

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

function importTemplate(templatePath) {
  return () => import(`~/config/templates/grids/${templatePath}`)
}

export const templateLoaderMixin = {
  computed: {
    templateLoader() {
      return (templateFolderName) =>
        importTemplate(`${templateFolderName}/actions/grid/new-item.vue`)
    },
  },
  methods: {
    async loadTemplate(templateFolderName) {
      try {
        await this.templateLoader(templateFolderName)()
        return () => this.templateLoader(templateFolderName)()
      } catch (e) {
        return importTemplate(`column.vue`)
      }
    },
  },
}
