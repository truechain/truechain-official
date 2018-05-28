<template lang="pug">
  .container-app
    nav
      .container-app-header
        router-link(to="/")
          .container-app-header-logo
            img(src="~@/assets/images/logo_top.png")
        .container-app-header-nav
          ul(:style="{'height': menuIsOpen ? `${40 * (indexList.length + 1)}px` : '0'}")
            li(
              v-for="(item, index) in indexList",
              :key="index",
              @click="jumpTo(item.path)",
            ) {{ $t(`nav.${item.tag}`) }}
            li.container-app-header-lang(@click="toggleLanguage") ENGLISH
        span.container-app-header-button(@click="toggleMenu")
          span
          span
          span
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
import { setStore, getStore } from '@/util'

const indexList = [
  { path: 'https://github.com/truechain', tag: 'git' },
  { path: 'team', tag: 'about' },
  { path: 'join', tag: 'join' },
  { path: 'docs', tag: 'docs' },
  { path: 'http://group.truechain.pro/', tag: 'forum' },
  { path: 'node', tag: 'noderank' }
]
const footerList = [
  { path: 'join', tag: 'git' },
  { path: 'team', tag: 'about' },
  { path: 'docs', tag: 'join' },
  { path: 'message', tag: 'docs' }
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
      menuIsOpen: false,
      footerList,
      linksList
    }
  },
  created () {
    this._i18n.locale = getStore('locale') || 'sc'
  },
  methods: {
    jumpTo (path) {
      if (/http[s]?:\/\//.test(path)) {
        window.open(path)
      } else {
        this.$router.push(path)
      }
    },
    toggleMenu () {
      if (!this.menuIsOpen) {
        this.menuIsOpen = true
        document.addEventListener('click', this.closeMenu, true)
      } else {
        this.menuIsOpen = false
      }
    },
    closeMenu () {
      this.$nextTick(() => {
        this.menuIsOpen = false
        document.removeEventListener('click', this.closeMenu, true)
      })
    },
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
    margin-top 100px
  nav
    position fixed
    top 0
    left 0
    wh(100%, 100px)
    background-color $dark-blue
  .container-app-header
    padding 35px
    mw()
  .container-app-header-logo
    wh(118px, 30px)
    float left
  .container-app-header-nav
    color $font-light
    ul
      float right
      background-color $dark-blue
      li
        float left
        color #fff
        font-weight 200
        opacity .6
        margin-left 10px
        font-size 14px
        cursor pointer
        transition opacity .4s
        line-height 20px
        padding 5px 15px
        &:hover
          opacity 1
      .container-app-header-lang
        padding 4px 14px
        border solid 1px #fff
        border-radius 15px
        opacity 1
  .container-app-header-button
    display none
    float right
    margin 5px 0
    cursor pointer
    wh(30px, 20px)
    span
      background-color #FFF
      display block
      margin 7px 0
      wh(30px, 2px)
      &:first-child
        margin 0
      &:last-child
        margin 0

  .container-app-content
    background red

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

@media screen and (max-width 860px)
  .container-app-header-nav
    ul
      overflow hidden
      position absolute
      left 0
      top 100px
      width 100%
      height 0
      transition height .6s
      li
        float none
        line-height 30px
        margin-left 0
        border none !important
  .container-app-header-button
    display block
</style>
