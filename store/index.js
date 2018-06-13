export const state = () => ({
  locales: ['en', 'sc'],
  locale: 'en'
})

export const mutations = {
  SET_LANG(state, locale) {
    debugger
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
}
