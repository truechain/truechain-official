<template lang="pug">
.home
  .loop-header
    #particles-js
    Carousel(
      class="loop-container",
      v-model="homeCarouse",
      :arrow="homeConfig.arrow",
      :dots="homeConfig.dots"
    )
      CarouselItem
        div(class="demo-carousel banner-home")
          .banner-home-logo
            i(class="icon font_family icon-logo")
          .banner-home-slogan
            div {{ $t('home.slogan') }}
            div {{ $t('home.slogan1') }}
            span(v-if="$store.state.locale === 'en'") No Cliche, Leading Tech, Workable Chain
          .banner-home-buttons
            a(href="https://github.com/truechain",target="_blank") GITHUB
            a(:href="$t('home.yellowLink')",target="_blank") {{ $t('home.yellow') }}
            a(:href="$t('home.whiteLink')",target="_blank") {{ $t('home.white') }}
            a(href="https://github.com/truechain/truechain-engineering-code",target="_blank") {{ $t('home.mainNet') }}
      //- CarouselItem
      //-   .banner2
      //-     img.telpic(src="~assets/images/home-banner2.png")
      //-     .ri
      //-       p.title {{ $t('home.banner2.title') }}
      //-       p.line1 {{ $t('home.banner2.line1') }}
      //-       p.line2 {{ $t('home.banner2.line2') }}
      //-       .down
      //-         app-android
      //-         app-ios
      //- CarouselItem
      //-   .banner3-bg
      //-     img(src="~assets/images/home-banner3bg.jpg")
      //-   .banner3
      //-     .lf
      //-       i(class="icon font_family icon-logo1")
      //-       p.title {{ $t('home.banner3.title') }}
      //-       p.line1 {{ $t('home.banner3.line1') }}
      //-       p.line2 {{ $t('home.banner3.line2') }}
      //-       .node-detail(@click="$router.push('node')") {{ $t('home.banner3.btntext') }}
      //-     .ri
      //-       img(src="~assets/images/home-banner3.png")
    //- .home-sign-up
    //-   span
    //-     span(class="icon font_family icon-tongzhi")
    //-     span
    //-       a(href="http://trueglobal.pro/",target="_blank") &nbsp;&nbsp;“HelloEarth”--2018区块链应用落地大赛开始报名了!
  .home-intro-3col
    .col3-con
      .co(
        v-for="(item, index) in $t('home.superiority')"
        :key="index"
      )
          i(:class="item.icon")
          h4 {{ item.title }}
          p.txt {{ item.detail }}

  .home-about
    .page-title {{ $t('home.about.title') }}
    .con
      .title {{ $t('home.about.subhead') }}
      .descr
        p(v-for="item in $t('home.about.contentList')") {{ item }}
      .col3(v-if="$store.state.locale === 'zh'")
        .co
          img(src="~assets/images/h1.png")
        .co
          img(src="~assets/images/h2.png")
        .co
          img(src="~assets/images/h3.png")

  .home-roadmap
    .page-title {{ $t('home.roadmap.title') }}
    .only-on-pc
      RoadMap
    .only-on-mobile
      RoadMapMobile
  .home-partner
    .page-title {{ $t('home.partner') }}
    .con
      .co(
          v-for="index in 7",
      )
        img(:src="require(`@/assets/images/p-logo${index}.png`)")
  .home-investment
    .page-title {{ $t('home.institution') }}
    .con
      .co(
          v-for="index in 6",
        )
          img(:src="require(`@/assets/images/partner${index}.png`)")
  .home-investment(v-if="$i18n.locale !== 'zh'")
    .page-title {{ $t('home.exchanges') }}
    .con
      .co(
          v-for="name in exchanges",
        )
          img(:src="`https://qiniu.truescan.net/exchange/${name}.png`")
  .home-news
    .page-title {{ $t('home.adVideoTitle') }}
    .ad-video-con
      no-ssr(placeholder="Loading...")
        d-player(:options="dplayerOpts" ref="dplayer")
  .home-float(@click="toggleNoticeModal()")
  Modal(v-model="modal2" width="600")
    div
      div
        i(class="icon font_family icon-guanbi" @click="modal2 = false")
      div
        div
          img(src="@/assets/images/happy.jpg")
  //- transition(name="fade")
  //-   .home-sea-modal(@click="toggleDiscoveryModal(false)", v-show="showDiscoveryModal")
  //-     img(
  //-       src="~assets/images/discovery.png",
  //-       @click="$router.push('discovery')"
  //-     )
  transition(name="fade")
    .home-notice-modal(v-show="showNotice")
      div
        div.close(@click="toggleNoticeModal(false)")
        div.title {{ $t('notice.title') }}
        div.context
          span {{ $t('notice.pre') }}
          p(
            v-for="(text, index) in $t('notice.content')"
            :key="index"
          ) {{ text }}
          a(
            class="docs"
            href="https://qiniu.truescan.net/wallet/pdf/exchange.pdf"
            target="_blank"
          ) {{ $t('notice.link') }}
          //- span.address {{ $t('notice.contract') }} 0xA4d17AB1eE0efDD23edc2869E7BA96B89eEcf9AB
          span.address {{ $t('notice.address') }} 0x6AC371048903B76B6D969c575Bc9d9bf28139B76
          span.qrcode {{ $t('notice.qrcode') }}
            img(src="@/assets/images/exchangeQR_true.png")
          span {{ $t('notice.app') }}
            a(href="https://dapp.truedapp.net/appdown/" target="_blank") https://dapp.truedapp.net/appdown/
          span {{ $t('notice.safety') }}
</template>

<script>
import AppAndroid from '~/components/app-android.vue'
import AppIos from '~/components/app-ios.vue'
import liziConfig from '~/config/donglizi'
import { setStore, getStore } from '~/util'

import RoadMap from '~/components/RoadMap'
import RoadMapMobile from '~/components/RoadMapMobile'

const exchanges = [
  'bn', 'okex', 'zb', 'bithumb', 'bw', 'hitbtc'
]

export default {
  asyncData ({ req }) {
    return {
      name: req ? 'server' : 'client',
      vids: [
        '/m1.mp4',
        '/m2.mp4',
        '/m3.mp4'
      ],
      modalvid: false,
      dplayerOpts: {
        video: {
          // url: '/m1.mp4'
          url: ''
        },
        autoplay: false,
        contextmenu: [],
        player: null
      },
      exchanges
    }
  },
  data () {
    return {
      modal2: false,
      value1: 0,
      homeCarouse: 0,
      homeConfig: {
        dots: 'inside',
        arrow: 'hover'
      },
      showDiscoveryModal: false,
      showNotice: false
    }
  },
  mounted () {
    const stopTime = 1546617600000
    // debugger
    if (+new Date() < stopTime) {
      const isShowHappy = getStore('isShowHappy')
      if (!isShowHappy) {
        this.modal2 = true
        setStore('isShowHappy', 'true')
      }
    }
    if (window.particlesJS) {
      window.particlesJS('particles-js', liziConfig)
    } else {
      setTimeout(() => {
        window.particlesJS('particles-js', liziConfig)
      }, 500)
    }
    setTimeout(() => {
      if (!sessionStorage.seenDiscoveryModal) {
        this.toggleDiscoveryModal(true)
      }
      // if (!sessionStorage.showNotice) {
      //   this.toggleNoticeModal(true)
      // }
    }, 500)
    this.$nextTick(x => {
      this.player = this.$refs.dplayer.dp
      if (window.screen.availWidth < 436) {
        this.homeConfig = {
          dots: 'none',
          arrow: 'never'
        }
      }
    })
    setTimeout(() => {
      const locale = this.$store.state.locale
      let videoUrl = 'https://qiniu.truescan.net/video/ad-zh.mp4'
      if (locale == 'ko') {
        videoUrl = 'https://qiniu.truescan.net/video/ad-ko.mp4'
      }
      if (locale == 'vn') {
        videoUrl = 'https://qiniu.truescan.net/video/ad-vn.mp4'
      }
      this.player.switchVideo({
        url: videoUrl
      })
    }, 300)
  },
  head: {
    script: [
      { src: '/particles.min.js' }
    ]
  },
  components: {
    AppAndroid,
    AppIos,
    RoadMap,
    RoadMapMobile
  },
  methods: {
    showmod (vind) {
      this.modalvid = true
      this.player.switchVideo({
        url: this.vids[vind]
      })
      this.player.play()
    },
    toggleDiscoveryModal (isShow) {
      this.showDiscoveryModal = isShow
      if (!isShow) {
        sessionStorage.seenDiscoveryModal = true
      }
    },
    toggleNoticeModal (isShow) {
      // this.showNotice = isShow
      // if (!isShow) {
      //   sessionStorage.showNotice = true
      // }
      this.showNotice = !this.showNotice
      if (!isShow) {
        sessionStorage.showNotice = true
      }
    },
    changedmodal (sts) {
      if (!sts) {
        // false:模态框关闭 true:模态框打开  关闭播放模态框时暂停视频播放
        this.player.pause()
      }
    }
  }
}
</script>

<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'
@media screen and (max-width 400px)
  .banner-home-slogan
    margin-top 40px !important
    div
      line-height 30px !important
  .banner-home-buttons
    a
      min-width auto !important
      margin-bottom 15px !important
  .home-sign-up
    a
      font-size 12px !important

.loop-header
  wh(100%,500px)
  position relative
  z-index 100
  .loop-container
    wh(100%,500px)
    .demo-carousel
      display flex
      align-items center
      wh(100%, 500px)
      margin-top 30px
    .banner-home
      position relative
      display flex
      flex-direction column
      justify-content center
      padding-bottom 90px
      padding-left 20px
      padding-right 20px
      div
        span
          color white
      .banner-home-logo
        position absolute
        top 0
        left 0px
        right 0px
        text-align center
        .icon-logo
          color white
          font-size 140px
      .banner-home-slogan
        font-size 30px
        margin-top 100px
        font-weight bold
        text-align center
        div
          color white
          line-height 50px
          font-size 26px
        span
          color #dfe0e5
          font-size 22px
          margin-top 20px
          font-weight normal
      .banner-home-buttons
        position absolute
        bottom 80px
        left 0px
        right 0px
        text-align center
        a
          padding 11px 20px
          line-height 20px
          border 1px solid white
          margin 0 10px
          border-radius 25px
          cursor pointer
          transition background .5s ease
          color white
          min-width 178px
          text-align center
          display inline-block
          &:hover
            background white
            color $dark-blue
    .banner2
      display flex
      flex-direction row
      flex-wrap wrap
      justify-content center
      align-items flex-start
      max-width 1024px
      margin 0px auto
      text-align center
      color white
      font-color white
      overflow hidden
      height 500px
      padding-top 60px
      .telpic
        width 420px
        height auto
      .ri
        padding 80px 0px 20px 30px
        text-align left
        .app-button-box
          margin-top 35px
          line-height 42px
        .app-button
          line-height 42px
          span
            margin-left 10px
          svg
            width 25px
            height 42px
            margin 0px
        .app-button-qrcode
          img
            wh(100%,100%)
          div
            wh(100px,100px)
            margin 0px auto
      .title
        font-size 36px
        line-height 72px
        color white
      .line1
      .line2
        color white
        font-size 16px
        line-height 26px
      .line1
        margin-top 15px
    .banner3-bg
      position absolute
      z-index 205
      max-height 500px
      overflow hidden
    .banner3
      position relative
      z-index 210
      left 0px
      right 0px
      display flex
      flex-direction row
      flex-wrap wrap
      justify-content center
      align-items flex-start
      max-width 1024px
      margin 0px auto
      text-align center
      color white
      font-color white
      padding 100px 0px 0px
      .node-detai
      .lf
        padding-right 100px
        .icon-logo1
          font-size 60px
          color white
        .title
          color white
          font-size 40px
          line-height 42px
          margin 25px
        .line1
        .line2
          color white
          font-size 16px
          line-height 30px
        .node-detail
          display inline-block
          border 1px solid white
          border-radius 28px
          padding 10px 25px
          color white
          font-size 14px
          line-height 22px
          width 150px
          margin-top 30px
          transition background .5s ease
          &:hover
            background: white
            color: $dark-blue
      .ri
        img
          width 280px
          height auto

#particles-js
  background-color $dark-blue
  position absolute
  top 0
  left 0
  right 0
  bottom 0
.home-intro-3col
  padding 0px 20px 100px
  .col3-con
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content space-between
    align-items flex-start
    max-width 1024px
    margin 0px auto
    text-align center
  .icon
    font-size 68px
    margin 75px auto 28px
    color $font-dark
  h4
    line-height 28px
    font-size 18px
    font-weight 600
    color $font-dark
    margin 0px auto 20px
    padding 0px 10px
  .txt
    line-height 24px
    font-size 12px
    color $font-grey
    text-align left
  .co
    width 280px
    color $font-dark

.home-about
  padding 100px 20px 80px
  background-color $bg-pearlblue
  .con
    max-width 1024px
    margin 46px auto 0px
  h3
    color $font-dark
    text-align center
    font-size 26px
    font-weight 800
    line-height 30px
    text-transform uppercase
  hr
    background-color $font-dark
    border none
    display block
    margin 24px auto 54px
    wh(60px, 4px)
    border-radius 2px
  .title
    color $font-dark
    font-size 20px
    line-height 36px
    margin-bottom 20px
    font-weight 600
  .descr
    font-size 13px
    color $font-grey
    font-color $font-grey
    line-height 24px
    p
      margin-bottom 24px
      color $font-grey
      font-color $font-grey
  .col3
    margin 38px auto
    max-width 630px
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content center
    align-items flex-start
    .co
      width 210px
      padding 10px 15px
      img
        width 100%
        height auto
        border-radius 5px

.home-partner
  padding 100px 20px 80px
  background-color $bg-pearlblue
  h3
    color $font-dark
    text-align center
    font-size 26px
    font-weight bold
    line-height 30px
    text-transform uppercase
  hr
    background-color $font-dark
    border none
    display block
    margin 24px auto 54px
    wh(60px, 4px)
    border-radius 2px
  .con
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content center
    align-items flex-start
    max-width 800px
    margin 46px auto 0px
    .co
      wh(220px, 126px)
      padding 10px 15px
      img
        wh(100%,100%)
        border-radius 5px

.home-investment
  padding 100px 20px 80px
  background-color white
  h3
    color $font-dark
    text-align center
    font-size 26px
    font-weight bold
    line-height 30px
    text-transform uppercase
  hr
    background-color $font-dark
    border none
    display block
    margin 24px auto 54px
    wh(60px, 4px)
    border-radius 2px
  .con
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content center
    align-items flex-start
    max-width 800px
    margin 46px auto 0px
    .co
      wh(192px, 108px)
      border 1px solid #C5D6F6
      border-radius 5px
      padding 0px
      margin 10px 15px
      img
        wh(100%,100%)
        border-radius 6px

.home-news
  padding 100px 20px 80px
  background-color $bg-pearlblue
  .ad-video-con
    max-width 800px
    margin 46px auto 0px
  h3
    color $font-dark
    text-align center
    font-size 26px
    font-weight bold
    line-height 30px
    text-transform uppercase
  hr
    background-color $font-dark
    border none
    display block
    margin 24px auto 54px
    wh(60px, 4px)
    border-radius 2px
  .con
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content space-around
    align-items flex-start
    max-width 1024px
    margin 46px auto 0px
    .co
      width 300px
      padding 10px 15px
      .vid
        wh(100%,155px)
        background-color #eee
        border-radius 8px
        overflow hidden
        position relative
        z-index 190
        text-align center
        .pic
          wh(100%,100%)
        .playicon
          position relative
          z-index 205
          top -106px
          left 0px
          display inline-block
          wh(50px,auto)
        .vid-mask
          position absolute
          z-index 201
          top 0px
          left 0px
          width 100%
          height 100%
          transition all 0.5s
          background-color rgba(0,0,0,0.3)
      .vid:hover
        .vid-mask
          background-color rgba(0,0,0,0.0)
      .time
        color $font-light
        font-size 13px
        line-height 30px
      .descr
        font-size 16px
        color $font-dark
        line-height 20px
        margin-top 15px
.home-float
  position fixed
  right 2%
  bottom 5%
  width 100px
  height 100px
  background-repeat no-repeat
  background-image url("~@/assets/images/exchange.png")

.home-roadmap
  background-color white
  padding 100px 20px 0px
  h3
    color $font-dark
    text-align center
    font-size 26px
    font-weight bold
    line-height 30px
    text-transform uppercase
  hr
    background-color $font-dark
    border none
    display block
    margin 24px auto 54px
    wh(60px, 4px)
    border-radius 2px

.home-introduce-banner
  overflow hidden
  height 560px
  background-color $dark-blue
  background-image url("~@/assets/images/banner.jpg")
  background-position 50%
  background-repeat no-repeat
.home-introduce-banner-text
  transform translate3d(50%, 150px, 0)
  h1
    letter-spacing 0.05em
    font-size 40px
    line-height 40px
    margin-bottom 30px
    font-weight bold
    color #FFF
  p
    font-size 18px
    line-height 30px
    color #FFF

.home-introduce-intro
  padding 100px 0
  min-height 540px
  background-color $background
  .home-introduce-intro-text
    max-width 1200px
    padding 0 20px
    margin auto
  h2
    color $font-dark
    text-align center
    font-size 26px
    font-weight bold
    line-height 30px
    text-transform uppercase
  hr
    background-color $font-dark
    border none
    display block
    margin 24px auto 54px
    wh(60px, 2px)
  p
    color #627792
    font-size 14px
    line-height 24px
.home-introduce-details
  background-color #FFF
  li
    background-color $dark-blue
    fc()
    >div
      position relative
      width 100%
      min-height 540px
      &:first-child
        background-color #FFF
  li:nth-child(odd)
    flex-direction row-reverse
    .home-introduce-details-text
      left 30px
    .home-introduce-details-image
      right 40px
  li:nth-child(even)
    .home-introduce-details-text
      right 30px
    .home-introduce-details-image
      left 40px
.home-introduce-details-text
  max-width 540px
  position absolute
  top 50%
  transform translate3d(0, -50%, 0)
  padding 30px 20px
  margin auto
  hr
    background-color $font-dark
    border none
    display block
    wh(60px, 2px)
  h3
    font-size 24px
    font-weight bold
    color $font-dark
    line-height 36px
    margin 20px auto
  p
    font-size 14px
    color $font-light
    line-height 24px
    min-height 24px
.home-introduce-details-image
  position absolute
  top 60px
  background-repeat no-repeat
  max-width 80%
  background-size contain
  background-position center
  wh(640px, 440px)

.home-introduce-news
  height 182px
  overflow hidden
  position relative
  li
    position absolute
  h3
    font-size 24px
    font-weight bold
    color $font-dark
    line-height 36px
    margin-bottom 10px
  p
    font-size 16px
    line-height 34px
.home-introduce-news-index
  margin-top 44px
  fc()
  li
    background-color #c2d6eb
    border-radius 2px
    margin 0 5px
    overflow hidden
    position relative
    cursor pointer
    wh(30px, 4px)
    span
      position absolute
      background-color $font-dark
      transition transform .4s
      wh(40px, 100%)
.fade-enter-active, .fade-leave-active
  transition opacity .4s
.fade-enter, .fade-leave-to
  opacity 0

.home-introduce-partner
  min-height auto
  background-color #FFF
  ul
    fc()
  li
    border solid 1px $font-dark
    margin 0 20px
    wh(300px, 120px)

.home-sea-modal
  position fixed
  z-index 1100
  top 0
  left 0
  text-align center
  width 100%
  height 100vh
  display flex
  justify-content center
  align-items center
  background-color #000b
  img
    width 520px
    max-width 90vw
    height auto
    cursor pointer

.home-notice-modal
  position fixed
  z-index 1100
  top 0
  left 0
  text-align center
  width 100%
  height 100vh
  display flex
  justify-content center
  align-items center
  background-color #000b
  >div
    width 620px
    max-width 90%
    max-height 80vh
    border 2px solid #fff
    border-radius 10px
    padding 40px 24px 24px
    background-color #32126f
    background-image url('~@/assets/images/notice.png')
    background-size cover
    position relative
    text-align left
    font-size 12px
    line-height 24px
  .title
    width 300px
    height 60px
    border-radius 6px
    background-color #402a92
    font-size 20px
    color #ffffff
    font-weight 500
    display flex
    justify-content center
    align-items center
    position absolute
    left 50%
    top 0
    transform translate3d(-50%, -50%, 0)
  .context
    max-height 70vh
    overflow scroll
  .close
    width 20px
    height 20px
    border-radius 10px
    border solid 1px #fff
    position absolute
    top -18px
    right -22px
    cursor pointer
    &:after
      content ''
      height 1px
      width 14px
      background-color #fff
      position absolute
      top 50%
      left 50%
      transform translate3d(-50%, -50%, 0) rotate(45deg)
    &:before
      content ''
      height 1px
      width 14px
      background-color #fff
      position absolute
      top 50%
      left 50%
      transform translate3d(-50%, -50%, 0) rotate(-45deg)
  span
    color #fff
    display block
  p
    color #fff
    text-indent 2em
  a
    color #ffd939
    text-decoration underline
    display inline
  .docs
    margin 10px 0
    display block
  .qrcode
    margin 10px 0
    img
      width 100px
      height 100px
      vertical-align text-top
      border solid 4px #fff
      border-radius 6px

@media screen and (max-width 1024px)
  .home-intro-3col
    .col3-con
      justify-content center
  .home-introduce-details-text
    position static
    transform translate3d(0, 0, 0)
  .home-introduce-details-image
    position static
    height 55vw
    max-height 240px
    margin 20px auto
  .banner-home-slogan
    padding 0 20px
    div
      font-size 17px !important
    span
      display none
  .banner-home-buttons
    a
      width auto !important
      font-size 11px !important
      line-height 16px !important
      padding 10px 15px !important
  .home-introduce-details
    li
      flex-direction column-reverse !important
      >div:last-child
        min-height auto
  .home-introduce-partner
    ul
      flex-direction column
      li
        margin 20px 0

@media screen and (max-width 700px)
  .only-on-pc
    display none
@media screen and (min-width 700px)
  .only-on-mobile
    display none
</style>
