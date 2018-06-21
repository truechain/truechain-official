export default function ({ isHMR, app, store, route, params, error, redirect }) {
  const defaultLocale = app.i18n.fallbackLocale
  // debugger
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return
  // Get locale from params
  const pathWhite = ['/news_detail', '/jd'];
  const locale = params.lang || defaultLocale
  if (store.state.locales.indexOf(locale) === -1 && !pathWhite.join(',').includes(locale)) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }

  // Set locale
  store.commit('SET_LANG', locale)
  app.i18n.locale = store.state.locale
  // debugger
  /* 清空路径中的不需要的值 */
  if(route.params.id && Number.isNaN(+(route.params.id))) {
    // debugger
    const path = route.fullPath;
    const emptyPath = pathWhite.find(x => path.includes(x))
    if(emptyPath) {
      redirect(
        path.split(emptyPath).join('')
      )
    } else {
      console.log('不知道咋整了');
    }

  }
  // If route is /<defaultLocale>/... -> redirect to /...
  if (locale === defaultLocale && route.fullPath.indexOf('/' + defaultLocale) === 0) {
    const toReplace = '^/' + defaultLocale
    const re = new RegExp(toReplace)
    return redirect(
      route.fullPath.replace(re, '/')
    )
  }
}
