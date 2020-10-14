export default function ({ app, $vuetify }) {
  const { i18n } = app
  // The below code correctly changes vuetify.rtl
  // but vuetify resets its value before render.
  // TODO: Need to find an alternative to set rtl before SSR
  // const { locale } = i18n
  // const rtl = getRTL(locale, app)
  // $vuetify.rtl = rtl
  // console.log({ '$vuetify.rtl': $vuetify.rtl })
  // on change locale
  i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    // console.log({ oldLocale, newLocale })
    i18n.setLocaleCookie(newLocale)
    $vuetify.rtl = getRTL(newLocale, app)
  }

  function getRTL(locale, app) {
    const { rtl = false } = app.i18n.locales.find((i) => i.code === locale)
    return rtl
  }
}
