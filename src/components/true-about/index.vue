<template lang="pug">
  .about-container
    .about-introduce
      .about-introduce-title TECHNOLOGY
      .about-introduce-list
        ul
          li
            .about-introduce-list-avatar
              img(src="~@/assets/images/pic3.png")
            .about-introduce-list-name dddd
            .about-introduce-list-detail dasdasas蛮吊马上东北角马舍不得不为撒,豆瓣是
          li
            .about-introduce-list-avatar
              img(src="~@/assets/images/pic3.png")
            .about-introduce-list-name dddd
            .about-introduce-list-detail dasdasas蛮吊马上东北角马舍不得不为撒,豆瓣是
          li
            .about-introduce-list-avatar
              img(src="~@/assets/images/pic3.png")
            .about-introduce-list-name dddd
            .about-introduce-list-detail dasdasas蛮吊马上东北角马舍不得不为撒,豆瓣是
          li
            .about-introduce-list-avatar
              img(src="~@/assets/images/pic3.png")
            .about-introduce-list-name dddd
            .about-introduce-list-detail dasdasas蛮吊马上东北角马舍不得不为撒,豆瓣是
          li
            .about-introduce-list-avatar
              img(src="~@/assets/images/pic3.png")
            .about-introduce-list-name dddd
            .about-introduce-list-detail dasdasas蛮吊马上东北角马舍不得不为撒,豆瓣是
          li
            .about-introduce-list-avatar
              img(src="~@/assets/images/pic3.png")
            .about-introduce-list-name dddd
            .about-introduce-list-detail dasdasas蛮吊马上东北角马舍不得不为撒,豆瓣是
    .about-introduce
      .about-introduce-title TECHNOLOGY
      .about-introduce-list
        ul
          li
            .about-introduce-list-avatar
              img(src="~@/assets/images/pic3.png")
            .about-introduce-list-name dddd
            .about-introduce-list-detail dasdasas蛮吊马上东北角马舍不得不为撒,豆瓣是
          li
            .about-introduce-list-avatar
              img(src="~@/assets/images/pic3.png")
            .about-introduce-list-name dddd
            .about-introduce-list-detail dasdasas蛮吊马上东北角马舍不得不为撒,豆瓣是
          li
            .about-introduce-list-avatar
              img(src="~@/assets/images/pic3.png")
            .about-introduce-list-name dddd
            .about-introduce-list-detail dasdasas蛮吊马上东北角马舍不得不为撒,豆瓣是
          li
            .about-introduce-list-avatar
              img(src="~@/assets/images/pic3.png")
            .about-introduce-list-name dddd
            .about-introduce-list-detail dasdasas蛮吊马上东北角马舍不得不为撒,豆瓣是
          li
            .about-introduce-list-avatar
              img(src="~@/assets/images/pic3.png")
            .about-introduce-list-name dddd
            .about-introduce-list-detail dasdasas蛮吊马上东北角马舍不得不为撒,豆瓣是
          li
            .about-introduce-list-avatar
              img(src="~@/assets/images/pic3.png")
            .about-introduce-list-name dddd
            .about-introduce-list-detail dasdasas蛮吊马上东北角马舍不得不为撒,豆瓣是

    .about-honor
      .about-honor-title TECHNOLOGY
      .about-honor-list
        ul
          li
            .about-honor-list-avatar
              img(src="~@/assets/images/pic3.png")
            .about-honor-list-name dddd
            .about-honor-list-detail dasdasas蛮吊马上东北角马舍不得不为撒,豆瓣是
          li
            .about-honor-list-avatar
              img(src="~@/assets/images/pic3.png")
            .about-honor-list-name dddd
            .about-honor-list-detail dasdasas蛮吊马上东北角马舍不得不为撒,豆瓣是
          li
            .about-honor-list-avatar
              img(src="~@/assets/images/pic3.png")
            .about-honor-list-name dddd
            .about-honor-list-detail dasdasas蛮吊马上东北角马舍不得不为撒,豆瓣是
</template>

<script>
  export default {

  }
</script>

<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'
  .about-container
    padding 20px 100px
    background red
  .about-introduce
    display flex
    justify-content center
    // background green
    flex-direction column
  .about-introduce-title
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
  .about-introduce-list
    background pink
    padding 40px 0
    max-width 850px
    margin 0 auto
    ul
      fc()
      background pink
      flex-wrap wrap
      li
        width 200px
        display flex
        margin 0 40px 40px
        background green
        justify-content space-between
        // justify-content center
        flex-direction column
        .about-introduce-list-avatar
          background red
          wh(100%, 200px)
          border-radius 50%
          overflow hidden
        .about-introduce-list-name
          background blue
          padding 25px 0 15px
          font-size 20px
          color $font-dark
          text-align center
        .about-introduce-list-detail
          background yellow
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
    background pink
    padding 40px 0
    max-width 850px
    margin 0 auto
    ul
      fc()
      background pink
      flex-wrap wrap
      li
        width 250px
        display flex
        margin 0 15px 40px
        background green
        justify-content space-between
        // justify-content center
        flex-direction column
        .about-honor-list-avatar
          background red
          wh(250px,180px)
          border-radius 15px
          overflow hidden
        .about-honor-list-name
          background blue
          padding 25px 0 15px
          font-size 20px
          color $font-dark
          text-align center
        .about-honor-list-detail
          background yellow
          font-size 12px
          line-height 22px
          color #456C99
</style>
