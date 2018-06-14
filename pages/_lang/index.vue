<template lang="pug">
  div
    .home-introduce-banner
      .home-introduce-banner-text
        h1 {{ $t('banner.title') }}
        p(
          v-html="$t('banner.p1')"
        )
        p {{ $t('banner.p2') }}
        app-ios
        app-android
    
    #lizibg.home-banner
    .home-intro-3col
      .col3-con
        .co.col-1
            i(class="icon font_family icon-te")
            h4 {{ $t('homeintro[0].title') }}
            p.txt {{ $t('homeintro[0].text') }}
        .co.col-2
            i(class="icon font_family icon-te1")
            h4 {{ $t('homeintro[1].title') }}
            p.txt {{ $t('homeintro[1].text') }}
        .co.col-3
            i(class="icon font_family icon-te2")
            h4 {{ $t('homeintro[2].title') }}
            p.txt {{ $t('homeintro[2].text') }}
    .home-about
      .con
        h3 {{ $t('homeabout.h3') }}
        hr
        .title {{ $t('homeabout.title') }}
        .descr
          p {{ $t('homeabout.p1') }}
          p {{ $t('homeabout.p2') }}
          p {{ $t('homeabout.p3') }}
          p {{ $t('homeabout.p4') }}
        .col3
          .co
            img(src="~assets/images/h1.png")
          .co
            img(src="~assets/images/h2.png")
          .co
            img(src="~assets/images/h3.png")
    .home-roadmap
      h3 {{ $t('roadmap') }}
      hr
      .time-line-con
        .start-point
        .time-line-block
          .lf
            .time 2018-06-12
          .ri
            .link-bk
            .link-dot-big
            .link-dot-sm
            .bk
              .entry-txt
                .dot
                .txt heeeheeeheeeheeeheeeheeeheeeheee
              .entry-txt
                .dot
                .txt heeeheeeh
        .time-line-block
          .lf
            .link-bk
            .link-dot-big
            .link-dot-sm
            .bk
              .entry-txt
                .dot
                .txt heeeheeeheeeheeeheeeheeeheeeheeeheeeheeeheeeheeeheeeheeeheeeheeeheeeheeeheeeheeeheeeheeeheeeheee
          .ri
            .time 2018-06-12

    .home-partner
    .home-introduce-intro
      .home-introduce-intro-text
        h2 {{ $t('name') }}
        hr
        p {{ $t('intro.p1') }}
        p {{ $t('intro.p2') }}
        p {{ $t('intro.p3') }}
    ul.home-introduce-details
      li(
        v-for="n in 4"
        :key="n"
      )
        div
          .home-introduce-details-text
            hr
            h3 {{ $t(`details.${n - 1}.title`) }}
            p(
              v-for="(para, index) in $t(`details.${n - 1}.para`).split('|')"
              :key="index"
            ) {{para}}
        div
          .home-introduce-details-image(
            :style="{'background-image': `url(${require(`@/assets/images/pic${n - 1}.jpg`)})`}"
          )
    .home-introduce-intro(style="min-height: 80px !important; padding: 50px;")
      .home-introduce-intro-text
        h2 {{ $t('news.title') }}
        hr
        transition-group.home-introduce-news(
          name="fade"
          mode="out-in"
          tag="ul"
        )
          li(
            v-for="n in 2"
            :key="n"
            v-if="focus === n"
          )
            a(
              target="_blank"
              :href="$t(`news.details.${n - 1}.path`)"
            )
              h3 {{ $t(`news.details.${n - 1}.title`) }}
            p(
              v-for="(para, index) in $t(`news.details.${n - 1}.intro`).split('|')"
              :key="index"
            ) {{para}}
        ul.home-introduce-news-index
          li(
            v-for="n in 2"
            :key="n"
            @click="focusNewsTo(n)"
          )
            span(
              :style="{'transform': `translateX(${(focus - n) * 40}px)`}"
            )
    //- .home-introduce-intro.home-introduce-partner
    //-   .home-introduce-intro-text
    //-     h2 {{ $t('partner.title') }}
    //-     hr
    //-     ul
    //-       li(
    //-         v-for="n in 3"
    //-         :key="n"
    //-         :style="{'background-image': `url(${require(`@/assets/images/partner${n}.png`)})`}"
    //-       )
</template>


<script>
import AppAndroid from '~/components/app-android.vue'
import AppIos from '~/components/app-ios.vue'


export default {
  head: {
    script: [
      { src: '/particles.min.js' },
      { src: '/donglizi.js' }
    ],
  },
  data () {
    return {
      focus: 1,
      newsToggleTimer: 0,
      lastNewsTimer: 0
    }
  },
  mounted () {
    requestAnimationFrame(this.update)
  },
  methods: {
    focusNewsTo (n) {
      this.focus = n
      this.newsToggleTimer = -3000
    },
    update (timer) {
      // console.log(timer)
      const delta = timer - this.lastNewsTimer
      this.newsToggleTimer += delta > 1000 ? 0 : delta
      if (this.newsToggleTimer > 5000) {
        this.newsToggleTimer = 0
        const nextN = this.focus + 1
        this.focus = nextN <= 2 ? nextN : 1
      }
      this.lastNewsTimer = timer
      requestAnimationFrame(this.update)
    }
  },
  components: {
    AppAndroid,
    AppIos
  }
}
</script>



<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'

.home-banner
  wh(100%,500px)
  background-color $font-dark
.home-intro-3col
  padding 0px 20px 100px
  .col3-con
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content space-between
    align-items flex-start
    max-width 900px
    margin 0px auto
    text-align center
  .icon
    font-size 68px
    margin 75px auto 28px
    color $font-dark    
  h4
    line-height 28px
    font-size 22px
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
  .col-1   
  .col-2
  .col-3
    color $font-dark

.home-about
  padding 100px 20px 80px
  background-color $bg-pearlblue
  .con
    max-width 900px
    margin 0px auto
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
    wh(60px, 2px)
  .title
    color $font-dark
    font-size 20px
    line-height 36px
    margin-bottom 20px
  .descr
    font-size 12px
    color $font-grey
    line-height 24px
    p
      margin-bottom 24px
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

.home-roadmap
  background-color white
  padding 100px 20px
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
    wh(60px, 2px)
  .time-line-con
    width 630px
    margin 0px auto
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
        padding 20px 20px 20px 8px
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
