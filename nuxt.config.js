module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    // title: '初链-高性能无穷节点混合共识公链-官网',
    meta: [
      {
        charset: 'utf-8'
      },
      // { name: 'keywords', content: 'truechain,true,初链,区块链,blockchain,共识机制' },
      // { name: 'description', content: '初链官网,初链 TrueChain－Next Generation Public Blockchain with Hybrid Consensus. 初链－下一代混合共识公链和全球开源公链社区' },
      {
        property: 'og:url',
        content: 'https://truechain.pro'
      },
      {
        property: 'og:image',
        content: 'https://qiniu.truescan.net/logo.png'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: 'baidu-site-verification',
        content: 'Z6qsmM03hJ'
      },
      {
        name: 'shenma-site-verification',
        content: '1a4726fefb7d5240f18ddec0b29fe888_1531190239'
      },
      {
        name: '360-site-verification',
        content: '7fa37e8328536ca9f2af1a41b9386455'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico?v2'
      },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_702478_8fe88gaj8d5.css'
      }
    ]
  },
  /*
   ** Customize the progress bar color
   */
  // loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    extend (config) {
      config.module.rules.push({
        test: /\.(vs|fs|glsl)(\?.*)?$/,
        loader: 'raw-loader'
      })
    }
    /*
     ** Run ESLint on save
     */
    /* extend (config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    } */
  },
  plugins: [
    '~/plugins/i18n.js',
    { src: '~plugins/iview', ssr: true },
    { src: '~plugins/vue-dplayer', ssr: false }
  ],
  loading: {
    color: 'cyan'
  },
  router: {
    middleware: ['pagestat', 'pagestatbai', 'baiduAnalyse', 'i18n']
  }
}
