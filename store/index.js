export const state = () => ({
  locales: ['en', 'zh', 'ko'],
  locale: 'zh'
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
}
