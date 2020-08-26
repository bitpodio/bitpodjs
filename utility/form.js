import { zonedTimeToUtc } from 'date-fns-tz'

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
