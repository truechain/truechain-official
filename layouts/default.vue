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
      .container-app-footer
        .container-app-footer-logo
          i(class="icon font_family icon-logo1")
          // img(src="~@/assets/images/logo_bot.png")
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

        .container-app-footer-copyright
          div COPYRIGHT© TRUE CHAIN {{$t('copyright')}}
</template>

<script>

const indexList = [
  // { path: 'https://github.com/truechain', tag: 'git' },
  // { path: 'http://group.truechain.pro/', tag: 'blog' },
  { path: 'team', tag: 'team' },
  { path: 'news', tag: 'news' },
  { path: 'join', tag: 'join' },
  { path: 'node', tag: 'node' }
]
const langs = [
  { name: '简体中文', tag: 'sc' },
  { name: 'EN', tag: 'en' },
  // { name: '한국어', tag: 'ko' },
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
   head() {
    return {
      title: this.$t('home.head.title'),
      meta: [
        { hid: 'home-keyword', name: 'keyword', content: this.$t('home.head.keyword') },
        { hid: 'home-description', name: 'description', content: this.$t('home.head.description') },
      ]
    }
  },
  data () {
    return {
      indexList,
      langs,
      menuIsOpen: false,
      linksList,
      langsSelectorIsOpen: false,
      usedLangNum: 0,
      isWechat: false
    }
  },
  methods: {
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
      const { $route:{ fullPath }, $router, $store } = this;
      if($store.state.locale === 'en') {
        $router.push(`/sc${fullPath}`)
      } else {
        $router.push(fullPath.replace(/^\/[^\/]+/, ''))
      }
    }, */
    changeLanguage (lang) {

      if(this.$store.state.locale === lang) return

      const { $route:{ fullPath, params }, $router } = this;
      const path = fullPath.split(`/${params.lang}`).join('');

      if(lang === 'en') {
        $router.push(fullPath.replace(/^\/[^\/]+/, ''))
      } else {
        $router.push(`/${lang}${ path }`)
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
.container-app-header
  padding 35px
  mw()
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
  padding 20px 0 40px
  ul
    display flex
    li
      margin 0 15px
      wh(30px, 30px)
      background white
      border-radius 50%
      transition all ease 1s
      position relative
      cursor pointer
      fc()
      .font_family
        color $dark-blue
        transform scale(1.2)
      &:hover
        transform rotateY(360deg)
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
</style>
