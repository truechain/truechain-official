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
      transition(name="fade-x", mode="out-in")
        router-view
    .container-app-footer
      .container-app-footer-logo
        img(src="~@/assets/images/logo_bot.png")
      .container-app-footer-nav
        ul
          router-link(
            v-for="(item, index) in footerList",
            :key="index",
            :to="item.path",
            tag="li",
          ) {{ $t(`nav.${item.tag}`) }}
      .container-app-footer-links
        ul
          li(
            v-for="(item, index) in linksList",
            :key="index",
          )
            img(:src="item.path", alt="")
      .container-app-footer-copyright
        div COPYRIGHT© TRUE CHAIN (初链)官方网站版权所有
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
const footerList = [
  { path: 'join', tag: 'git' },
  { path: 'team', tag: 'about' },
  { path: 'docs', tag: 'join' },
  { path: 'message', tag: 'tec' }
]
const linksList = [
  { path: require('@/assets/images/wechat.png'), link: 'wechat' },
  { path: require('@/assets/images/weibo.png'), link: 'weibo' },
  { path: require('@/assets/images/twitter.png'), link: 'twitter' },
  { path: require('@/assets/images/telegram.png'), link: 'telegram' }
]

export default {
  data () {
    return {
      indexList,
      footerList,
      linksList
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
    // background red
  .container-app-footer
    wh(100%, 426px)
    background-color $dark-blue
    fc()
    display flex
    align-items center
    flex-direction column
  .container-app-footer-nav
    // background red
    padding 40px 0
    ul
      display flex
      li
        margin 0 25px
        color white
        font-size 12px
  .container-app-footer-links
    padding 20px 0 40px
    ul
      display flex
      li
        margin 0 25px
        wh(30px, 30px)
        background white
        border-radius 50%
        img
          transform scale(.58)
  .container-app-footer-logo
    wh(88px, 88px)
    background-color white
    border-radius 50%
    padding 20px
  .container-app-footer-copyright
    div
      color white
      font-size 13px
</style>
