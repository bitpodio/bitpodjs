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
import MissingComponent from './missing-component.vue'
function importTemplate(templatePath) {
  return () => import(`~/config/${templatePath}`)
}

export const templateLoaderMixin = {
  computed: {
    templateLoader() {
      return (gridTemplatePath) => importTemplate(`${gridTemplatePath}`)
    },
  },
  methods: {
    async loadTemplate(templatePaths, returnErrorIfNotFound = true) {
      for (const templatePath of templatePaths) {
        try {
          await this.templateLoader(templatePath)()
          return () => this.templateLoader(templatePath)()
        } catch {}
      }
      return returnErrorIfNotFound && MissingComponent
    },
  },
}
