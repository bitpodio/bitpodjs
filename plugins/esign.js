import Vue from 'vue'
// import esign from '~/components/common/form/datetime-picker.vue'
import esign from 'esign'

console.log(esign)

Vue.use(esign)
Vue.component('esign', esign)
