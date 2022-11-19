const publicPath = process.env.NODE_ENV === 'production' ? '/browser-vue/' : '/'

module.exports = {
  publicPath: publicPath,
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8082, // CHANGE YOUR PORT HERE!
    // https: false,
    // hotOnly: false,
  },
  pwa: {
    name: 'Browser ipfs vue',
    //  themeColor: '#4DBA87',
    //  msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      share_target: {
        action: publicPath,
        method: "GET",
        enctype: "application/x-www-form-urlencoded",
        params: {
          title: "title",
          text: "text",
          url: "url"
        }
      },
    }
  },
}
