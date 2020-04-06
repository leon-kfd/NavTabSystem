module.exports = {
  configureWebpack: config => {
    config.externals = {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios'
    }
  }
}
