module.exports = {
  publicPath:'',
  assetsDir: 'source',
  devServer: {
    // 设置主机地址
    host: 'localhost',
    // 设置端口
    port: 8080,
    // 设置代理
    proxy: {
      '/admin': {
        // 设置目标API地址
        target: 'http://127.0.0.1:7000',
        // 如果要代理 websockets
        ws: false,
        // 将主机标头的原点改为目标URL
        changeOrigin: false
      }
    }
  },
  // pages: {
  //   index: {
  //     // page 的入口
  //     entry: './main.js',
  //     // 模板来源
  //     template: 'public/template.html',
  //     // 在 dist/index.html 的输出
  //     filename: 'index.html',
  //     // 当使用 title 选项时，
  //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: '管理后台',
  //     // 在这个页面中包含的块，默认情况下会包含
  //     // 提取出来的通用 chunk 和 vendor chunk。
  //     // chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   }
  // }
}
