const axios = require('axios')
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
      // {
      //   name: 'viewport',
      //   content: 'width=device-width, initial-scale=1'
      // },
      // { name: 'keyword', content: '初链，TRUE，初链币，TrueChain，张剑南，区块链，混合共识，程小永，林大亮' },
      // { name: 'description', content: '初链（TrueChain）是全球最早的混合共识公链，设计和实现初链混合共识协议，将PBFT和POW共识结合在一起。初链解决了区块链领域最重要的问题之一: 去中心化和性能的矛盾。' },
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
// generate: {
//   routes: function () {
//     return axios.get('https://my-api/users')
//     .then((res) => {
//       return res.data.map((user) => {
//         return '/users/' + user.id
//       })
//     })
//   }
// },
  generate: {
    routes: [
      '/',
      '/join',
      '/news',
      '/node',
      '/team',
      // '/jd/1',
      // '/jd/2',
      // '/jd/3',
      // '/jd/4',
      // '/jd/5',
      // '/jd/6',
      // '/jd/7',
      '/zh',
      '/zh/join',
      '/zh/news',
      '/zh/node',
      '/zh/team',
      // '/zh/jd/1',
      // '/zh/jd/2',
      // '/zh/jd/3',
      // '/zh/jd/4',
      // '/zh/jd/5',
      // '/zh/jd/6',
      // '/zh/jd/7',
      // '/ko',
      // '/ko/join',
      // '/ko/news',
      // '/ko/node',
      // '/ko/team',
      // '/ko/jd/1',
      // '/ko/jd/2',
      // '/ko/jd/3',
      // '/ko/jd/4',
      // '/ko/jd/5',
      // '/ko/jd/6',
      // '/ko/jd/7',
    ]
  },
  loading: {
    color: 'cyan'
  },
  router: {
    middleware: 'i18n'
  }
}
