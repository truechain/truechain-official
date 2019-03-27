import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({
  app,
  store
}) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    silentTranslationWarn: true,
    messages: {
      'en': require('~/locales/en.json'), // 英文
      'zh': require('~/locales/zh.json'), // 中国
      'ko': require('~/locales/ko.json'), // 韩国
      'th': require('~/locales/th.json'), // 泰国
      'jp': require('~/locales/jp.json'), // 日本
      'vn': require('~/locales/vn.json') // 越南
    }
  })

  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }
    // don't always append locale
    if ((app.i18n.locale) && (link.indexOf(app.i18n.locale) < 0)) {
      return `/${app.i18n.locale}/${link}`
    }
    return `/${link}`
  }
}
