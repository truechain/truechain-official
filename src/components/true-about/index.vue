<template lang="pug">
  .about-container
    .about-introduce
      h2 {{ $t('team.technology.title') }}
      hr
      .about-introduce-list
        ul
          li(
            v-for="n in 13"
            :key="n"
          )
            .about-introduce-list-avatar
              img(:src="require(`@/assets/members/tec${n - 1}.jpg`)")
            .about-introduce-list-name {{ $t(`team.technology.list.${n - 1}.name`) }}
            .about-introduce-list-detail {{ $t(`team.technology.list.${n - 1}.intro`) }}
    .about-introduce
      h2 {{ $t('team.business.title') }}
      hr
      .about-introduce-list
        ul
          li(
            v-for="n in 5"
            :key="n"
          )
            .about-introduce-list-avatar
              img(:src="require(`@/assets/members/bus${n - 1}.jpg`)")
            .about-introduce-list-name {{ $t(`team.business.list.${n - 1}.name`) }}
            .about-introduce-list-detail {{ $t(`team.business.list.${n - 1}.intro`) }}
    .about-introduce
      h2 {{ $t('team.consultant.title') }}
      hr
      .about-introduce-list
        ul
          li(
            v-for="n in 5"
            :key="n"
          )
            .about-introduce-list-avatar
              img(:src="require(`@/assets/members/con${n - 1}.jpg`)")
            .about-introduce-list-name {{ $t(`team.consultant.list.${n - 1}.name`) }}
            .about-introduce-list-detail {{ $t(`team.consultant.list.${n - 1}.intro`) }}
    .about-honor
      h2 {{ $t('honor.title') }}
      hr
      .about-honor-list
        ul
          li
            .about-honor-list-avatar
              img(src="~@/assets/images/pic3.jpg")
            .about-honor-list-name dddd
            .about-honor-list-detail dasdasas蛮吊马上东北角马舍不得不为撒,豆瓣是
          li
            .about-honor-list-avatar
              img(src="~@/assets/images/pic3.jpg")
            .about-honor-list-name dddd
            .about-honor-list-detail dasdasas蛮吊马上东北角马舍不得不为撒,豆瓣是
          li
            .about-honor-list-avatar
              img(src="~@/assets/images/pic3.jpg")
            .about-honor-list-name dddd
            .about-honor-list-detail dasdasas蛮吊马上东北角马舍不得不为撒,豆瓣是
</template>

<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'
  .about-container
    padding 100px 20px
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
  .about-introduce
    display flex
    justify-content center
    flex-direction column
  .about-introduce-list
    max-width 850px
    margin 0 auto
    ul
      display flex
      align-items baseline
      flex-wrap wrap
      li
        width 200px
        display flex
        margin 0 40px 100px
        justify-content space-between
        // justify-content center
        flex-direction column
        .about-introduce-list-avatar
          wh(100%, 200px)
          border-radius 50%
          overflow hidden
        .about-introduce-list-name
          padding 25px 0 15px
          font-size 20px
          color $font-dark
          text-align center
        .about-introduce-list-detail
          font-size 12px
          line-height 22px
          color #456C99
  .about-honor
    display flex
    justify-content center
    // background green
    flex-direction column
  .about-honor-title
    font-size 26px
    color $font-dark
    position relative
    text-align center
    padding 20px 0
    &:after
      content ''
      wh(60px, 2px)
      position absolute
      bottom 0
      // transform
      left 50%
      transform translateX(-50%)
      background-color $font-dark
  .about-honor-list
    padding 40px 0
    max-width 850px
    margin 0 auto
    ul
      fc()
      flex-wrap wrap
      li
        width 250px
        display flex
        margin 0 15px 40px
        justify-content space-between
        // justify-content center
        flex-direction column
        .about-honor-list-avatar
          background red
          wh(250px,180px)
          border-radius 15px
          overflow hidden
        .about-honor-list-name
          padding 25px 0 15px
          font-size 20px
          color $font-dark
          text-align center
        .about-honor-list-detail
          font-size 12px
          line-height 22px
          color #456C99
</style>
