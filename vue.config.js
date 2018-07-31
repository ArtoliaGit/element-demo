const path = require('path')
const fs = require('fs')

const resolve = dir => path.join(__dirname, dir)

const env = process.env.NODE_ENV
fs.writeFileSync(path.join(__dirname, './config/env.js'), `export default '${env}'`)

const BASE_URL = '/'

module.exports = {
  baseUrl: BASE_URL,
  outputDir: 'dist',
  assetsDir: 'src/assets',
  runtimeCompiler: true,
  productionSourceMap: true,
  parallel: true,
  // css: {
  //   modules: true,
  //   sourceMap: true
  // },

  lintOnSave: true,

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'))
  },
  configureWebpack: () => {},

  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8082,
    https: false,
    hotOnly: false,
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9090',
        changeOrigin: true,
        // ws: true,
        pathRewrite: {
          '^/api': ''
        },
        logLevel: 'debug'
      }
    }, // string | Object
    before: () => {}
  },
  pluginOptions: {
    // ...
  }

}
