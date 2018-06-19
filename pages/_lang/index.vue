<template lang="pug">
div
  .loop-header
    #particles-js
    Carousel(
      class="loop-container",
      v-model="value1"
      arrow="always"
    )
      CarouselItem
        div(class="demo-carousel banner-home")
          .banner-home-logo
            i(class="icon font_family icon-logo")
          .banner-home-slogan
            span {{ $t('home.slogan') }}
          .banner-home-buttons
            a(href="https://github.com/truechain",target="_blank") GITHUB
            a(href="https://www.truechain.pro/EnTruechain.pdf",target="_blank") {{ $t('home.white') }}
            a(href="https://arxiv.org/pdf/1805.01457.pdf",target="_blank") {{ $t('home.yellow') }}
      CarouselItem
        div(class="demo-carousel banner-home")
          .banner-home-logo
            i(class="icon font_family icon-logo")
          .banner-home-slogan
            span PUBLIC BLOCKCHAIN WITH HYBRID CONSENSUS
          .banner-home-buttons
            a(href="https://github.com/truechain",target="_blank") GITHUB
            a(href="https://www.truechain.pro/EnTruechain.pdf",target="_blank") WHITE PAPER
            a(href="https://arxiv.org/pdf/1805.01457.pdf",target="_blank") YELLOW PAPER
      CarouselItem
        div(class="demo-carousel banner-home")
          .banner-home-logo
            i(class="icon font_family icon-logo")
          .banner-home-slogan
            span PUBLIC BLOCKCHAIN WITH HYBRID CONSENSUS
          .banner-home-buttons
            a(href="https://github.com/truechain",target="_blank") GITHUB
            a(href="https://www.truechain.pro/EnTruechain.pdf",target="_blank") WHITE PAPER
            a(href="https://arxiv.org/pdf/1805.01457.pdf",target="_blank") YELLOW PAPER

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
        p {{ $t('home.about.p1') }}
        p {{ $t('home.about.p2') }}
        p {{ $t('home.about.p3') }}
        p {{ $t('home.about.p4') }}
      .col3
        .co
          img(src="~assets/images/h1.png")
        .co
          img(src="~assets/images/h2.png")
        .co
          img(src="~assets/images/h3.png")

  .home-roadmap
    .page-title {{ $t('home.roadmap.title') }}
    .time-line-con
      .start-point
      .time-line-block(
        v-for="(item,index) in $t('home.roadmap.list') "
      )
        .lf
          .even(v-if="index%2==0")
            .time {{item.time}}
          .odd(v-if="index%2>0")
            .link-bk
            .link-dot-big
            .link-dot-sm
            .bk
              .entry-txt(
                v-for="(txt, index) in item.events",
                :key="index"
              )
                .dot
                .txt {{txt}}
        .ri
          .even(v-if="index%2==0")
            .link-bk
            .link-dot-big
            .link-dot-sm
            .bk
              .entry-txt(
                v-for="(txt, index) in item.events",
                :key="index"
              )
                .dot
                .txt {{txt}}
          .odd(v-if="index%2>0")
            .time {{item.time}}


  .home-partner
    .page-title {{ $t('partner.title') }}
    .con
      .co(
          v-for="index in 5",
      )
        img(:src="require(`@/assets/images/p-logo${index}.png`)")

  .home-investment
    .page-title {{ $t('home.partner') }}
    .con
      .co(
          v-for="index in 4",
        )
          img(:src="require(`@/assets/images/partner${index}.png`)")
  .home-news
    .page-title {{ $t('home.news.title') }}
    .con
      .co(
        v-for="(item,i) in $t('home.news.list')"
      )
        .vid(@click='showmod(i)')
          img(
            v-if="i==0"
            src="/m1.png"
          )
          img(
            v-if="i==1"
            src="/m2.png"
          )
          img(
            v-if="i==2"
            src="/m3.png"
          )
          .vid-mask
        .time {{ item.time }}
        .descr {{ item.title }}
    // video(:src="current_video",style="width:600px;height:auto;",controls="controls")

  Modal(
    v-model="modalvid"
    class-name="vertical-center-modal"
    @on-visible-change="changedmodal"
    :width="700"
  )
    <d-player :options="dplayer_opts" ref="dplayer"></d-player>

</template>


<script>
import AppAndroid from '~/components/app-android.vue'
import AppIos from '~/components/app-ios.vue'



export default {
  asyncData ({ req }) {
    return {
      name: req ? 'server' : 'client',
      current_video:'/m1.mp4',
      vids:[
        '/m1.mp4',
        '/m2.mp4',
        '/m3.mp4'
      ],
      modalvid:false,
      dplayer_opts:{
        video: {
          url: '/m1.mp4',
          pic: '/m1.png'
        },
        autoplay: false,
        contextmenu: [],
        player:null
      }
    }
  },
  data () {
    return {
      value1: 0
    }
  },
  mounted () {
    this.player = this.$refs.dplayer.dp;
    particlesJS('particles-js', liziconf);
  },
  head: {
    script: [
      { src: '/particles.min.js' },
      { src: '/donglizi.js' }
    ],
  },
  components: {
    AppAndroid,
    AppIos
  },
  methods: {
    showmod (vind) {
      this.modalvid = true;
      this.current_video = this.vids[vind];
      this.player.switchVideo({
        url: this.current_video
      });
    },
    hidemod () {
      this.$modal.hide('vidmod');
    },
    changedmodal(sts){
      if(!sts){
        //false:模态框关闭 true:模态框打开  关闭播放模态框时暂停视频播放
        this.player.pause();
      }
    }
  }
}
</script>



<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'

.vertical-center-modal
  display: flex
  align-items: center
  justify-content: center
  .ivu-modal
    top: 0px
.ivu-modal-footer
.ivu-modal-close
  display none
.ivu-modal-body
  padding 0px

.dplayer-icon
  .dplayer-icon-content
    wh(100%,100%)

.ivu-carousel-dots
  margin-bottom 10px
.ivu-carousel
  .ivu-carousel-arrow.left
    left 100px
  .ivu-carousel-arrow.right
    right 100px
  .ivu-carousel-arrow
    transform scale(1.5)
    background ''
    .ivu-icon
      color white
.loop-header
  wh(100%,500px)
  position relative
  .loop-container
    wh(100%,500px)
    .demo-carousel
      display flex
      align-items center
      wh(100%, 500px)
      margin-top 80px
    .banner-home
      display flex
      flex-direction column
      div
        span
          color white
      .banner-home-logo
        .icon-logo
          color white
          font-size 160px
      .banner-home-slogan
        font-size 30px
        margin 30px 0
        font-weight bold
        position relative
        &:after
          content ''
          wh(100px, 4px)
          background white
          position absolute
          bottom -20px
          left 50%
          transform translateX(-50%)
          border-radius 2px
      .banner-home-buttons
        margin-top 40px
        a
          padding 10px 20px
          border 1px solid white
          margin 0 10px
          border-radius 25px
          cursor pointer
          transition background .5s ease
          color white
          width 178px
          text-align center
          display inline-block
          &:hover
            background rgba(255, 255, 255, .8)
            color $dark-blue
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
    txtwrap()
    padding 0px 10px
  .txt
    line-height 24px
    font-size 12px
    color $font-grey
    text-align left
  .co
    width 240px
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
    width 630px
    display flex
    flex-direction row
    flex-wrap nowrap
    justify-content space-between
    align-items flex-start
    .co
      width 180px
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
    flex-wrap nowrap
    justify-content space-around
    align-items flex-start
    max-width 1024px
    margin 46px auto 0px
    .co
      wh(142px,80px)
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
    flex-wrap nowrap
    justify-content center
    align-items flex-start
    max-width 1024px
    margin 46px auto 0px
    .co
      wh(160px,72px)
      border 1px solid #C5D6F6
      border-radius 5px
      padding 3px
      margin 10px
      img
        wh(100%,100%)

.home-news
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
    flex-wrap nowrap
    justify-content space-around
    align-items flex-start
    max-width 1024px
    margin 46px auto 0px
    .co
      width 300px
      .vid
        wh(100%,155px)
        background-color #eee
        border-radius 8px
        position relative
        z-index 190
        .vid-mask
          position absolute
          z-index 201
          top 0px
          left 0px
          width 100%
          height 100%
      .vid:hover
        .vid-mask
          background-color rgba(0,0,0,0.3)
      .time
        color $font-light
        font-size 13px
        line-height 30px
      .descr
        font-size 16px
        color $font-dark
        line-height 20px



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
  .time-line-con
    width 630px
    margin 46px auto 0px
    .start-point
      dot(8px)
      background-color $font-dark
      margin 0px auto
      position relative
      z-index 200
      left -1.2px
    .time-line-block
      display flex
      flex-direction row
      flex-wrap: nowrap
      justify-content space-between
      align-items stretch
      font-size 0px
      .lf,.ri
        width 50%
        padding 20px
        box-sizing border-box
        font-size 14px
        txtwrap()
        position relative
        z-index 200
      .lf
        border-right 2px solid $font-dark
        .time
          text-align right
        .link-bk
          background-color $font-dark
          wh(20px,2px)
          position absolute
          z-index 200
          top 54px
          right 0px
        .link-dot-big
          dot(18px)
          background-color #C5D6F6
          position absolute
          z-index 190
          top 46px
          right -10px
        .link-dot-sm
          dot(10px)
          background-color $font-dark
          position absolute
          z-index 200
          top 50px
          right -6px
      .ri
        .link-bk
          background-color $font-dark
          wh(20px,2px)
          position absolute
          z-index 200
          top 53px
          left 0px
        .link-dot-big
          dot(18px)
          background-color #C5D6F6
          position absolute
          z-index 190
          top 46px
          left -10px
        .link-dot-sm
          dot(10px)
          background-color $font-dark
          position absolute
          z-index 200
          top 50px
          left -6px
      .time
        color $font-dark
        margin-top 20px
        line-height 30px
      .bk
        background-color $font-dark
        padding 10px 20px 10px 8px
        color white
        border-radius 6px
        .entry-txt
          display flex
          flex-direction row
          flex-wrap nowrap
          justify-content flex-start
          align-items flex-start
          .dot
            flex-shrink 0
            background-color white
            dot(8px)
            margin 10px 10px 0px 10px
          .txt
            color white
            line-height 26px
    .time-line-block:last-child
      .lf,.ri
        padding-bottom 80px




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

@media screen and (max-width 1024px)
  .home-introduce-details-text
    position static
    transform translate3d(0, 0, 0)
  .home-introduce-details-image
    position static
    height 55vw
    max-height 240px
    margin 20px auto
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
</style>
