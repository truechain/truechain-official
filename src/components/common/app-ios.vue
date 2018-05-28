<template>
  <div class="download-app-ios">
    <div class="button">IOS</div>
    <div class="qrcode"></div>
  </div>
</template>

<script>
export default {
  name: 'app-ios'
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/mixin.styl'

.download-app-ios
  float left
  margin 50px 30px 0 0
  wh(150px, 50px)
.button
  border solid 1px #FFF
  background-color #1000
  border-radius 25px
  line-height 50px
  color #FFF
  text-align center
  font-size 14px
</style>
