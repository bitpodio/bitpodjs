import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VueAnalytics, {
  // id: 'AW-824538838',
  id: 'UA-191875244-1',
  router,
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
