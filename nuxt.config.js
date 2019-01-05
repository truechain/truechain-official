module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    title: '初链-高性能无穷节点混合共识公链-官网',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        property: 'og:title',
        content: 'TrueChain'
      },
      {
        property: 'og:description',
        content: 'TrueChain－Next Generation Public Blockchain with Hybrid Consensus'
      },
      {
        property: 'og:url',
        content: 'https://truechain.pro'
      },
      {
        property: 'og:image',
        content: 'https://qiniu.baixiaojian.com/logo.png'
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
      { hid: 'keyword', name: 'keyword', content: 'truechain, true, 初链, blockchain' },
      { hid: 'description', name: 'description', content: 'TrueChain－Next Generation Public Blockchain with Hybrid Consensus. 初链－下一代混合共识公链和全球开源公链社区' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico?v2'
      },
      {
        rel: 'stylesheet',
        href: '///at.alicdn.com/t/font_702478_b8mxsnidszn.css'
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
    middleware: ['pagestat', 'i18n']
  }
}
