export default function ({ isHMR, app, store, route, params, error, redirect }) {
  const defaultLocale = 'zh'
  // debugger
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return
  // Get locale from params
  const pathWhite = ['/news_detail', '/jd']
  const locale = params.lang || defaultLocale
  // 如果当前路由的语言选项没在配置中，并且也不在路径白名单中 返回page not found.
  if (store.state.locales.indexOf(locale) === -1 && !pathWhite.join(',').includes(locale)) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }

  // Set locale
  if (store.state.locales.indexOf(locale) !== -1) { // 如果有在store上面配置，则设置状态中的url
    store.commit('SET_LANG', locale)
    app.i18n.locale = store.state.locale
  }

  /* 清空路径中的不需要的值 */
  if (route.params.id && Number.isNaN(+(route.params.id))) {
    // debugger
    const path = route.fullPath
    const emptyPath = pathWhite.find(x => path.includes(x))
    if (emptyPath) {
      redirect(
        path.split(emptyPath).join('')
      )
    }
  }
  // If route is /<defaultLocale>/... -> redirect to /...  (如果路径是/<defaultLocale>开头的，替换转发到 / 开头)
  if (locale === defaultLocale && route.fullPath.indexOf('/' + defaultLocale) === 0) {
    const toReplace = '^/' + defaultLocale
    const re = new RegExp(toReplace)
    return redirect(
      route.fullPath.replace(re, '/')
    )
  }
}
