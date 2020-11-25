export function rules(i18n) {
  return Object.freeze({
    required: (v) =>
      !!(v && v.length) || i18n.t('Messages.Error.FieldRequired'),
    email: (v) =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v
      ) || i18n.t('Messages.Error.EmailRequired'),
    link: (v) =>
      /^[a-z0-9]+$/i.test(v) || i18n.t('Messages.Warn.UniqueLinkFormat'),
    onlineEventLink: (v) => {
      return !v
        ? i18n.t('Messages.Error.FieldRequired')
        : !v.startsWith('https://')
        ? i18n.t('Messages.Error.HttpsUrl')
        : true
    },
  })
}
