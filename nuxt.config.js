import colors from 'vuetify/es5/util/colors'
const basePath = process.env.PUBLIC_PATH || ''

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  router: {
    base: basePath || '/',
  },
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
    script: [
      {
        src: `${
          process.env.GOOGLE_MAPS_API ||
          'https://maps.googleapis.com/maps/api/js'
        }?key = ${
          process.env.GOOGLE_API_KEY ||
          'AIzaSyBKle17JR_zpGEzwARF0H8VFU9NeH9nh7c'
        }& libraries=places`,
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/geopattern/1.2.3/js/geopattern.min.js',
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
  plugins: [
    '~/plugins/eventBus.js',
    '~/plugins/bitpod',
    { src: '~/plugins/v-datetime-picker.js', mode: 'client' },
  ],
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
    '@nuxtjs/dotenv',
  ],
  eslint: {
    cache: true,
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    '@nuxtjs/auth-next',
    [
      'nuxt-gmaps',
      {
        key:
          process.env.GOOGLE_API_KEY ||
          'AIzaSyBKle17JR_zpGEzwARF0H8VFU9NeH9nh7c',
        // you can use libraries: ['places']
      },
    ],
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */

  axios: {
    apiEndpoint: '/svc/api/',
    backendBaseUrl: process.env.PUBLIC_DOMAIN || 'event.test.bitpod.io',
    baseURL: `https://${process.env.PUBLIC_DOMAIN}${basePath}`,
    eventUrl: process.env.GET_EVENT_URL || 'event.test.bitpod.io',
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
      backendBaseUrl: process.env.PUBLIC_DOMAIN,
    },
    cdnUri:
      'https://res.cloudinary.com/mytestlogo/image/upload/bitpodjs/images/',
    cdnCsvUri: 'https://res.cloudinary.com/mytestlogo/raw/upload/',
  },

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
          primary: '#1a73e8',
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
          primary: '#1a73e8',
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
  build: {
    transpile: /@fullcalendar.*/, // transpile ESM modules within all fullcalendar packages
    parallel: true,
    cache: true,
    hardSource: true,
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[chunkhash].js'),
    },
  },
  vue: {
    config: {
      productionTip: true,
      devtools: true,
    },
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: `https://${
          process.env.PUBLIC_DOMAIN || 'event.test.bitpod.io'
        }/svc/graphql`,
        browserHttpEndpoint: '/svc/graphql',
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
      home: `${basePath}/apps/event/list/Event/live and draft event`,
      logout: '/',
    },
    strategies: {
      bitpod: {
        scheme: 'oauth2',
        tokenEndPointUrl:
          process.env.BITPOD_TOKEN_ENDPOINT_URL ||
          'https://login.bitpod.io/auth/connect/token',
        userInfoEndPointUrl:
          process.env.BITPOD__USERINFO_ENDPOINT_URL ||
          'https://login.bitpod.io/auth/connect/userinfo',
        authorization:
          process.env.BITPOD_AUTHORIZATION_ENDPOINT_URL ||
          'https://login.bitpod.io/auth/connect/authorize',
        endpoints: {
          authorization: `${basePath}/authorize?provider=bitpod`,
          token: 'api/connect/token?provider=bitpod',
          userInfo: 'api/connect/userinfo?provider=bitpod',
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
      google: {
        scheme: 'oauth2',
        tokenEndPointUrl:
          process.env.GOOGLE_TOKEN_ENDPOINT_URL ||
          'https://oauth2.googleapis.com/token',
        userInfoEndPointUrl:
          process.env.GOOGLE__USERINFO_ENDPOINT_URL ||
          'https://oauth2.googleapis.com/tokeninfo',
        authorization:
          process.env.GOOGLE_AUTHORIZATION_ENDPOINT_URL ||
          'https://accounts.google.com/o/oauth2/auth',
        endpoints: {
          authorization: `${basePath}/authorize?provider=google`,
          token: 'api/connect/token?provider=google',
          userInfo: 'api/connect/userinfo?provider=google',
        },
        accessType: 'offline',
        prompt: 'consent',
        responseType: 'code',
        grantType: 'authorization_code',
        redirectUri:
          process.env.REDIRECT_URI || 'http://localhost:3000/callback',
        scope: ['openid', 'profile', 'email'],
        clientId:
          process.env.GOOGLE_EVENT_CLIENTID ||
          `49928390950-pmu4l73fu6mpcim2gdnerqf62k6oppqt.apps.googleusercontent.com`,
        clientSecret:
          process.env.GOOGLE_EVENT_CLIENTSECRET || `2lhT6LeqTR1sx5pxyPLZoA0_`,
        tokenType: 'Bearer',
        tokenKey: 'access_token',
        refreshTokenKey: 'refresh_token',
        codeChallengeMethod: '',
      },
    },
    devtools: true,
  },
  generalConfig: {
    googleMapKey:
      process.env.GOOGLE_API_KEY || 'AIzaSyBKle17JR_zpGEzwARF0H8VFU9NeH9nh7c',
    googleMapGeocodeApi:
      process.env.GOOGLE_MAPS_GEOCODE_API ||
      'https://maps.googleapis.com/maps/api/geocode/json',
  },
  setting: {
    domains: {
      defaultPublicDomain:
        process.env.DEFAULT_PUBLIC_DOMAIN || 'event.test.bitpod.io',
    },
  },
  mappingIds: {
    contact: '5f7ac71841a664000a774fc0',
    attendee: '5f7b46475ca471000bfecf9d',
  },
  integrationLinks: {
    BITOPD_VIRTUAL_LINK: 'meet.bitpod.io',
    EVENT_LINK_HINT: `https://${
      process.env.PUBLIC_DOMAIN || 'event.test.bitpod.io'
    }/e/`,
    ZOOM_DOCUMENT_LINK: `https://${
      process.env.PUBLIC_DOMAIN || 'event.test.bitpod.io'
    }/admin/apps/HelpCenter/Integrations/Zoom/views/Zoom`,
    GOOGLE_MEET_DOCUMENT_LINK: `https://${
      process.env.PUBLIC_DOMAIN || 'event.test.bitpod.io'
    }/admin/apps/HelpCenter/Integrations/Gmail/views/Gmail`,
  },
}
