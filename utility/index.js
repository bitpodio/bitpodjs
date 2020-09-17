import MissingComponent from './missing-component.vue'
import nuxtconfig from '~/nuxt.config'

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

export function getApiUrl() {
  let apiURL = ''
  if (window.location.origin.includes('localhost')) {
    apiURL = `https://${nuxtconfig.axios.backendBaseUrl}${nuxtconfig.axios.apiEndpoint}`
  } else {
    apiURL = `${window.location.origin}${nuxtconfig.axios.apiEndpoint}`
  }
  console.log('===nuxtconfig.axios.apiEndpoint=', nuxtconfig.axios.apiEndpoint)
  console.log('===apiURL=', apiURL)
  return apiURL
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
    visible() {
      return this.calculatePropValue('visible', true)
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
          return ruleFunction.call(this, value, this.formData)
        }
      })
    },
    calculatePropValue(propName, defaultValue = false) {
      const propFields = {}
      for (const field of this.fields) {
        if (field[propName] === undefined) {
          propFields[field.fieldName] = defaultValue
        } else if (
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
  const view = content.views[viewName]
  return view.dataSource
}

export function getViewQuery(content, viewName) {
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
    const contentFactory = await import(
      `~/config/apps/${this.$route.params.app}/content`
    )
    this.contents = contentFactory.default
  },
}

export function getIdFromAtob(encodedId) {
  return encodedId ? atob(encodedId).split(':')[1] : ''
}
