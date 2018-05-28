<template>
  <div class="download-app-ios">
    <div class="button">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="icon" viewBox="0 0 1024 1024" version="1.1" width="30" height="30">
        <path d="M921.809408 727.04c-20.48 51.2-30.72 71.68-61.44 117.76-40.96 61.44-97.28 138.24-168.96 138.24-61.44 0-76.8-40.96-163.84-40.96-87.04 0-102.4 40.96-163.84 40.96-71.68 0-122.88-71.68-163.84-133.12C87.249408 675.84 77.009408 476.16 143.569408 368.64c51.2-76.8 128-122.88 199.68-122.88 76.8 0 122.88 40.96 184.32 40.96 61.44 0 97.28-40.96 184.32-40.96 66.56 0 133.12 35.84 184.32 97.28-163.84 87.04-138.24 322.56 25.6 384z m-266.24-563.2c-30.72 46.08-87.04 81.92-143.36 81.92-10.24-61.44 15.36-122.88 46.08-163.84C594.129408 35.84 650.449408 0 701.649408 0c10.24 61.44-15.36 122.88-46.08 163.84z"/>
      </svg>
      <span>IOS</span>
    </div>
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
  line-height 48px
  text-align center
  color #FFF
  svg
    margin 7px 0 11px
    vertical-align bottom
  span
    color inherit
    font-size 14px
</style>
