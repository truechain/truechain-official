<template lang="pug">
div.page
  .page-con
    .page-con-left
      p.page-con-left-title Truewallet
      //- img(src="~assets/images/iosappdown001.png")
      img(src="~assets/images/wallet.png")
    .page-con-right
      .page-con-right-title Truewallet
      .apple-down-btn
        a(
          target="_blank",
          href="itms-services://?action=download-manifest&url=https://qiniu.truescan.net/file/true-wallet.plist",
          @click="onDownIos"
        )
          svg(
            xmlns="http://www.w3.org/2000/svg",
            xmlns:xlink="http://www.w3.org/1999/xlink",
            viewBox="0 0 1024 1024",
            version="1.1",
            width="30",
            height="30"
            )
            path(d="M921.809408 727.04c-20.48 51.2-30.72 71.68-61.44 117.76-40.96 61.44-97.28 138.24-168.96 138.24-61.44 0-76.8-40.96-163.84-40.96-87.04 0-102.4 40.96-163.84 40.96-71.68 0-122.88-71.68-163.84-133.12C87.249408 675.84 77.009408 476.16 143.569408 368.64c51.2-76.8 128-122.88 199.68-122.88 76.8 0 122.88 40.96 184.32 40.96 61.44 0 97.28-40.96 184.32-40.96 66.56 0 133.12 35.84 184.32 97.28-163.84 87.04-138.24 322.56 25.6 384z m-266.24-563.2c-30.72 46.08-87.04 81.92-143.36 81.92-10.24-61.44 15.36-122.88 46.08-163.84C594.129408 35.84 650.449408 0 701.649408 0c10.24 61.44-15.36 122.88-46.08 163.84z")
          span 苹果下载
      .page-con-right-con
        img.qr(src="~@/assets/images/iosappdownQR.png")
        .descr
          .primary 手机扫描二维码下载安装
          .second 版本：3.1.0
          .second 大小： 7.1MB
          .second 更新日期：2019-01-18

</template>

<script>
import baiduAnalyse from '@/middleware/baiduAnalyse'
export default {
  layout: 'nofooter',
  async mounted() {
    baiduAnalyse()
  },
  methods: {
    onDownIos () {
      window._hmt.push(['_trackEvent', 'software', 'download', 'iosh5down'])
    }
  },
}
</script>

<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'
.page
  background-color $dark-blue
  padding 100px 15px
  .page-con
    display flex
    flex-direction row
    justify-content space-between
    align-items stretch
    max-width 820px
    margin 0px auto
.page-con-left-title
  color white
  font-size 36px
  line-height 1.2
  margin 0px 0px 50px
  display none
.page-con-right-title
  color white
  font-size 36px
  line-height 1.2
  margin 100px 0px 50px
.page-con-right-con
  img
    display inline-block
    vertical-align top
    wh(135px,135px)
  .descr
    display inline-block
    vertical-align top
    padding-left 15px
    .primary
      color white
      font-size 16px
      line-height 22px
      margin 10px 0px 38px
    .second
      font-size 14px
      line-height 20px
      color white
.apple-down-btn
  background-color white
  line-height 42px
  width 175px
  height 42px
  border-radius 25px
  text-align center
  margin-bottom 50px
  svg
    display inline-block
    vertical-align top
    margin 6px 10px 0px 0px
  span
    vertical-align top
    display inline-block
    padding 0px
    line-height 42px
@media screen and (max-width 860px)
  .page
    .page-con
      flex-direction column
      align-items center
    .page-con-left
      width 80%
      text-align center
      .page-con-left-title
        display block
    .page-con-right-title
      display none
    .page-con-right
      .apple-down-btn
        width 100%
        margin 30px 0px
</style>
