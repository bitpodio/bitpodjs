import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz'
import TextField from '~/components/common/form/text-field.vue'
import Lookup from '~/components/common/form/lookup.vue'
import Checkbox from '~/components/common/form/checkbox.vue'
import CustomDate from '~/components/common/form/date.vue'
import File from '~/components/common/form/file.vue'
import Timezone from '~/components/common/form/timezone'
import Tags from '~/components/common/form/tags.vue'
import Search from '~/components/common/form/search.vue'
import { _set, _get, isPlainObject } from '~/utility/object'

const FORM_DATE_CONTROLS = ['date', 'datetime']
const DEFAULT_ACTION_CAPTION = {
  new: 'Common.New',
  edit: 'Drawer.Edit',
  delete: 'Drawer.Delete',
}

function getFormTimeZoneField(fields) {
  const timezoneField = fields.find((field) => field.type === 'timezone')
  return timezoneField || null
}

function getFieldByFieldName(fields, field) {
  const fieldDetails =
    fields && fields.filter(({ fieldName }) => fieldName === field)
  return fieldDetails || {}
}

export function formatTimezoneDateFieldsData(formData, fields) {
  const timezoneField = getFormTimeZoneField(fields)
  if (!timezoneField) {
    return formData
  }
  const selectedTimezone = formData[timezoneField.fieldName]
  const newFormData = {}
  for (const fieldName in formData) {
    const fieldData = formData[fieldName]
    const field = getFieldByFieldName(fields, fieldName)
    newFormData[fieldName] = FORM_DATE_CONTROLS.includes(field.type)
      ? zonedTimeToUtc(fieldData, selectedTimezone)
      : fieldData
  }
  return { ...formData, ...newFormData }
}
export function getGridFields(content, viewName, isEditForm) {
  const view = content.views[viewName]
  const fields = view.fields
  const editableFields = []
  for (const fieldName in fields) {
    const field = fields[fieldName]
    const showAttribute = isEditForm ? 'editForm' : 'newForm'
    const isFormField =
      field[showAttribute] === undefined ? true : field[showAttribute]
    if (isFormField) {
      editableFields.push({
        ...field,
        fieldName,
      })
    }
  }
  editableFields.sort((field1, field2) => {
    const field1DisplayOrder =
      (field1.form && field1.form.displayOrder) || field1.displayOrder
    const field2DisplayOrder =
      (field2.form && field2.form.displayOrder) || field2.displayOrder
    return field1DisplayOrder - field2DisplayOrder
  })
  return editableFields
}

export function getMutationObject(content, viewName, ctx) {
  const view = content.views[viewName]
  const mutation =
    view.dataSource.mutation && view.dataSource.mutation.call(ctx, ctx)
  return mutation || { new: {}, edit: {} }
}

export function buildEmbededFieldData(formData) {
  const newFormData = {}
  for (const field in formData) {
    _set(newFormData, field, formData[field])
  }
  return newFormData
}

function flattenObject(obj, prefix) {
  let newObj = {}
  for (const field in obj) {
    const value = obj[field]
    if (isPlainObject(value)) {
      const embedObj = flattenObject(value, `${field}.`)
      newObj = { ...newObj, ...embedObj }
    } else {
      newObj[`${prefix}${field}`] = value
    }
  }
  return newObj
}

export function generateFormData(result) {
  const formData = flattenObject(result, '')
  delete formData.__typename
  return formData
}

export const formControlsMixin = {
  components: {
    TextField,
    Lookup,
    Checkbox,
    CustomDate,
    File,
    RichText: () =>
      process.client ? import('~/components/common/form/richtext.vue') : false,
    Timezone,
    Tags,
    Search,
  },
  methods: {
    formControl(field) {
      switch (field.type) {
        case 'lookup':
          return 'Lookup'
        case 'checkbox':
          return 'Checkbox'
        case 'date':
        case 'datetime':
          return 'CustomDate'
        case 'file':
          return 'File'
        case 'string':
        case 'number':
          return 'TextField'
        case 'richtext':
          return 'RichText'
        case 'timezone':
          return 'Timezone'
        case 'tags':
          return 'Tags'
        case 'search':
          return 'Search'
      }
    },
  },
}

export const formTitleMixin = {
  computed: {
    subTitle() {
      const view = this.content.views[this.viewName]
      return this.$t(view.itemTitle) || ''
    },
  },
}

export function formatedDate(date, timezone) {
  let output
  if (date) {
    const formattedDate = new Date(date)
    const zonedDate = utcToZonedTime(formattedDate, timezone)
    const pattern = 'PPp' // 'd.M.YYYY HH:mm:ss.SSS [GMT]Z (z)'
    output = format(zonedDate, pattern, { timezone })
  }
  return output
}

export const gridActionMixin = {
  methods: {
    isHiddenAction(actionType) {
      const view = this.content.views[this.viewName]
      const template = view.template
      const isHidden = _get(template, ['actions', actionType, 'hidden'])
      return !isHidden
    },
    actionCaption(actionType) {
      const view = this.content.views[this.viewName]
      const template = view.template
      const actionCaption = _get(template, ['actions', actionType, 'caption'])
      return actionCaption || DEFAULT_ACTION_CAPTION[actionType]
    },
  },
}
