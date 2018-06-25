<template lang="pug">
  .jd-container
    .jd-head
      .page-title {{ $t('join.title') }}
      template(v-for="(item, index) in $t('join.jobs')[$route.params.id]")
        template(v-if="index === 'title'")
          .jd-head-subhead {{item}}
        template(v-else-if="typeof item === 'string' ")
          .jd-head-detail
            div
              div {{$t('join')[index]}}：{{item}}
        template(v-else-if="Array.isArray(item)")
          .jd-head-detail
            div
              div {{$t('join')[index]}}：
              div
                ul
                  li(
                    v-for="(item, index) in item"
                  ) {{index + 1 +  '、' + item}}
        template(v-else)
          .jd-head-detail
            div
              div 暂无该 {{typeof item}}类型数据显示
      .jd-head-mail {{ $t('join.email')}}: hr@truechain.pro
</template>
<script>
export default {
   head: {
    title: '初链团队-初链TrueChain',
    meta: [
      { hid: 'jd-keyword', name: 'keyword', content: '初链团队成员，TRUE,区块链专家，数字货币专家，区块链人才' },
      { hid: 'jd-description', name: 'description', content: '初链的全球团队成员主要分为技术团队，商业团队及区块链专家顾问，分布在美国、印度和中国。' },
    ]
  },
}
</script>
<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'
  /* 覆盖分页样式 */
.jd-head
  display flex
  flex-direction column
  margin 0 auto
  width 750px
  // background red
  padding-top 100px
  padding-bottom 70px
  position relative
.jd-head-title
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
.jd-head-subhead
  // background red
  color $font-dark
  margin-top 45px
  font-weight bold
  line-height 50px
  font-size 22px
.jd-head-detail
  margin-top 10px
  color #456C99
  line-height 30px
  font-size 14px
  div
    div
      color #456C99
    ul
      li
        color #456C99
.jd-head-mail
  color #456C99
  // background red
  padding-top 20px
  padding-bottom 30px
  font-weight bold
</style>
