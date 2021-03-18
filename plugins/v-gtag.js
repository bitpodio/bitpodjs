import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

export default function ({ $config }) {
  Vue.use(VueAnalytics, {
    id: $config.gaTrackingCode,
  })
}
