<template lang="pug">
div.page
  .page-con
    .page-con-left
      p.page-con-left-title Truewallet
      img(src="~assets/images/iosappdown001.png")
    .page-con-right
      .page-con-right-title Truewallet
      .apple-down-btn
        a(target="_blank",href="itms-services://?action=download-manifest&url=https://www.truechain.pro/download/true-wallet.plist")
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
      .apple-down-btn
        a(target="_blank",href="http://www.truechain.pro/download/true.apk")
          svg(
            xmlns="http://www.w3.org/2000/svg",
            xmlns:xlink="http://www.w3.org/1999/xlink",
            viewBox="0 0 1024 1024",
            version="1.1",
            width="30",
            height="30"
            )
            path(d="M116.799504 7.937984 116.799504 7.937984 116.799504 7.937984Z")
            path(d="M396.32769 281.79845q9.065178 0 15.590202-6.525023t6.525023-15.590202-6.525023-15.590202-15.590202-6.525023-15.304434 6.525023-6.239256 15.590202 6.239256 15.590202 15.304434 6.525023zM635.610295 281.79845q9.065178 0 15.304434-6.525023t6.239256-15.590202-6.239256-15.590202-15.304434-6.525023-15.590202 6.525023-6.525023 15.590202 6.525023 15.590202 15.590202 6.525023zM175.207194 386.119442q23.813953 0 40.817116 17.003163t17.003163 40.817116l0 243.807256q0 24.385488-16.733271 41.388651t-41.102884 17.003163-41.388651-17.003163-17.003163-41.388651l0-243.807256q0-23.813953 17.003163-40.817116t41.388651-17.003163zM776.223752 396.899225l0 377.625798q0 26.084217-18.146233 44.23045t-43.658915 18.146233l-42.531721 0 0 128.706481q0 24.385488-17.003163 41.388651t-41.388651 17.003163-41.388651-17.003163-17.003163-41.388651l0-128.706481-78.252651 0 0 128.706481q0 24.385488-17.003163 41.388651t-41.388651 17.003163q-23.813953 0-40.817116-17.003163t-17.003163-41.388651l-0.571535-128.706481-41.960186 0q-26.084217 0-44.23045-18.146233t-18.146233-44.23045l0-377.625798 520.509519 0zM644.675473 167.269209q60.662078 31.180403 96.954543 87.032062t36.292465 122.181457l-524.478512 0q0-66.345674 36.292465-122.181457t97.526078-87.032062l-40.261457-74.283659q-3.968992-7.36645 2.841798-11.335442 7.36645-3.397457 11.335442 3.397457l40.817116 74.839318q53.867163-23.813953 113.973581-23.813953t113.973581 23.813953l40.817116-74.839318q3.968992-6.810791 11.335442-3.397457 6.810791 3.968992 2.841798 11.335442zM915.138481 443.955597l0 243.807256q0 24.385488-17.003163 41.388651t-41.388651 17.003163q-23.813953 0-40.817116-17.003163t-17.003163-41.388651l0-243.807256q0-24.385488 17.003163-41.102884t40.817116-16.733271q24.385488 0 41.388651 16.733271t17.003163 41.102884z")
          span 安卓下载
      .page-con-right-con
        img.qr(src="/download/iosappdownqr.png")
        .descr
          .primary 手机扫描二维码下载安装
          .second 版本：1.6.0
          .second 大小： 5.46MB
          .second 更新日期：2018-08-19

</template>

<script>
export default {
  layout: 'nofooter',
  data () {
    return {

    }
  },
  async created () {
  },
  methods: {

  }
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
