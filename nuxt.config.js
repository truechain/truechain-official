module.exports = {

  /*
   ** Headers of the page
   */
  head: {
    title: '初链-高性能无穷节点混合共识公链',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      { name: 'keyword', content: '初链，TRUE，初链币，TrueChain，张剑南，区块链，混合共识，程大永，林大亮' },
      { name: 'description', content: '初链（TrueChain）是全球最早的混合共识公链，设计和实现初链混合共识协议，将PBFT和POW共识结合在一起。初链解决了区块链领域最重要的问题之一: 去中心化和性能的矛盾。' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico?v2',
      },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_702478_ism1x289egj.css'
      },
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
    extend(config, {
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
    }
  },
  plugins: [
  '~/plugins/i18n.js',
  { src: '~plugins/iview', ssr: true },
  { src: '~plugins/vue-dplayer', ssr: false }
],
  generate: {
    routes: ['/']
  },
  loading: {
    color: 'cyan'
  },
  router: {
    middleware: 'i18n'
  }
}
