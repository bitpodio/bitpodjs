import Vue from 'vue'
import VueTagManager from 'vue-tag-manager'

export default function ({ $config }) {
  Vue.use(VueTagManager, {
    gtmId: $config.gaGtmCode,
  })
}
