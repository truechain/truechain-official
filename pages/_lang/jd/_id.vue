<template lang="pug">
  .join-container
    .join-head
      .join-head-title {{ $t('join.title') }}
      .join-head-intro {{ $t('join.intro') }}
      .join-head-detail {{ $t('join.detail') }}
</template>

<script>
export default {
  mounted () {
    console.log(this.$route.params.id);
  }
}
</script>

<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'
  /* 覆盖分页样式 */
.join-head
  display flex
  flex-direction column
  margin 0 auto
  width 750px
  // background red
  padding-top 50px
  padding-bottom 25px
  position relative
.join-head-title
  color $font-dark
  text-align center
  font-size 26px
  font-weight bold
  position relative
  padding-bottom 30px
  &:after
    content ''
    width 60px
    height 2px
    background rgba(30,100,180,1)
    position absolute
    left 50%
    bottom 0
    transform translate(-50%, -50%)
.join-head-intro
  // background red
  color $font-dark
  margin-top 15px
  font-weight bold
  line-height 50px
  font-size 22px
.join-head-detail
  margin-top 10px
  color #456C99
  line-height 26px
  font-size 14px
</style>
