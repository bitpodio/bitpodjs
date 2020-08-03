const importFile = (filePath) => import(filePath)

export async function importTemplate(templateFolderName, fileName) {
  try {
    this.newItemTemplate = await importFile(
      `~/config/templates/grids/${templateFolderName}/new-item.vue`
    )
  } catch (e) {
    this.newItemTemplate = importFile(
      `~/config/common/templates/grid/column.vue`
    )
  }
}
