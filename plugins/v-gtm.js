import Vue from 'vue'
import VueTagManager from 'vue-tag-manager'

// Do this before creating the Vue app
export default function ({ $config }) {
  Vue.use(VueTagManager, {
    // gtmId: 'GTM-54VGK22',
    gtmId: $config.gaTrackingCode,
  })
}
