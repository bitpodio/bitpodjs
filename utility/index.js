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
      debugger
      const view = this.content.views[this.viewName]
      const templateInfo = view.template
      return templateInfo.name || ''
    },
  },
  methods: {
    async loadTemplate(templatePaths, returnErrorIfNotFound = true) {
      debugger
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
    debugger
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
  debugger
  const view = content.views[viewName]
  return view.template || {}
}

export function getGridTemplateName(content, viewName) {
  debugger
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
          ? field.dataSource.filter
            ? field.dataSource.filter.call(this, this.formData)
            : {}
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

export function getContentByName(ctx, contentName) {
  const contents = ctx.contentFactory(ctx)
  return contents[contentName]
}

function getViewDataSource(content, viewName) {
  debugger
  const view = content.views[viewName]
  return view.dataSource
}

export function getViewQuery(content, viewName) {
  debugger
  return getViewDataSource(content, viewName).query
}

export const configLoaderMixin = {
  layout(context) {
    return context.route.params.app || 'default'
  },
  data() {
    return {
      contents: null,
    }
  },
  async mounted() {
    debugger
    const contentFactory = await import(
      `~/config/apps/${this.$route.params.app}/content`
    )
    this.contents = contentFactory.default
  },
}

export function getIdFromAtob(encodedId) {
  return encodedId ? atob(encodedId).split(':')[1] : ''
}
