// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  configureWebpack: config => {
    if (isProduction) {
      config.externals = {
        vue: 'Vue',
        vuex: 'Vuex'
      }
    }
    config.plugins.push(
      // new BundleAnalyzerPlugin()
    )
  },
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://kongfandong.cn',
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
}
