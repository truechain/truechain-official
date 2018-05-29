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
    .home-introduce-intro
      .home-introduce-intro-text
        h2 {{ $t('name') }}
        hr
        p {{ $t('intro.p1') }}
        p {{ $t('intro.p2') }}
        p {{ $t('intro.p3') }}
    ul.home-introduce-details
      li(
        v-for="(item, index) in detailsIntro"
        :key="index"
      )
        .home-introduce-details-text
          hr
          h3 {{ $t(`details.${index}.title`) }}
          p(
            v-for="(para, index) in $t(`details.${index}.para`).split('|')"
            :key="index"
          ) {{para}}
        .home-introduce-details-image

</template>

<script>
import AppAndroid from '@/components/common/app-android.vue'
import AppIos from '@/components/common/app-ios.vue'

const detailsIntro = [1, 1, 1, 1]

export default {
  data () {
    return {
      detailsIntro
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

.home-introduce-banner
  overflow hidden
  height 560px
  background-color $dark-blue
  background-image url("~@/assets/images/banner.png")
  background-position 50%
  background-repeat no-repeat
.home-introduce-banner-text
  transform translate3d(50%, 150px, 0)
  h1
    letter-spacing 0.05em
    font-size 40px
    line-height 40px
    margin-bottom 30px
    font-weight 800
    color #FFF
  p
    font-size 18px
    line-height 30px
    color #FFF
.home-introduce-intro
  padding 100px 0
  min-height 600px
  background-color $background
  .home-introduce-intro-text
    max-width 740px
    padding 0 20px
    margin auto
  h2
    color $font-dark
    text-align center
    font-size 26px
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
    clear both
  div
    width 50%
  li:nth-child(odd) div
    float left
  li:nth-child(even) div
    float right
</style>
