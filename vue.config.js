module.exports = {
  configureWebpack: config => {
    config.externals = {
      vue: 'Vue',
      vuex: 'Vuex'
      // 'vue-router': 'VueRouter',
      // axios: 'axios'
    }
  },
  productionSourceMap: false
}
