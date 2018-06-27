module.exports = {

  /*
   ** Headers of the page
   */
  head: {
    title: 'True Chain',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      { hid: 'keyword', name: 'keyword', content: 'truechain, true, 初链' },
      { hid: 'description', name: 'description', content: 'Next Generation Public Blockchain with Hybrid Consensus. 超高性能，无穷节点，混合共识公有链！' },
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
