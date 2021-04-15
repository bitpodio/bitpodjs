import addDays from 'date-fns/addDays'
import startOfToday from 'date-fns/startOfToday'
import endOfToday from 'date-fns/endOfToday'
import startOfTomorrow from 'date-fns/startOfTomorrow'
import endOfTomorrow from 'date-fns/endOfTomorrow'
import startOfYesterday from 'date-fns/startOfYesterday'
import endOfYesterday from 'date-fns/endOfYesterday'
import startOfDay from 'date-fns/startOfDay'
import endOfDay from 'date-fns/endOfDay'
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

// added below common functions for REST/GRAPHQL type
export function getOrderQuery(content, viewName, sortBy, sortDesc) {
  if (!(sortBy && sortBy.length)) {
    const defaultSort = getViewDataSource(content, viewName).defaultSort
    return defaultSort || ''
  }
  return `${sortBy && sortBy[0]} ${sortDesc && sortDesc[0] ? 'DESC' : 'ASC'}`
}

function computeViewFilter(filter, ctx) {
  return filter && (filter instanceof Function ? filter.call(ctx, ctx) : filter)
}

export function buildQueryVariables({
  viewName,
  search,
  filters,
  filter,
  content,
  ctx,
}) {
  const { rules: filterRules, ruleCondition } = filters
  const and = []
  const condition = []
  for (const rule of filterRules) {
    const { field, value, operator } = rule
    const ruleFilter = getOperatorQuery(field, operator, value)
    condition.push(ruleFilter)
  }
  if (condition.length > 0) {
    and.push({ [ruleCondition]: condition })
  }
  if (search) {
    const serachQuery = buildSearchQueryVariables(content, viewName, search)
    and.push(serachQuery)
  }
  const viewDataSource = getViewDataSource(content, viewName)
  const contentFilter = filter || computeViewFilter(viewDataSource.filter, ctx)

  if (contentFilter) {
    and.push(contentFilter.where)
  }
  return and.length > 0 ? { and } : {}
}

function buildSearchQueryVariables(content, viewName, search) {
  const fields = getGridFields(content, viewName)

  let where = {}
  const or = []
  for (const field in fields) {
    const { type, searchEnable } = fields[field]
    if (type === 'string' && searchEnable) {
      or.push({ [field]: { like: search, options: 'i' } })
    }
  }
  where = {
    or,
  }
  return where
}
function getGridFields(content, viewName) {
  const view = content.views[viewName]
  return view.fields
}

function getOperatorQuery(field, operator, value) {
  let ruleFilter = {}
  switch (operator) {
    case 'is':
      ruleFilter = { [field]: value }
      break
    case 'isNot':
      ruleFilter = { [field]: { neq: value } }
      break
    case 'contains':
      ruleFilter = { [field]: { like: value, options: 'i' } }
      break
    case 'notContains':
      ruleFilter = { [field]: { nlike: value, options: 'i' } }
      break
    case 'startsWith':
      ruleFilter = { [field]: { regexp: `^${value}` } }
      break
    case 'endsWith':
      ruleFilter = { [field]: { regexp: `${value}$` } }
      break
    case 'gt':
    case 'lt':
    case 'gte':
    case 'lte':
      ruleFilter = { [field]: { [operator]: value } }
      break
    case 'today': {
      const and = [
        { [field]: { gte: startOfToday() } },
        { [field]: { lt: endOfToday() } },
      ]
      ruleFilter = { and }
      break
    }
    case 'tomorrow': {
      const and = [
        { [field]: { gte: startOfTomorrow() } },
        { [field]: { lt: endOfTomorrow() } },
      ]
      ruleFilter = { and }
      break
    }
    case 'yesterday': {
      const and = [
        { [field]: { gte: startOfYesterday() } },
        { [field]: { lt: endOfYesterday() } },
      ]
      ruleFilter = { and }
      break
    }
    case 'pastWeek': {
      ruleFilter = getDateBeforeQuerybyDays(field, 7)
      break
    }
    case 'pastMonth':
      ruleFilter = getDateBeforeQuerybyDays(field, 30)
      break
    case 'pastYear':
      ruleFilter = getDateBeforeQuerybyDays(field, 365)
      break
    case 'nextWeek':
      ruleFilter = getDateAfterQuerybyDays(field, 7)
      break
    case 'nextMonth':
      ruleFilter = getDateAfterQuerybyDays(field, 30)
      break
    case 'nextYear':
      ruleFilter = getDateAfterQuerybyDays(field, 365)
      break
    case 'exactDate': {
      const and = [
        { [field]: { gte: startOfDay(new Date(value)) } },
        { [field]: { lte: endOfDay(new Date(value)) } },
      ]
      ruleFilter = { and }
      break
    }
    case 'isEmpty':
      ruleFilter = { [field]: null }
      break
    case 'isNotEmpty':
      ruleFilter = { [field]: { neq: null } }
      break
  }
  return ruleFilter
}

function getDateBeforeQuerybyDays(field, days) {
  const and = [
    { [field]: { gte: startOfDay(addDays(new Date(), -days)) } },
    { [field]: { lte: endOfToday() } },
  ]
  return { and }
}

function getDateAfterQuerybyDays(field, days) {
  const and = [
    { [field]: { gte: startOfToday() } },
    { [field]: { lte: endOfDay(addDays(new Date(), days)) } },
  ]
  return { and }
}

export const configLoaderMixin = {
  layout(context) {
    console.debug('configLoaderMixin context:- ', context)
    console.debug('configLoaderMixin context route:- ', context.app.router)
    console.debug(
      'configLoaderMixin context.app.router.currentRoute.params.app :- ',
      context.app.router.currentRoute.params.app
    )
    return context.app.router.currentRoute.params.app || 'default'
  },
  data() {
    return {
      token: this.$auth.$storage.getCookies()['auth._token.bitpod'],
      contents: null,
    }
  },
  async created() {
    console.debug('access token received from the cookie', this.token)
    const strategy = this.$auth.$storage.getCookies()['auth.strategy']
    if (strategy === 'bitpod') {
      if (
        this.token.split(' ')[1] !==
        this.$auth.$storage.getCookies()['apollo-token']
      ) {
        let token = this.$auth.strategy.token.get()
        if (token) {
          token = token.split(' ')[1]
        }
        await this.$apolloHelpers.onLogin(token, undefined, { expires: 7 })
      }
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

// export function postGaData(obj) {
//   console.debug('postGaData', obj)
//   window.ga('send', obj)
// }
