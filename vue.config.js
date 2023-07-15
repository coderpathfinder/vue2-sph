const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  //代码打包后都是经过加密的，无法定位报错信息，打包后dist中会生成map文件，定位出错源代码，
  //开发时可以使用，但是项目上线后需要去掉
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        // pathRewrite: {'^/api': ''}
      },
    },
  }
})
