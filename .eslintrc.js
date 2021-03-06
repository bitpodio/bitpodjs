module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:promise/recommended',
    'plugin:@intlify/vue-i18n/recommended',
  ],
  plugins: ['prettier', 'promise'],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    '@intlify/vue-i18n/no-dynamic-keys': 'error',
    '@intlify/vue-i18n/no-unused-keys': [
      'error',
      {
        extensions: ['.js', '.vue'],
      },
    ],
    '@intlify/vue-i18n/no-raw-text': [
      'warn', // Upgrade this to "error" soon as the current translations are finished.
      {
        ignoreNodes: ['md-icon', 'v-icon'],
        ignorePattern: '^[-#:()&]+$',
        ignoreText: ['EUR', 'HKD', 'USD', 'INR'],
      },
    ],
  },
  settings: {
    'vue-i18n': {
      localeDir: './locales/*.{js,json,json5,yaml,yml}',
    },
  },
}
