import { zonedTimeToUtc } from 'date-fns-tz'
import TextField from '~/components/common/form/text-field.vue'
import Lookup from '~/components/common/form/lookup.vue'
import Checkbox from '~/components/common/form/checkbox.vue'
import CustomDate from '~/components/common/form/date.vue'
import File from '~/components/common/form/file.vue'
import RichText from '~/components/common/form/richtext.vue'
import Timezone from '~/components/common/form/timezone'

const FORM_DATE_CONTROLS = ['date', 'datetime']

function getFormTimeZoneField(fields) {
  const timezoneField = fields.find((field) => field.type === 'timezone')
  return timezoneField || null
}

export function formatTimezoneDateFieldsData(formData, fields) {
  const timezoneField = getFormTimeZoneField(fields)
  if (!timezoneField) {
    return formData
  }
  const selectedTimezone = formData[timezoneField.fieldName]
  const newFormData = {}
  for (const field of fields) {
    const fieldData = formData[field.fieldName]
    newFormData[field.fieldName] = FORM_DATE_CONTROLS.includes(field.type)
      ? zonedTimeToUtc(fieldData, selectedTimezone)
      : fieldData
  }
  return newFormData
}
export function getGridFields(content, viewName) {
  const view = content.views[viewName]
  const fields = view.fields
  const editableFields = []
  for (const fieldName in fields) {
    const field = fields[fieldName]
    const newFormField = field.newForm === undefined ? true : field.newForm
    if (newFormField) {
      editableFields.push({
        ...field,
        fieldName,
      })
    }
  }
  editableFields.sort(
    (field1, field2) => field1.displayOrder - field2.displayOrder
  )
  return editableFields
}

export function getMutationObject(content, viewName, ctx) {
  const view = content.views[viewName]
  const mutation =
    view.dataSource.mutation && view.dataSource.mutation.call(ctx, ctx)
  return mutation || { new: {}, edit: {} }
}

export const formControlsMixin = {
  components: {
    TextField,
    Lookup,
    Checkbox,
    CustomDate,
    File,
    RichText,
    Timezone,
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
      }
    },
  },
}
