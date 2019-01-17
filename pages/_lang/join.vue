<template lang="pug">
  .join-container
    .join-head
      .page-title {{ $t('join.title') }}
      .join-head-intro {{ $t('join.intro') }}
      .join-head-detail {{ $t('join.p1') }}
      .join-head-detail {{ $t('join.p2') }}
    .join-body
      ul
        nuxt-link(
          tag="li",
          v-for="(item, index) in $t('join.position')",
          :to="item.path",
          :key="index"
        )
          .join-body-icon
            span(:class="item.icon")
          .join-body-job {{item.job}}
        li
          .join-body-icon
    .join-footer
      div {{ $t('join.email')}}: hr@truechain.pro
</template>
<script>
export default {
  head () {
    return {
      title: this.$t('join.head.title'),
      meta: [
        { hid: 'join-keyword', name: 'keywords', content: this.$t('join.head.keywords') },
        { hid: 'join-description', name: 'description', content: this.$t('join.head.description') }
      ]
    }
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
  width 70%
  // background red
  padding-top 100px
  padding-bottom 60px
  position relative
  // text-align center
.join-head-intro
  // background red
  color $font-dark
  margin-top 60px
  margin-bottom 40px
  font-weight bold
  line-height 28px
  font-size 22px
.join-head-detail
  margin-top 10px
  color #456C99
  line-height 26px
  font-size 14px
.join-body
  background rgb(242, 245, 250);
  ul
    display flex
    flex-wrap wrap
    padding 80px 0px 20px
    max-width 1024px
    margin 0 auto
    justify-content space-around
    li
      text-align center
      margin-bottom 60px
      .join-body-icon
        wh(230px, 70px)
        // background pink
        fc()
        .icon
          color $font-dark
          font-size 55px
      .join-body-job
        // background red
        font-size 12px
        font-weight bold
        line-height 20px
        color $font-dark
.join-footer
  text-align center
  div
    padding 40px 0px 100px
    color $font-dark
    font-weight bold
    font-size 14px
</style>
