/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * test
 */

let articleUrl, lightWalletUrl;

switch (process.env.NODE_ENV) {
  case 'development':
    articleUrl = 'http://127.0.0.1:8001/'
    lightWalletUrl = 'http://39.105.125.189:7001/'
    break
  case 'production':
    articleUrl = 'http://39.105.125.189:8001/'
    lightWalletUrl = 'http://39.105.125.189:7001/'
    break
}


export {
  articleUrl,
  lightWalletUrl
}
