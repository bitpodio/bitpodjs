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
  router: {
    bitpodHostUrl: process.env.bitpodHostUrl || 'https://event.test.bitpod.io',
  },
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
  plugins: ['~/plugins/eventBus.js'],
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
          boxview: '#1e1e1e',
          greybg: '#000000',
        },
        light: {
          primary: colors.blue.darken2,
          secondary: colors.grey.darken1,
          accent: colors.shades.black,
          error: colors.red.accent3,
          greybg: '#f5f5f5',
          boxview: '#ffffff',
        },
      },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
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
        // browserHttpEndpoint: '/svc/graphql',
      },
    },
    defaultOptions: {
      // See 'apollo' definition
      // For example: default query options
      $query: {
        fetchPolicy: 'network-only',
      },
    },
  },
  serverMiddleware: [
    '~/api/index.js',
    { path: '/callback', handler: '~/api/callback.js' },
    { path: '/authorize', handler: '~/api/authorize.js' },
  ],
  auth: {
    redirect: {
      login: '/login',
      callback: '/callback',
      home: '/event',
      logout: '/',
    },
    strategies: {
      bitpod: {
        scheme: 'oauth2',
        bitpodTokenEndPointUrl:
          process.env.BITPOD_TOKEN_ENDPOINT_URL ||
          'https://login.bitpod.io/auth/connect/token',
        bitpodUserInfoEndPointUrl:
          process.env.BITPOD__USERINFO_ENDPOINT_URL ||
          'https://login.bitpod.io/auth/connect/userinfo',
        authorization:
          process.env.AUTHORIZATION_ENDPOINT_URL ||
          'https://login.bitpod.io/auth/connect/authorize',
        endpoints: {
          authorization: '/authorize',
          token: 'api/connect/token',
          userInfo: 'api/connect/userinfo',
        },
        responseType: 'code',
        grantType: 'authorization_code',
        redirectUri:
          process.env.REDIRECT_URI || 'http://localhost:3000/callback',
        scope: ['notification', 'offline_access', 'openid', 'profile', 'email'],
        clientId:
          process.env.BITPOD_EVENT_CLIENTID || `5F1ED0F95B78182ED39E7DF0`,
        clientSecret:
          process.env.BITPOD_EVENT_CLIENTSECRET ||
          `34389e794e294bc2afb1223b4298b9c9`,
        tokenType: 'Bearer',
        tokenKey: 'access_token',
        refreshTokenKey: 'refresh_token',
      },
    },
  },
  devtools: true,
}
