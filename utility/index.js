import MissingComponent from './missing-component.vue'
export function importTemplate(templatePath) {
  return () => import(`~/config/${templatePath}`)
}

export const templateLoaderMixin = {
  computed: {
    templateLoader() {
      return (gridTemplatePath) => importTemplate(`${gridTemplatePath}`)
    },
    templateFolderName() {
      const view = this.content.views[this.viewName]
      const templateInfo = view.template
      return templateInfo.name || ''
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
  async mounted() {
    if (this._components)
      for (const templateName in this._components) {
        const { locations, returnErrorIfNotFound = true } = this._components[
          templateName
        ]
        this[templateName] = await this.loadTemplate(
          locations,
          returnErrorIfNotFound
        )
      }
  },
}

export function getGridTemplateInfo(content, viewName) {
  const view = content.views[viewName]
  return view.template || {}
}

export function getGridTemplateName(content, viewName) {
  return getGridTemplateInfo(content, viewName).name
}
