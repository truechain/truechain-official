export const state = () => ({
  locales: ['zh', 'en', 'ko', 'vn', 'th', 'jp'],
  locale: 'zh'
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.indexOf(locale) !== -1) { // 如果有在上面配置，则设置状态中的url
      state.locale = locale
    }
  }
}
