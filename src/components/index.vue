<template lang="pug">
  div
    .container-app-header
      .container-app-header-logo
        img(src="~@/assets/images/logo_top.png")
      .container-app-header-nav
        ul
          router-link(
            v-for="(item, index) in indexList",
            :key="index",
            :to="item.path",
            tag="li",
          ) {{ $t(`nav.${item.tag}`) }}
          li(@click="toggleLanguage") ENGLISH▼
    .container-app-content
      router-view
    .container-app-footer.
      asdasdsa

</template>

<script>

import { setStore, getStore } from '../util'

const indexList = [
  { path: 'join', tag: 'git' },
  { path: 'team', tag: 'about' },
  { path: 'docs', tag: 'join' },
  { path: 'message', tag: 'tec' },
  { path: 'node', tag: 'docs' },
  { path: 'node', tag: 'forum' },
  { path: 'node', tag: 'noderank' }
]

export default {
  data () {
    return {
      indexList
    }
  },
  created () {
    this._i18n.locale = getStore('locale')
  },
  methods: {
    toggleLanguage () {
      if (getStore('locale') === 'sc') {
        setStore('locale', 'en')
      } else {
        setStore('locale', 'sc')
      }
      this._i18n.locale = getStore('locale')
    }
  }
}
</script>

<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'
  .container-app
  .container-app-header
    height 94px
    fc(space-between)
    padding 0 80px
    background green
    background-color $dark-blue
  .container-app-header-logo
    wh(118px, 30px)
    // background red
  .container-app-header-nav
    color $font-light
    ul
      fj()
      li
        color #A9ADBB
        margin-left 30px
        font-size 14px
  .container-app-content
    background red
</style>
