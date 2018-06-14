<template lang="pug">
  .join-container
    .join-head
      .join-head-title {{ $t('join.title') }}
      .join-head-intro {{ $t('join.intro') }}
      .join-head-detail {{ $t('join.detail') }}
    .join-body
      ul
        nuxt-link(
          tag="li",
          v-for="(item, index) in jobList",
          :to="item.path",
          :key="index"
        )
          .join-body-icon
            span(:class="item.icon")
          .join-body-job {{item.job}}
    .join-footer
      div 简历投递邮箱: hr@truechain.pro
</template>
<script>
export default {
  data() {
    return {
      jobList: [
        {
          path: 'jd/1',
          icon: 'icon font_family icon-kaifa',
          job: 'GO语言开发工程师',
        },
        {
          path: 'jd/2',
          icon: 'icon font_family icon-suanfa',
          job: 'GO语言算法工程师',
        },
        {
          path: 'jd/3',
          icon: 'icon font_family icon-touzi',
          job: '投资者关系总监',
        },
        {
          path: 'jd/4',
          icon: 'icon font_family icon-zhaopin',
          job: '招聘主管',
        },
        {
          path: 'jd/5',
          icon: 'icon font_family icon-zhuli',
          job: 'CEO助理',
        },
        {
          path: 'jd/6',
          icon: 'icon font_family icon-zhuli',
          job: '区块链业务总监',
        },
        {
          path: 'jd/7',
          icon: 'icon font_family icon-shixisheng',
          job: '运营实习生',
        },
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
.join-body
  background rgb(242, 245, 250);
  padding 0 300px
  ul
    display flex
    flex-wrap wrap
    padding 40px 0
    li
      text-align center
      margin-bottom 20px
      .join-body-icon
        wh(200px, 70px)
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
    padding 40px 0
    color $font-dark
    font-weight bold
    font-size 14px
</style>
