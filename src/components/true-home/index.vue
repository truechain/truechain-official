<template lang="pug">
  div
    .home-introduce-banner
      .home-introduce-banner-text
        h1 {{ $t('banner.title') }}
        p {{ $t('banner.p1') }}
        p {{ $t('banner.p2') }}
        app-ios
        app-android
</template>

<script>
import AppAndroid from '@/components/common/app-android.vue'
import AppIos from '@/components/common/app-ios.vue'

export default {
  components: {
    AppAndroid,
    AppIos
  }
}
</script>

<style lang="stylus">
.home-introduce-banner
  height 560px
  background-image url("~@/assets/images/banner.png")
  background-position 50%
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
</style>
