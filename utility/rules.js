export function rules(i18n) {
  const regex = RegExp(/^\d*[0-9]\d*$/)
  const decimalRegex = RegExp(/^\d*\.?\d*$/)
  return Object.freeze({
    required: (v) => {
      if (v && v.length && /^\s+/.test(v)) {
        return i18n.t('Messages.Error.SpaceNotAllowed')
      } else {
        return (
          !!(v && v.length) ||
          typeof v === 'number' ||
          i18n.t('Messages.Error.FieldRequired')
        )
      }
    },
    email: (v) => {
      if (!/.+@.+\..+/.test(v)) {
        return i18n.t('Messages.Error.EmailRequired')
      } else if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          v
        )
      ) {
        return i18n.t('Common.RemoveBlankSpace')
      } else {
        return true
      }
    },

    link: (v) =>
      /^(?![0-9]*$){1,}[a-zA-Z0-9]+$/i.test(v) ||
      i18n.t('Messages.Warn.UniqueLinkFormat'),
    onlineEventLink: (v) => {
      return !v
        ? i18n.t('Messages.Error.FieldRequired')
        : !v.startsWith('https://')
        ? i18n.t('Messages.Error.HttpsUrl')
        : true
    },
    phoneRules: (v) => {
      if (v && !isNaN(v) && v.length <= 15) {
        return true
      }
      return i18n.t('Messages.Error.PleaseEnterValidPhone')
    },
    negativeNumberRules: (v) => {
      if (!v || regex.test(v)) {
        return true
      }
      return decimalRegex.test(v)
        ? i18n.t('Common.NoDecimalNumberAllowed')
        : i18n.t('Messages.Error.NumberCannotBeNegative')
    },
    offerCountRules: (v) => {
      return v !== ''
        ? /^\d*[0-9]\d*$/.test(v)
          ? true
          : i18n.t('Messages.Error.NumberCannotBeNegative')
        : i18n.t('Messages.Error.FieldRequired')
    },
    id4PasswordValidation: (v) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/.test(v) ||
      i18n.t('Messages.Error.ID4PasswordValidationMsg'),
  })
}
