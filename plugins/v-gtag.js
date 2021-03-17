import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

// Vue.use(VueAnalytics, {
//   // id: 'UA-191875244-1',
//   id: 'UA-192083281-1',
// })

export default function ({ $config }) {
  Vue.use(VueAnalytics, {
    // id: 'UA-192083281-1',
    id: $config.gaGtmCode,
  })
}
