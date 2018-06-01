<template lang="pug">
  .container-app(@click="closeMenu")
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
            li.container-app-header-lang(
              :style="{'height': langsSelectorIsOpen ? `${langs.length * 28 + 2}px` : '30px'}"
              @mouseenter="openLangsSelector"
              @mouseleave="closeLangsSelector"
            )
              div(
                :style="{'transform': `translateY(${langsSelectorIsOpen ? 0 : -usedLangNum * 28}px)`}"
              )
                div(
                  v-for="(item, index) in langs"
                  :key="index"
                  @click="toggleLanguage(index)"
                ) {{item.name}}
              //- .container-app-header-lang-select
              //-   div ENGLISH
              //-   div 简体中文
        span.container-app-header-button(@click.stop="toggleMenu")
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
          li(
            v-for="(item, index) in footerList",
            :key="index",
            @click="jumpTo(item.path)",
          ) {{ $t(`nav.${item.tag}`) }}
      .container-app-footer-links
        ul
          li(
            @mouseenter="setErweima",
            @mouseleave="setErweima",
          )
            img(src="~@/assets/images/wechat.png")
            transition(name="fade", mode="out-in")
              span(class="wechatImg " v-show="isWechat")
          li(
            v-for="(item, index) in linksList",
            :key="index",
            @click="onJump(item.link)",
            :id="item.id"
          )
            img(:src="item.path")
      .container-app-footer-copyright
        div COPYRIGHT© TRUE CHAIN {{$t('copyright')}}
</template>

<script>
import { setStore, getStore } from '@/util'

const indexList = [
  { path: 'https://github.com/truechain', tag: 'git' },
  { path: 'about', tag: 'about' },
  { path: 'join', tag: 'join' },
  { path: 'docs', tag: 'docs' },
  // { path: 'http://group.truechain.pro/', tag: 'forum' },
  { path: 'node', tag: 'noderank' }
]
const langs = [
  { name: 'ENGLISH', tag: 'en' },
  { name: '简体中文', tag: 'sc' }
]
const footerList = [
  { path: 'https://github.com/truechain', tag: 'git' },
  { path: 'about', tag: 'about' },
  { path: 'join', tag: 'join' },
  { path: 'docs', tag: 'docs' }
]
const linksList = [
  {
    path: require('@/assets/images/weibo.png'),
    name: 'weibo',
    link: 'https://weibo.com/525045616'
  },
  {
    path: require('@/assets/images/twitter.png'),
    name: 'twitter',
    link: 'https://twitter.com/truechaingroup'
  },
  {
    path: require('@/assets/images/telegram.png'),
    name: 'telegram',
    link: 'https://www.facebook.com/TrueChaingroup/'
  }
]

export default {
  data () {
    return {
      indexList,
      langs,
      menuIsOpen: false,
      footerList,
      linksList,
      langsSelectorIsOpen: false,
      usedLangNum: 0,
      isWechat: false
    }
  },
  created () {
    const storeLangConfig = getStore('locale')
    const index = this.langs.indexOf(storeLangConfig)
    if (index !== -1) {
      this._i18n.locale = storeLangConfig
      this.usedLangNum = index
    } else {
      this.toggleLanguage(0)
    }
  },
  methods: {
    setErweima () {
      this.isWechat = !this.isWechat
    },
    onJump (path) {
      if (!path) return
      window.open(path)
    },
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
      } else {
        this.menuIsOpen = false
      }
    },
    closeMenu (e) {
      this.menuIsOpen = false
    },
    openLangsSelector () {
      this.langsSelectorIsOpen = true
    },
    closeLangsSelector () {
      this.langsSelectorIsOpen = false
    },
    toggleLanguage (index) {
      const tag = this.langs[index].tag
      setStore('locale', tag)
      this.usedLangNum = index
      this._i18n.locale = getStore('locale')
    }
  }
}
</script>

<style lang="stylus" scpoed>
@import '~@/assets/stylus/mixin.styl'

  .container-app
    padding-top 100px
  nav
    position fixed
    top 0
    left 0
    z-index 100
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
        padding 0 24px 0 14px
        border solid 1px #fff
        border-radius 15px
        opacity 1
        height 30px
        transition height .4s
        overflow hidden
        position relative
        div
          line-height 28px
          color #FFF
          cursor pointer
        >div
          transition transform .4s
        &:after
          content ''
          position absolute
          right 8px
          top 11px
          border-top solid 7px #1E64B4
          border-left solid 5px transparent
          border-right solid 5px transparent
          wh(0, 0)
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
        cursor pointer
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
        .wechatImg
          width 100px
          height 100px
          position absolute
          background url('~@/assets/images/qrcode.png')
          background-size 100% 100%
          top -110px
          left -36px
          z-index 999
          &:after
            content ''
            width 0
            height 0
            position absolute
            bottom -18px
            left 50%
            transform translateX(-50%)
            border 10px solid
            border-color #fff transparent transparent transparent
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
