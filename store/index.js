export const state = () => ({
  locales: ['en', 'zh', 'ko', 'vn', 'th', 'jp', 'default'],
  locale: 'default'
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.indexOf(locale) !== -1) { // 如果有在上面配置，则设置状态中的url
      state.locale = locale
    }
  }
}
