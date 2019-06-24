<template lang="pug">
  div
    .container-app(@click="closeMenu")
      nav(:style="{ 'z-index': menuIsOpen || langsSelectorIsOpen ? 1200 : 1000 }")
        .container-app-header
          div(@click="goHome")
            .container-app-header-logo
              i(class="icon font_family icon-truelogo")
          .container-app-header-nav
            ul(:style="{'height': menuIsOpen ? `${50 * (indexList.length + 1)}px` : '0'}")
              nuxt-link(
                tag="li",
                to="discovery"
              ) {{ $t('navigation.nav') }}
              li.container-app-header-nav-langli
                Dropdown(@on-click="jumpTo", trigger="hover")
                  Button(type="primary") {{ $t(`nav.deer`) }}
                    Icon(type="arrow-down-b")
                  DropdownMenu(slot="list")
                    DropdownItem(
                      name="http://dev.truedapp.net/"
                      ) {{ $t(`nav.developer`) }}
                    template(v-if="$t('language') === '简体中文'")
                      DropdownItem(
                          name="http://doc.truechain.pro/center/1096543/"
                        ) {{ $t(`nav.document`) }}
                    template(v-else)
                      DropdownItem(
                          name="http://doc.truechain.pro/center-en/1091414"
                        ) {{ $t(`nav.document`) }}
                    DropdownItem(
                      name="https://stellar.truechain.pro/"
                    ) Stellar
                    DropdownItem(
                      name="https://www.truescan.net/"
                    ) TrueScan
              //- template(v-if="$t('language') === '简体中文'")
              //-   li(
              //-       @click="jumpTo('http://dev.truedapp.net/')"
              //-     ) {{ $t(`nav.developer`) }}
              //- template(v-else)
              //-   li(
              //-       @click="jumpTo('http://dev.truechain.pro/')"
              //-     ) {{ $t(`nav.developer`) }}
              //- li(
              //-     @click="jumpTo('http://trueglobal.pro')"
              //-   ) TRUE GLOBAL
              //- li(
              //-     @click="jumpTo('https://www.truescan.net')"
              //-   ) TrueScan
              //- li(
              //-     @click="jumpTo('http://www.truewallet.net')"
              //-   ) {{ $t(`nav.webwallet`) }}
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
      .container-app-footer
        .container-app-footer-info
          .container-app-footer-links
            p.container-app-footer-text {{ $t('footerLinkDescr') }}
            ul
              //- li(
              //-   @mouseenter="setErweima",
              //-   @mouseleave="setErweima",
              //- )
              //-   span(class="icon font_family icon-weixin")
              //-   transition(name="fade", mode="out-in")
                  span(class="wechatImg " v-show="isWechat")
              li(
                v-for="(item, index) in $t('linksList')",
                :key="index",
                @click="onJump(item.link)",
                :id="item.id"
              )
                span(:class="item.icon")
          .container-app-footer-down
            .container-app-footer-text {{ $t('footerDownDescr') }}
            .container-app-footer-buttons
              app-android
              app-ios
            .container-app-footer-down-ming
              .container-app-footer-text {{$t('footer.miningGuideText')}}
              a.container-app-footer-down-ming-btn(
                v-for="item in $t('footer.mingBtns')",
                :key='item.text',
                tartget='_blank',
                :href="item.link"
              ) {{item.text}}
        .container-app-footer-copyright
          div
            span Copyright ⓒ TRUECHAIN FOUNDATION LTD. All Rights Reserved.
            span {{ $t(`footerContactUs`) }}： partner@truechain.pro
            span sitemap:
              a(href="//www.truechain.pro/sitemap.xml", tartget="_blank")
                span XML
          // div COPYRIGHT© TRUE CHAIN {{$t('copyright') }}

</template>

<script>
import AppAndroid from '~/components/app-android.vue'
import AppIos from '~/components/app-ios.vue'
import { apiGetIpInfo } from '~/api'
import { setStore, getStore } from '~/util'
import baiduAnalyse from '@/middleware/baiduAnalyse'
const indexList = [
  // { path: 'https://github.com/truechain', tag: 'git' },
  // { path: 'http://group.truechain.pro/', tag: 'blog' },
  { path: 'team', tag: 'team' },
  { path: 'news', tag: 'news' },
  { path: 'join', tag: 'join' }
  // { path: 'node', tag: 'node' },
  // { path: 'bugfinder', tag: 'reward' },
]
const langs = [
  { name: '简体中文', tag: 'zh' },
  { name: 'EN', tag: 'en' },
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
    baiduAnalyse()
    const lang = getStore('lang')
    // 初始化根据ip设置语言，不进行本地获取
    if (lang) {
      this.changeLanguage(lang) // 会触发每个页面重新渲染,并无必要
    } else {
      this.setLanguage()
    }
    setTimeout(() => {
      const existEl = document.getElementById('page_stat')
      if (existEl) { document.body.removeChild(existEl) }
      const scriptEl = document.createElement('script')
      scriptEl.type = 'text/javascript'
      scriptEl.id = 'page_stat'
      scriptEl.src = '//s19.cnzz.com/z_stat.php?id=1274893188&web_id=1274893188'
      document.body.appendChild(scriptEl)
    }, 200)
  },
  head () {
    return {
      title: this.$t('home.head.title'),
      meta: [
        { hid: 'home-keyword', name: 'keywords', content: this.$t('home.head.keywords') },
        { hid: 'home-description', name: 'description', content: this.$t('home.head.description') },
        { hid: 'home-googleVer', name: 'google-site-verification', content: this.$t('home.head.googleVer') }
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
      this.changeLanguage('en')
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
    huhu () {
      alert('21323')
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
      if (lang === 'zh' || lang === 'default') {
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
  padding 35px 30px 0 0
  max-width 1200px
  margin auto
.container-app-header-logo
  margin-top 15px
  float left
  cursor pointer
  color white
  .font_family
    color white
    transform scale(4.5)
    margin-left 60px
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
.container-app-footer
  wh(100%, auto)
  padding 50px 20px 0px
  background-color $dark-blue
  fc()
  display flex
  align-items center
  flex-direction column
.container-app-footer-logo
  width 88px
  height 88px
  background-color white
  border-radius 50%
  padding 20px
  fc()
  .font_family
    font-size 60px
    color $font-dark
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
.container-app-footer-info
  display flex
  flex-direction row
  flex-wrap wrap
  justify-content center
  align-items flex-start
  border-bottom 1px solid rgba(250,250,250,0.2)
  font-size 0px
  padding-bottom 0px
.container-app-footer-links
  width auto
  height auto
  border-right 1px solid rgba(250,250,250,0.4)
  padding 10px 80px 0px 0px
  margin-bottom 60px
  ul
    display flex
    margin-top 35px
    min-height 80px
    flex-wrap wrap
    flex-direction row
    justify-content center
    li:first-child
      margin-left 0px
    // li:last-child
    //   margin-right 60px
    li
      margin 10px 15px
      wh(60px, 60px)
      background white
      border-radius 50%
      transition all ease .5s
      position relative
      cursor pointer
      fc()
      .font_family
        color $dark-blue
        transform scale(1.2)
        font-size 30px
      &:hover
        transform scale(1.1)
      .wechatImg
        width 80px
        height 80px
        position absolute
        background url('~@/assets/images/qrcode.png')
        background-size 100% 100%
        top 81px
        left -12px
        z-index 999
        &:after
          content ''
          width 0
          height 0
          position absolute
          top -9px
          left 50%
          transform translateX(-50%)
          border 5px solid
          border-color transparent transparent #fff transparent
.container-app-footer-down
  position relative
  padding 5px 0px 60px 70px
.container-app-footer-buttons
  display flex
  flex-wrap wrap
  justify-content center
  padding-top 5px
  &:before,&:after
    content: " ";
    display: block;
    clear both
  .app-button-box
    height 42px
    margin-top 0px
    float none
    .app-button
      line-height 35px
      display flex
      flex-direction row
      align-items center
      justify-content center
      svg
        margin 0px 8px 0px 0px
  .app-button-qrcode
    div
      wh(80px,80px)
      margin 0px auto
.container-app-footer-down-ming
  text-align left
  .container-app-footer-down-ming-btn
    font-size 15px
    display inline-block
    line-height 35px
    color white
    border-radius 25px
    border 1px solid white
    margin 6px 5px 0px
    padding 0px 12px
.container-app-footer-copyright
  padding-bottom 0px
  span
    color white
    text-align left
    font-size 13px
    line-height 20px
    display inline-block
    padding 15px 20px
.container-app-footer-text
  font-size 20px
  font-weight bold
  line-height 28px
  color white
  display block

@media screen and (max-width 1380px)
  .container-app-footer-links
    border-right none
    padding-right 0px
  .container-app-footer-text
    text-align center
  .container-app-footer-down
    padding-left 0px

@media screen and (max-width 860px)
  .container-app-footer-down-ming
    text-align center
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

a[title=站长统计]
  display none
</style>
