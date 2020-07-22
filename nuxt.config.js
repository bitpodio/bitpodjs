import colors from 'vuetify/es5/util/colors'

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '~/assets/logo.png' },
      {
        rel: 'stylesheet',
        href:
          'https://res.cloudinary.com/mytestlogo/raw/upload/v1573628681/Icons/style.css',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/styles/main.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: colors.purple,
          secondary: colors.grey.darken1,
          accent: colors.shades.black,
          error: colors.red.accent3,
          greybg: '#f5f5f5',
        },
      },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   eyJhbGciOiJSUzI1NiIsImtpZCI6IjhEMkE0MTczM0QwN0JBNkU2RTYwNTZFRUJDRThDRkQyMDc0NThCMDUiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJqU3BCY3owSHVtNXVZRmJ1dk9qUDBnZEZpd1UifQ.eyJuYmYiOjE1OTQ3MTI3MjksImV4cCI6MTU5NDc5OTEyOSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5iaXRwb2QuaW8vYXV0aCIsImF1ZCI6WyJodHRwczovL2xvZ2luLmJpdHBvZC5pby9hdXRoL3Jlc291cmNlcyIsIlNoYXJlZCIsIk5vdGlmaWNhdGlvbiJdLCJjbGllbnRfaWQiOiI2ZDJiOTg4YzQ2NWY0NzZhMDhhZWZjNDg5ZWYyYjIxMThmZTU4MDc2Iiwic3ViIjoiamFnYW5uYXRoQGJpdHBvZC5pbyIsImF1dGhfdGltZSI6MTU5NDcxMjcyNiwiaWRwIjoibG9jYWwiLCJzY29wZSI6WyJOb3RpZmljYXRpb24iLCJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiLCJiYWFzIiwib2ZmbGluZV9hY2Nlc3MiLCJub3RpZmljYXRpb24iLCJub3RpZmljYXRpb24iLCJiYWFzIiwib2ZmbGluZV9hY2Nlc3MiLCJub3RpZmljYXRpb24iLCJiYWFzIiwib2ZmbGluZV9hY2Nlc3MiLCJub3RpZmljYXRpb24iLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.Pflb0QawGDCMCWslWthbHosaSnN1Yor7yI5zWRmlkSJKuYlajdC_yS1gsxAAyQvEcch4gcjd7zL8LooA5l5Z7jZmeymMVv538NR6Z4ZT09XqHBb8DvNgiGvSvVM0jlpluOKfHP5W0-5rThygnBEtPXknRTMn-2P4gmSdOOmMPzUtAKIt2ir-iGXtu5P35FYqyt4qvF7I7BKFQdtw8H-9IdpRveW0sP-M4P8rPdgI8OPFPYYbaXfbDVEavExdBBb09ybKyeCvgdRo7OnBMsBszE0zf2OSapKIvDjloYxc5dWxKsmLfb6g6NnnavOxw0LbdnymI3GCCTstmTcP4oK7xQ
   */
  build: {},
  vue: {
    config: {
      productionTip: true,
      devtools: true,
    },
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://event.test.bitpod.io/svc/graphql',
        httpLinkOptions: {
          credentials: 'same-origin',
          headers: {
            Authorization:
              'Bearer ' +
              'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhEMkE0MTczM0QwN0JBNkU2RTYwNTZFRUJDRThDRkQyMDc0NThCMDUiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJqU3BCY3owSHVtNXVZRmJ1dk9qUDBnZEZpd1UifQ.eyJuYmYiOjE1OTUzOTU2NDYsImV4cCI6MTU5NTQ4MjA0NiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5iaXRwb2QuaW8vYXV0aCIsImF1ZCI6WyJodHRwczovL2xvZ2luLmJpdHBvZC5pby9hdXRoL3Jlc291cmNlcyIsIlNoYXJlZCIsIk5vdGlmaWNhdGlvbiJdLCJjbGllbnRfaWQiOiI2ZDJiOTg4YzQ2NWY0NzZhMDhhZWZjNDg5ZWYyYjIxMThmZTU4MDc2Iiwic3ViIjoicmlzaGlrZXNoQGJpdHBvZC5pbyIsImF1dGhfdGltZSI6MTU5NTMwOTgzOCwiaWRwIjoibG9jYWwiLCJzY29wZSI6WyJOb3RpZmljYXRpb24iLCJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiLCJiYWFzIiwib2ZmbGluZV9hY2Nlc3MiLCJub3RpZmljYXRpb24iXSwiYW1yIjpbInB3ZCJdfQ.rnNMNH5hRQwRki_btdKe9XbA0STnuizfR9pQuW-g-qogVJaG8-PvzppPwF_ziKwZJ0FG4WCWMMwqsyvdqllh0qrEqefWv_a1dasy98XcTcIMiAGbLmwJbEDPCujFdaXIQnwGQsyGTgx6XgffpqYz4FVcaVhkYylYnGfiQNOUcg5eDkRx0YI3YOqoDoQm8PQ_QoRWDjnYZhbPP7vv7LabmeY43nCLC-qSAnamMSx2Mkw1fU8KTr1Fn_BLJzMJbmVHNIw_u0e4o7OPI0qgaMNWdlglmJgKqh8yFVh1GripBGcXZnL-diI_7KY0IxUvcf7XB_IfwP2L-6qyi9YmBxD50A',
          },
        },
      },
      // default:{
      //   httpEndpoint:"https://event.test.bitpod.io/svc/graphql",
      //   // wsEndpoint: process.env.WS_ENDPOINT
      // }
    },
  },
  devtools: true,
}
