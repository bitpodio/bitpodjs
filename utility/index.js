import MissingComponent from './missing-component.vue'
import contentFactory from '~/config/apps/event/content'

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

export const formValidationMixin = {
  computed: {
    readonly() {
      return this.calculatePropValue('readonly')
    },
    disabled() {
      return this.calculatePropValue('disabled')
    },
    filter() {
      const propFields = {}
      for (const field of this.fields) {
        propFields[field.fieldName] = field.dataSource
          ? field.dataSource.filter.call(this, this.formData)
          : {}
      }
      return propFields
    },
  },
  methods: {
    rulesArray(field) {
      const { rules = [] } = field
      return rules.map((ruleFunction) => {
        return (value) => {
          return ruleFunction(value, this.formData)
        }
      })
    },
    calculatePropValue(propName) {
      const propFields = {}
      for (const field of this.fields) {
        if (
          field[propName] &&
          field[propName](this.formData[field.fieldName], this.formData)
        ) {
          propFields[field.fieldName] = true
        } else {
          propFields[field.fieldName] = false
        }
      }
      return propFields
    },
  },
}

export function formatResult(data, modelName) {
  if (!data[modelName]) return []
  let { edges } = data[modelName][`${modelName}Find`]
  edges = edges.map(({ node }) => node)
  return edges
}

export function getContentByName(ctx, contentName) {
  const contents = contentFactory(ctx)
  return contents[contentName]
}

function getViewDataSource(content, viewName) {
  const view = content.views[viewName]
  return view.dataSource
}

export function getViewQuery(content, viewName) {
  return getViewDataSource(content, viewName).query
}
