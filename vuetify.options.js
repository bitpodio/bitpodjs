import colors from 'vuetify/es5/util/colors'
export default function ({ app }) {
  return {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        dark: {
          primary: '#1a73e8',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          boxview: '#1e1e1e',
          greybg: '#000000',
          cream: '#feffc8',
        },
        light: {
          primary: '#1a73e8',
          secondary: colors.grey.darken1,
          accent: colors.shades.black,
          error: colors.red.accent3,
          greybg: '#f5f5f5',
          boxview: '#ffffff',
          cream: '#feffc8',
        },
      },
    },
    lang: {
      // eslint-disable-next-line @intlify/vue-i18n/no-dynamic-keys
      t: (key, ...params) => app.i18n.t(key, params),
    },
  }
}
