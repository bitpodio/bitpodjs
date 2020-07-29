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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  serverMiddleware: ['~/api/index.js'],
  /*
   ** Global CSS
   */
  css: [],
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
    '@nuxtjs/auth-next',
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
        },
      },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   eyJhbGciOiJSUzI1NiIsImtpZCI6IjhEMkE0MTczM0QwN0JBNkU2RTYwNTZFRUJDRThDRkQyMDc0NThCMDUiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJqU3BCY3owSHVtNXVZRmJ1dk9qUDBnZEZpd1UifQ.eyJuYmYiOjE1OTQ3MTI3MjksImV4cCI6MTU5NDc5OTEyOSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5iaXRwb2QuaW8vYXV0aCIsImF1ZCI6WyJodHRwczovL2xvZ2luLmJpdHBvZC5pby9hdXRoL3Jlc291cmNlcyIsIlNoYXJlZCIsIk5vdGlmaWNhdGlvbiJdLCJjbGllbnRfaWQiOiI2ZDJiOTg4YzQ2NWY0NzZhMDhhZWZjNDg5ZWYyYjIxMThmZTU4MDc2Iiwic3ViIjoiamFnYW5uYXRoQGJpdHBvZC5pbyIsImF1dGhfdGltZSI6MTU5NDcxMjcyNiwiaWRwIjoibG9jYWwiLCJzY29wZSI6WyJOb3RpZmljYXRpb24iLCJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiLCJiYWFzIiwib2ZmbGluZV9hY2Nlc3MiLCJub3RpZmljYXRpb24iLCJub3RpZmljYXRpb24iLCJiYWFzIiwib2ZmbGluZV9hY2Nlc3MiLCJub3RpZmljYXRpb24iLCJiYWFzIiwib2ZmbGluZV9hY2Nlc3MiLCJub3RpZmljYXRpb24iLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.Pflb0QawGDCMCWslWthbHosaSnN1Yor7yI5zWRmlkSJKuYlajdC_yS1gsxAAyQvEcch4gcjd7zL8LooA5l5Z7jZmeymMVv538NR6Z4ZT09XqHBb8DvNgiGvSvVM0jlpluOKfHP5W0-5rThygnBEtPXknRTMn-2P4gmSdOOmMPzUtAKIt2ir-iGXtu5P35FYqyt4qvF7I7BKFQdtw8H-9IdpRveW0sP-M4P8rPdgI8OPFPYYbaXfbDVEavExdBBb09ybKyeCvgdRo7OnBMsBszE0zf2OSapKIvDjloYxc5dWxKsmLfb6g6NnnavOxw0LbdnymI3GCCTstmTcP4oK7xQ
   */
  // extend(config, { isClient }) {
  //   config.module.rules.push({
  //     test: /\.vue$/,
  //     use: [
  //       {
  //         loader: 'vue-loader',
  //         options: {
  //           transpileOptions: {
  //             transforms: {
  //               dangerousTaggedTemplateString: true,
  //             },
  //           },
  //         },
  //       },
  //     ],
  //   })
  // },
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
              'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhEMkE0MTczM0QwN0JBNkU2RTYwNTZFRUJDRThDRkQyMDc0NThCMDUiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJqU3BCY3owSHVtNXVZRmJ1dk9qUDBnZEZpd1UifQ.eyJuYmYiOjE1OTU4NjczMDYsImV4cCI6MTU5NTk1MzcwNiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5iaXRwb2QuaW8vYXV0aCIsImF1ZCI6WyJodHRwczovL2xvZ2luLmJpdHBvZC5pby9hdXRoL3Jlc291cmNlcyIsIlNoYXJlZCIsIk5vdGlmaWNhdGlvbiJdLCJjbGllbnRfaWQiOiI2ZDJiOTg4YzQ2NWY0NzZhMDhhZWZjNDg5ZWYyYjIxMThmZTU4MDc2Iiwic3ViIjoiamFnYW5uYXRoQGJpdHBvZC5pbyIsImF1dGhfdGltZSI6MTU5NTc4MTUwMSwiaWRwIjoibG9jYWwiLCJzY29wZSI6WyJOb3RpZmljYXRpb24iLCJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiLCJiYWFzIiwib2ZmbGluZV9hY2Nlc3MiLCJub3RpZmljYXRpb24iXSwiYW1yIjpbInB3ZCJdfQ.K1JtPtcGaUKabEbelo4nGHS8cOOn1MfNTRUeMvm1DOlRrT9oKyAWSqLcDKQvueV0kIz9YsHv7zq4yx3HEdfsWVh_RRtTnwi-_itzU5OgHCb2eqsCa3oJ-e1_l6dalaTyI-XP5Dg0TB3857DH4qpEk7jL3USntJREWkXBvUFx1f_tkgnAqAAtjrAlJM9sLpaI5SQRnSTgAgF6q4oOd5gWwyahPRXiXuPWQOlqj2A2r51GRkD4swpkiCOkYnbN-8PdeMXm9W0apHD2UIF3_NGmi1Qh8Yq7PmbG7TGsWx0dWhyCtbShz1jO3W_IdZ4ESomti5fcUmjZ--jWe_jnGfDDcg',
          },
        },
      },
      // default:{
      //   httpEndpoint:"https://event.test.bitpod.io/svc/graphql",
      //   // wsEndpoint: process.env.WS_ENDPOINT
      // }
    },
    defaultOptions: {
      // See 'apollo' definition
      // For example: default query options
      $query: {
        fetchPolicy: 'network-only',
      },
    },
  },

  auth: {
    redirect: {
      login: '/login',
      callback: '/callback',
      home: '/event',
    },
    strategies: {
      bitpod: {
        scheme: 'oauth2',
        BITPOD_TOKEN_ENDPOINT_URL:
          process.env.BITPOD_TOKEN_ENDPOINT_URL ||
          'https://id.bitpod.io/auth/connect/token',
        BITPOD_USERINFO_ENDPOINT_URL:
          process.env.BITPOD__USERINFO_ENDPOINT_URL ||
          'https://id.bitpod.io/auth/connect/userinfo',
        endpoints: {
          authorization:
            process.env.BITPOD_AUTH_URL ||
            'https://id.bitpod.io/auth/connect/authorize',
          token: 'api/connect/token',
          userInfo: 'api/connect/userinfo',
        },
        responseType: 'code',
        grantType: 'authorization_code',
        redirectUri:
          process.env.REDIRECT_URI || 'http://localhost:3000/callback',
        scope: ['notification', 'offline_access', 'openid', 'profile', 'email'],
        clientId:
          process.env.BITPOD_EVENT_CLIENTID || `5F1FE3FD7D5EA2C873CF840E `,
        clientSecret:
          process.env.BITPOD_EVENT_CLIENTSECRET ||
          `a6db3acdb2a840cda1ff656f5871ee66`,
        tokenType: 'Bearer',
        tokenKey: 'access_token',
        refreshTokenKey: 'refresh_token',
      },
    },
  },
  devtools: true,
}
