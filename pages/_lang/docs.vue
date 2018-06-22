<template lang="pug">
  .docs-container
    .docs-body
      h2 {{ $t('docs.title') }}
      hr
      .docs-body-list
        ul
          li
            .docs-body-list-poster
              div
                img(src="~@/assets/images/logo_bot.png")
            .docs-body-list-info
              .docs-body-list-info-title {{ $t('docs.white-title') }}
              .docs-body-list-info-content {{ $t('docs.white-content') }}
              .docs-body-list-info-btn
                a(
                  target="_blank"
                  href="https://www.truechain.pro/Truechain.pdf"
                ) {{ $t('docs.button') }}
          li
            .docs-body-list-poster
              div
                img(src="~@/assets/images/logo_bot.png")
            .docs-body-list-info
              .docs-body-list-info-title {{ $t('docs.yellow-title') }}
              .docs-body-list-info-content {{ $t('docs.yellow-content') }}
              .docs-body-list-info-btn
                a(
                  target="_blank"
                  href="https://arxiv.org/pdf/1805.01457.pdf"
                ) {{ $t('docs.button') }}

</template>

<script>
export default {
   head: {
    title: '团队',
    meta: [
      { hid: 'docs-keyword', name: 'keyword', content: 'truechain, true, 初链' },
      { hid: 'docs-description', name: 'description', content: 'Next Generation Public Blockchain with Hybrid Consensus. 超高性能，无穷节点，混合共识公有链！' },
    ]
  },
}
</script>

<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'

.docs-container
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
.docs-body
  width 900px
  margin 0 auto
  // background red

.docs-body-title
  padding 25px 0
  text-align center
  color #1E64B4
  font-size 26px
  font-weight bold
  position relative
  &:after
    content ''
    wh(60px, 2px)
    position absolute
    bottom 0
    left 50%
    transform translateX(-50%)
    background-color $font-dark
.docs-body-list
  border-radius 10px
  ul
    padding-bottom 50px
    li
      margin-top 40px
      display flex
      // align-items center
      // justify-content space-between
      padding 40px
      background rgba(235,242,249,1)
.docs-body-list-poster
  wh(160px, 213px)
  background white
  border-radius 4px
  fc()
  div
    wh(72px, 84px)
.docs-body-list-info
  // background red
  width 672px
  padding-top 10px
  padding-left 30px
  position relative
  // background red
.docs-body-list-info-title
  color $font-dark
  font-size 26px
  font-weight bold
.docs-body-list-info-content
  color #456C99
  padding-top 20px
  padding-bottom 40px
  font-size 16px
  line-height 26px
.docs-body-list-info-btn
  display flex
  justify-content flex-end
  a
    display block
    cursor pointer
    margin 0 15px
    wh(150px, 50px)
    background-color white
    border-radius 25px
    text-align center
    line-height 50px
    color $font-dark
    font-weight bold
    transition all ease .5s
    &:hover
      color white
      background-color $font-dark
</style>
