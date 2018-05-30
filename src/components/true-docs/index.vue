<template lang="pug">
  .docs-container
    .docs-body
      .docs-body-title TECHNICAL DOCS
      .docs-body-list
        ul
          li
            .docs-body-list-poster
              div
                img(src="~@/assets/images/logo_bot.png")
            .docs-body-list-info
              .docs-body-list-info-title 白皮书
              .docs-body-list-info-content 打造承载未来商用去中心化应用的公链，是时代的需求，也是初链的梦想。基于混合共识机制设计的初链，旨在为社会提供高速点对点通信、价值传输以及智能合约基础设施。
              .docs-body-list-info-btn
                div Preview
                div Download
          li
            .docs-body-list-poster
              div
                img(src="~@/assets/images/logo_bot.png")
            .docs-body-list-info
              .docs-body-list-info-title White Paper
              .docs-body-list-info-content It is the demand of the times and the dream of TrueChain to create a public chain that will carry the future commercial decentralized applications. Based on the hybrid consensus mechanism, TrueChain aims to provide high-speed point-to-point communication, value transfer and to build the infrastructures of smart contract for the society.
              .docs-body-list-info-btn
                div Preview
                div Download
          li
            .docs-body-list-poster
              div
                img(src="~@/assets/images/logo_bot.png")
            .docs-body-list-info
              .docs-body-list-info-title Yellow Paper
              .docs-body-list-info-content It is the demand of the times and the dream of TrueChain to create a public chain that will carry the future commercial decentralized applications. Based on the hybrid consensus mechanism, TrueChain aims to provide high-speed point-to-point communication, value transfer and to build the infrastructures of smart contract for the society.
              .docs-body-list-info-btn
                div Preview
                div Download

</template>
<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'
.docs-container
  padding 30px 0
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
  div
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
