import Vue from 'vue'
import App from './App.vue'
import store from './store'
import '@/assets/css/base.css'
Vue.config.productionTip = false
Vue.prototype.$baseURL = process.env.NODE_ENV === 'production' ? '//kongfandong.cn' : '/api'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
