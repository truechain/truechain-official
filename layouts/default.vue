<template lang="pug">
  div
    .container-app(@click="closeMenu")
      nav
        .container-app-header
          div(@click="goHome")
            .container-app-header-logo
              i(class="icon font_family icon-logo2")
              // img(src="~@/assets/images/logo_top.png")
          .container-app-header-nav
            ul(:style="{'height': menuIsOpen ? `${40 * (indexList.length + 1)}px` : '0'}")
              li(
                  @click="jumpTo('https://github.com/truechain')"
                ) {{ $t(`nav.git`) }}
              // li(
              //     @click="jumpTo('http://group.truechain.pro')"
              // ) {{ $t(`nav.blog`) }}
              nuxt-link(
                v-for="(item, index) in indexList",
                tag="li",
                :key="index",
                :to="item.path"
              ) {{ $t(`nav.${item.tag}`) }}
              li.container-app-header-nav-langli
                Dropdown(@on-click="changeLanguage", trigger="click")
                  Button(type="primary") {{ $t(`language`) }}
                    Icon(type="arrow-down-b")
                  DropdownMenu(slot="list")
                    DropdownItem(
                      v-for="item in langs"
                      :name="item.tag"
                      :key="item.tag"
                    ) {{item.name}}
          span.container-app-header-button(@click.stop="toggleMenu")
            span
            span
            span
      .container-app-content
        transition(name="fade-x", mode="out-in")
          nuxt
          Spin(size="small", v-if="false")
      .container-app-footer
        .container-app-footer-logo
          i(class="icon font_family icon-logo1")
        .container-app-footer-nav
          ul
            li(
                @click="jumpTo('https://github.com/truechain')"
              ) {{ $t(`nav.git`) }}
            // li(
            //     @click="jumpTo('http://group.truechain.pro')"
            // ) {{ $t(`nav.blog`) }}
            li(
              v-for="(item, index) in indexList",
              :key="index",
              @click="jumpTo(item.path)",
            ) {{ $t(`nav.${item.tag}`) }}
        .container-app-footer-links
          ul
            li(
              @mouseenter="setErweima",
              @mouseleave="setErweima",
            )
              span(class="icon font_family icon-weixin")
              transition(name="fade", mode="out-in")
                span(class="wechatImg " v-show="isWechat")
            li(
              v-for="(item, index) in linksList",
              :key="index",
              @click="onJump(item.link)",
              :id="item.id"
            )
              span(:class="item.icon")
        .container-app-footer-down
          .container-app-footer-text
            div {{ $t('home.banner2.title') }}
          .container-app-footer-buttons
            app-android
            app-ios
        .container-app-footer-copyright
          div COPYRIGHT© TRUE CHAIN {{$t('copyright') }}
</template>

<script>
import AppAndroid from '~/components/app-android.vue'
import AppIos from '~/components/app-ios.vue'
import { apiGetIpInfo } from '~/api'

const indexList = [
  // { path: 'https://github.com/truechain', tag: 'git' },
  // { path: 'http://group.truechain.pro/', tag: 'blog' },
  { path: 'team', tag: 'team' },
  { path: 'news', tag: 'news' },
  { path: 'join', tag: 'join' },
  { path: 'node', tag: 'node' },
  { path: 'bounty', tag: 'bounty' }
]
const langs = [
  { name: '简体中文', tag: 'zh' },
  { name: 'EN', tag: 'en' },
  { name: '한국어', tag: 'ko' },
]
const linksList = [
  {
    name: 'weibo',
    icon: 'icon font_family icon-weibo',
    link: 'https://weibo.com/525045616/'
  },
  {
    name: 'twitter',
    icon: 'icon font_family icon-twitter',
    link: 'https://twitter.com/truechaingroup/'
  },
  {
    name: 'telegram',
    icon: 'icon font_family icon-telegram',
    link: 'http://www.t.me/truechainglobal/'
  },
  {
    name: 'telegram',
    icon: 'icon font_family icon-facebook',
    link: 'https://www.facebook.com/TrueChaingroup/'
  },
]

export default {
  components: {
    AppAndroid,
    AppIos
  },
  mounted () {
    this.setLanguage()
  },
  head() {
    return {
      title: this.$t('home.head.title'),
      meta: [
        { hid: 'home-keyword', name: 'keyword', content: this.$t('home.head.keyword') },
        { hid: 'home-description', name: 'description', content: this.$t('home.head.description') },
      ],
      script: [
        { src: '//pv.sohu.com/cityjson?ie=utf-8' },
        { src: '/donglizi.js' }
      ]
    }
  },
  data () {
    return {
      spinShow: true,
      indexList,
      langs,
      menuIsOpen: false,
      linksList,
      langsSelectorIsOpen: false,
      usedLangNum: 0,
      isWechat: false,
      countrys: {
        '中国': 'zh',
        '美国': 'en',
        '韩国': 'ko'
      }
    }
  },
  methods: {
    setLanguage () {
      apiGetIpInfo({
        ip: returnCitySN.cip
      }).then(x => {
        const { country } = JSON.parse(x.data.data).data
        this.changeLanguage(this.countrys[country] || 'en')
      })
    },
    goHome () {
      const { lang } = this.$route.params
      this.$router.push(`/${lang ? lang + '/' : ''}`)
    },
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
   /*  toggleLanguage (index) {
      const { $route:{ fullPath }, $router, $store } = this
      if($store.state.locale === 'en') {
        $router.push(`/zh${fullPath}`)
      } else {
        $router.push(fullPath.replace(/^\/[^\/]+/, ''))
      }
    }, */
    changeLanguage (lang) {

      if(this.$store.state.locale === lang) return

      const { $route:{ fullPath, params }, $router } = this
      const path = fullPath.split(`/${params.lang}`).join('')

      if(lang === 'zh') {
        $router.push(fullPath.replace(/^\/[^\/]+/, ''))
      } else {
        $router.push(`/${lang}${ path }`)
      }
    }
  }
}
</script>

<style lang="stylus" scpoed>
@import '~@/assets/stylus/index.styl'
@import '~@/assets/stylus/mixin.styl'
.nuxt-link-exact-active
  color white !important
  &:after
    content ''
    wh(40px, 2px)
    position absolute
    background white
    position absolute
    bottom -5px
    left 50%
    transform translate(-50%, -50%)
.container-app
  padding-top 100px
nav
  position fixed
  top 0
  left 0
  z-index 1000
  wh(100%, 100px)
  background-color $dark-blue
  // background-color red
.container-app-header
  padding 35px 0
  width 80%
  margin auto
.container-app-header-logo
  // wh(118px, 30px)
  margin-top 8px
  float left
  cursor pointer
  .icon-logo2
    color white
    // font-size 100px
    // line-height 0
    transform scale(8)
.container-app-header-nav
  color $font-light
  ul
    float right
    background-color $dark-blue
    li
      float left
      color #A9ADBB
      margin-left 10px
      font-size 14px
      cursor pointer
      transition color .4s
      line-height 20px
      padding 5px 15px
      position relative
      &:hover
        color white
    .container-app-header-nav-langli
      padding-top 0px
      margin-left 0px
      .ivu-btn
        padding 5px 15px
        &:focus
          box-shadow none
      .ivu-select-dropdown
        .ivu-dropdown-item
          margin 0
          text-align left
          width 100%
          &:hover
            background-color $dark-blue
      .ivu-btn-primary
        background-color $dark-blue
        border 0
        margin-left 0px
        span,i
          color #A9ADBB
          font-size 14px
        .ivu-icon-arrow-down-b
          margin-left 6px
    .ivu-select-dropdown
      width auto !important
      background-color $dark-blue
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
  padding 10px 0
  ul
    display flex
    li
      margin 0 15px
      wh(30px, 30px)
      background white
      border-radius 50%
      transition all ease .5s
      position relative
      cursor pointer
      fc()
      .font_family
        color $dark-blue
        transform scale(1.2)
      &:hover
        transform scale(1.3)
      .wechatImg
        width 100px
        height 100px
        position absolute
        background url('~@/assets/images/qrcode.png')
        background-size 100% 100%
        top -125px
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
  // padding 20px
  fc()
  .font_family
    font-size 60px
    color $font-dark
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
.container-app-footer-down
  position relative
  width 400px
  padding 10px 0
.container-app-footer-text
  div
    line-height 45px
    color white
.container-app-footer-buttons
  position absolute
  top -34px
  right -88px
  transform scale(.6)
  height 100px
  display flex
  align-items center

.bounty-rule
  font-size 14px
  em
    font-style normal
    font-weight bold
  h1, h2, h3, h4
    color #111111
    font-weight bold
    margin-top 1em
  h1, h2, h3, h4, h5, p , dl
    margin 1.5em 0 10px
    padding 0
  h1 
    font-size 44px
    line-height 50px
  h2 
    font-size 30px
    line-height 36px
  h1, h2 
    border-bottom 1px solid #EFEAEA
    padding-bottom 20px
  h3 
    font-size 24px
    line-height 30px
  h4 
    font-size 18px
    line-height 22px
  h5 
    font-size 16px
    line-height 20px
  a 
    color #1e64b4
    margin 0
    padding 0
    vertical-align baseline
  a:hover 
    text-decoration none
    color #0099ff
  a:visited 
    /*color purple*/
  ul, ol 
    padding 0
    padding-left 1.5em
    margin 0
  li 
    list-style disc
    line-height 1.5em
    margin 10px 0
  p, ul, ol 
    line-height 1.5em
  ol ol, ul ol 
    list-style-type lower-roman
  code, pre 
    border-radius 3px
    background-color:#f7f7f7
    color inherit

  code 
    font-family Consolas, Monaco, Andale Mono, monospace
    margin 0 2px

  pre 
    line-height 1.7em
    overflow auto
    padding 6px 10px
    border-left 5px solid #6CE26C
  pre > code
    border 0
    display inline
    max-width initial
    padding 0
    margin 0
    overflow initial
    line-height inherit
    font-size .85em
    white-space pre
    background 0 0

  code 
    color #666555

  aside 
    display block
    float right
    width 390px
  blockquote 
    border-left:.5em solid #eee
    padding 0 0 0 2em
    margin-left:0
  blockquote cite 
    font-size:14px
    line-height:20px
    color:#bfbfbf
  blockquote cite:before 
    content '\2014 \00A0'
  blockquote p 
    color #666
  hr 
    text-align left
    color #999
    height 2px
    padding 0
    margin 16px 0
    background-color #e7e7e7
    border 0 none
  dl
    padding 0

  dl dt
    padding 10px 0
    margin-top 16px
    font-size 1em
    font-style italic
    font-weight bold

  dl dd 
    padding 0 16px
    margin-bottom 16px

  dd 
    margin-left 0

  /* Code below this line is copyright Twitter Inc. */

  button,
  input,
  select,
  textarea 
    font-size 100%
    margin 0
    vertical-align baseline
    *vertical-align middle
  button, input 
    line-height normal
    *overflow visible
  button::-moz-focus-inner, input::-moz-focus-inner 
    border 0
    padding 0
  button,
  input[type="button"],
  input[type="reset"],
  input[type="submit"] 
    cursor pointer
    -webkit-appearance button
  input[type=checkbox], input[type=radio] 
    cursor pointer
  /* override default chrome & firefox settings */
  input:not([type="image"]), textarea 
    -webkit-box-sizing content-box
    -moz-box-sizing content-box
    box-sizing content-box

  input[type="search"] 
    -webkit-appearance textfield
    -webkit-box-sizing content-box
    -moz-box-sizing content-box
    box-sizing content-box
  input[type="search"]::-webkit-search-decoration 
    -webkit-appearance none
  label,
  input,
  select,
  textarea 
    font-family "Helvetica Neue", Helvetica, Arial, sans-serif
    font-size 13px
    font-weight normal
    line-height normal
    margin-bottom 18px
  input[type=checkbox], input[type=radio] 
    cursor pointer
    margin-bottom 0
  input[type=text],
  input[type=password],
  textarea,
  select 
    display inline-block
    width 210px
    padding 4px
    font-size 13px
    font-weight normal
    line-height 18px
    height 18px
    color #808080
    border 1px solid #ccc
    -webkit-border-radius 3px
    -moz-border-radius 3px
    border-radius 3px
  select, input[type=file] 
    height 27px
    line-height 27px
  textarea 
    height auto
  /* grey out placeholders */
  :-moz-placeholder 
    color #bfbfbf
  ::-webkit-input-placeholder 
    color #bfbfbf
  input[type=text],
  input[type=password],
  select,
  textarea 
    -webkit-transition border linear 0.2s, box-shadow linear 0.2s
    -moz-transition border linear 0.2s, box-shadow linear 0.2s
    transition border linear 0.2s, box-shadow linear 0.2s
    -webkit-box-shadow inset 0 1px 3px rgba(0, 0, 0, 0.1)
    -moz-box-shadow inset 0 1px 3px rgba(0, 0, 0, 0.1)
    box-shadow inset 0 1px 3px rgba(0, 0, 0, 0.1)
  input[type=text]:focus, input[type=password]:focus, textarea:focus 
    outline none
    border-color rgba(82, 168, 236, 0.8)
    -webkit-box-shadow inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6)
    -moz-box-shadow inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6)
    box-shadow inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6)
  button 
    display inline-block
    padding 4px 14px
    font-family "Helvetica Neue", Helvetica, Arial, sans-serif
    font-size 13px
    line-height 18px
    -webkit-border-radius 4px
    -moz-border-radius 4px
    border-radius 4px
    -webkit-box-shadow inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05)
    -moz-box-shadow inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05)
    box-shadow inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05)
    background-color #0064cd
    background-repeat repeat-x
    background-image -khtml-gradient(linear, left top, left bottom, from(#049cdb), to(#0064cd))
    background-image -moz-linear-gradient(top, #049cdb, #0064cd)
    background-image -ms-linear-gradient(top, #049cdb, #0064cd)
    background-image -webkit-gradient(linear, left top, left bottom, color-stop(0%, #049cdb), color-stop(100%, #0064cd))
    background-image -webkit-linear-gradient(top, #049cdb, #0064cd)
    background-image -o-linear-gradient(top, #049cdb, #0064cd)
    background-image linear-gradient(top, #049cdb, #0064cd)
    color #fff
    text-shadow 0 -1px 0 rgba(0, 0, 0, 0.25)
    border 1px solid #004b9a
    border-bottom-color #003f81
    -webkit-transition 0.1s linear all
    -moz-transition 0.1s linear all
    transition 0.1s linear all
    border-color #0064cd #0064cd #003f81
    border-color rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25)
  button:hover 
    color #fff
    background-position 0 -15px
    text-decoration none
  button:active 
    -webkit-box-shadow inset 0 3px 7px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05)
    -moz-box-shadow inset 0 3px 7px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05)
    box-shadow inset 0 3px 7px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05)
  button::-moz-focus-inner 
    padding 0
    border 0
  table 
    *border-collapse collapse /* IE7 and lower */
    border-spacing 0
    width 100%
  table 
    border solid #ccc 1px
    -moz-border-radius 6px
    -webkit-border-radius 6px
    border-radius 6px
  table tr:hover 
    background #fbf8e9
    -o-transition all 0.1s ease-in-out
    -webkit-transition all 0.1s ease-in-out
    -moz-transition all 0.1s ease-in-out
    -ms-transition all 0.1s ease-in-out
    transition all 0.1s ease-in-out
  table td, .table th 
    border-left 1px solid #ccc
    border-top 1px solid #ccc
    padding 10px
    text-align left
  table th 
    background-color #dce9f9
    background-image -webkit-gradient(linear, left top, left bottom, from(#ebf3fc), to(#dce9f9))
    background-image -webkit-linear-gradient(top, #ebf3fc, #dce9f9)
    background-image    -moz-linear-gradient(top, #ebf3fc, #dce9f9)
    background-image     -ms-linear-gradient(top, #ebf3fc, #dce9f9)
    background-image      -o-linear-gradient(top, #ebf3fc, #dce9f9)
    background-image         linear-gradient(top, #ebf3fc, #dce9f9)
    border-top none
    text-shadow 0 1px 0 rgba(255,255,255,.5)
    padding 5px
  table td:first-child, table th:first-child 
    border-left none
  table th:first-child 
    -moz-border-radius 6px 0 0 0
    -webkit-border-radius 6px 0 0 0
    border-radius 6px 0 0 0
  table th:last-child 
    -moz-border-radius 0 6px 0 0
    -webkit-border-radius 0 6px 0 0
    border-radius 0 6px 0 0
  table th:only-child
    -moz-border-radius 6px 6px 0 0
    -webkit-border-radius 6px 6px 0 0
    border-radius 6px 6px 0 0
  table tr:last-child td:first-child 
    -moz-border-radius 0 0 0 6px
    -webkit-border-radius 0 0 0 6px
    border-radius 0 0 0 6px
  table tr:last-child td:last-child 
    -moz-border-radius 0 0 6px 0
    -webkit-border-radius 0 0 6px 0
    border-radius 0 0 6px 0
</style>
