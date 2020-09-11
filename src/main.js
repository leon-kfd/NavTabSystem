import Vue from 'vue'
import App from './App.vue'
import store from './store'
import '@/assets/css/base.css'
import { success, warning, error } from '@/utils/message'
Vue.config.productionTip = false
Vue.prototype.$baseURL = process.env.NODE_ENV === 'production' ? '//kongfandong.cn' : '/api'
Vue.prototype.$success = success
Vue.prototype.$warning = warning
Vue.prototype.$error = error

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
