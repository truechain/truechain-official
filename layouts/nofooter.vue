<template lang="pug">
  //- div
    .container-app(@click="closeMenu")
      nav
        .container-app-header
          div(@click="goHome")
            .container-app-header-logo
              i(class="icon font_family icon-logo2")
          .container-app-header-nav
            ul(:style="{'height': menuIsOpen ? `${50 * (indexList.length + 1)}px` : '0'}")
              li(
                  @click="jumpTo('https://github.com/truechain')"
                ) {{ $t(`nav.git`) }}
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
          span.container-app-header-button.lang(@click.stop="toggleLang") {{ $t(`language`) }}
          ul.langsSelecttor(:style="{'height': langsSelectorIsOpen ? `${40 * (langs.length)}px` : '0'}")
            li(
              v-for="item in langs"
              :key="item.tag"
              @click="changeLanguage(item.tag)"
            ) {{item.name}}
  .container-app-content
    transition(name="fade-x", mode="out-in")
      nuxt
      Spin(size="small", v-if="false")
        //- .container-app-footer-copyright
          div Copyright ⓒ TrueChain All Rights Reserved.
          // div COPYRIGHT© TRUE CHAIN {{$t('copyright') }}
</template>

<script>
import AppAndroid from '~/components/app-android.vue'
import AppIos from '~/components/app-ios.vue'
import { apiGetIpInfo } from '~/api'
import { setStore, getStore } from '~/util'
const indexList = [
  // { path: 'https://github.com/truechain', tag: 'git' },
  // { path: 'http://group.truechain.pro/', tag: 'blog' },
  { path: 'team', tag: 'team' },
  { path: 'news', tag: 'news' },
  { path: 'join', tag: 'join' },
  { path: 'node', tag: 'node' }
]
const langs = [
  { name: '简体中文', tag: 'zh' },
  { name: 'EN', tag: 'default' },
  { name: '한국어', tag: 'ko' },
  { name: 'ภาษาไทย', tag: 'th' },
  { name: 'タイ語', tag: 'jp' },
  { name: 'Tiếng Việt', tag: 'vn' }
]

export default {
  components: {
    AppAndroid,
    AppIos
  },
  mounted () {
    const lang = getStore('lang')
    if (lang) {
      this.changeLanguage(lang) // 会触发每个页面重新渲染,并无必要
    } else {
      this.setLanguage()
    }
  },
  head () {
    return {
      title: this.$t('home.head.title'),
      meta: [
        { hid: 'home-keyword', name: 'keywords', content: this.$t('home.head.keywords') },
        { hid: 'home-description', name: 'description', content: this.$t('home.head.description') }
      ],
      script: [
        { src: '//pv.sohu.com/cityjson?ie=utf-8' }
      ]
    }
  },
  data () {
    return {
      spinShow: true,
      indexList,
      langs,
      menuIsOpen: false,
      langsSelectorIsOpen: false,
      usedLangNum: 0,
      isWechat: false,
      countrys: {
        '中国': 'zh',
        '美国': 'en',
        '韩国': 'ko',
        '越南': 'vi',
        '日本': 'jp',
        '韩国': 'ko'
      }
    }
  },
  methods: {
    setLanguage () {
      setStore('lang', 'en')
      // apiGetIpInfo({
      //   /* eslint-disable-next-line */
      //   ip: returnCitySN.cip
      // }).then(x => {
      //   const { country } = JSON.parse(x.data.data).data
      //   setStore('lang', this.countrys[country] || 'en')
      //   this.changeLanguage(getStore('lang'))
      // })
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
      this.closeLangsSelector()
      if (!this.menuIsOpen) {
        this.menuIsOpen = true
      } else {
        this.menuIsOpen = false
      }
    },
    closeMenu (e) {
      this.closeLangsSelector()
      this.menuIsOpen = false
    },
    toggleLang () {
      this.closeMenu()
      if (!this.langsSelectorIsOpen) {
        this.langsSelectorIsOpen = true
      } else {
        this.langsSelectorIsOpen = false
      }
    },
    openLangsSelector () {
      this.langsSelectorIsOpen = true
    },
    closeLangsSelector () {
      this.langsSelectorIsOpen = false
    },
    changeLanguage (lang) {
      this.closeLangsSelector()
      if (this.$store.state.locale === lang) return

      const { $route: { fullPath, params }, $router } = this
      const path = fullPath.split(`/${params.lang}`).join('')

      setStore('lang', lang)
      if (lang === 'default') {
        $router.push(fullPath.replace(/^\/[^\/]+/, ''))
      } else {
        $router.push(`/${lang}${path}`)
      }
    }
  }
}
</script>

<style lang="stylus" scpoed>
@import '~@/assets/stylus/index.styl';
@import '~@/assets/stylus/mixin.styl';
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
  padding 35px 20px 0 0
  max-width 1200px
  margin auto
.container-app-header-logo
  margin-top 15px
  float left
  cursor pointer
  .icon-logo2
    color white
    font-size 135px
    line-height 0
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
.langsSelecttor
  background-color $dark-blue
  overflow hidden
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
.container-app-header-button.lang
  color white
  display none
  width auto
  margin: 5px 20px 5px 5px
  font-size 14px
  line-height 20px

.container-app-content
  // background red

.container-app-footer-copyright
  padding-bottom 0px
  background-color $dark-blue
  text-align center
  div
    color white
    text-align center
    font-size 13px
    line-height 60px

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
        line-height 40px
        margin-left 0
        padding 5px 35px
        border none !important
  .langsSelecttor
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
  .container-app-header-button.lang
    display inline-block

@media screen and (min-width 860px)
  .container-app-header-nav
    ul
      height auto!important
</style>
