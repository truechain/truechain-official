/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * test
 */

let articleUrl, lightWalletUrl

switch (process.env.NODE_ENV) {
  case 'development':
    // articleUrl = 'http://127.0.0.1:8001/api2'
    articleUrl = 'http://39.105.125.189:8001/api2'
    // lightWalletUrl = 'http://127.0.0.1:8989/api'
    lightWalletUrl = 'http://39.105.125.189:7001/api'
    break
  case 'production':
    // articleUrl = 'http://39.105.125.189:8001/'
    // lightWalletUrl = 'http://39.105.125.189:7001/'
    articleUrl = 'https://www.truechain.pro/api2/'
    lightWalletUrl = 'https://www.truechain.pro/api/'
    break
}

export {
  articleUrl,
  lightWalletUrl
}
