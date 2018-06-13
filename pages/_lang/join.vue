<template lang="pug">
  #join-us
    .join-us-text
      h2 {{ $t('join.title') }}
      hr
      p {{ $t('join.intro') }}
      a.join-us-button(
        href="http://dorahacks.mikecrm.com/gFQKWLF"
        target="_blank"
      ) {{ $t('join.button') }}
      p {{ $t('join.p1') }}
      a.join-us-button(
        href="https://github.com/truechain"
        target="_blank"
      ) Github
      p {{ $t('join.p2') }}
      a.join-us-button(
        href="https://www.facebook.com/TrueChain-338812233299903"
        target="_blank"
      ) Facebook
</template>

<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'

#join-us
  padding 100px 0
  min-height 540px
  background-color #FFF
  .join-us-text
    max-width 1200px
    padding 0 20px
    margin auto
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
  p
    max-width 700px
    margin auto
    color #627792
    font-size 14px
    line-height 24px
    text-align center
  .join-us-button
    display block
    margin 50px auto 100px
    border-radius 25px
    border solid 1px $font-dark
    text-align center
    line-height 48px
    color $font-dark
    font-size 16px
    wh(148px, 48px)
    &:last-child
      margin-bottom 0
</style>
