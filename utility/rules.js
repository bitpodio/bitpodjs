export function rules(i18n) {
  const regex = RegExp(/^\d*[0-9]\d*$/)
  return Object.freeze({
    required: (v) =>
      !!(v && v.length) ||
      typeof v === 'number' ||
      i18n.t('Messages.Error.FieldRequired'),
    email: (v) =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v
      ) || i18n.t('Messages.Error.EmailRequired'),
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
      if (v && !isNaN(v) && v.length === 10) {
        return true
      }
      return i18n.t('Messages.Error.PleaseEnterValidPhone')
    },
    negativeNumberRules: (v) => {
      if (!v || regex.test(v)) {
        return true
      }
      return i18n.t('Messages.Error.NumberCannotBeNegative')
    },
    offerCountRules: (v) => {
      return [
        (v) => {
          return v !== ''
            ? /^\d*[0-9]\d*$/.test(v)
              ? true
              : this.$t('Messages.Error.NumberCannotBeNegative')
            : this.$t('Messages.Error.FieldRequired')
        },
      ]
    },
  })
}
