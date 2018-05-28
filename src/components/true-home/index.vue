<template lang="pug">
  div
    .home-introduce-banner
      .home-introduce-banner-text
        h1 The True light wallet APP
        p Public beta version
        p Scan QR code to download
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
