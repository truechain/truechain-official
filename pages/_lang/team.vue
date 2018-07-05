<template lang="pug">
  .about-container
    .about-introduce
      .page-title.photo-header {{ $t('team.technology.title') }}
      .about-introduce-list
        ul
          li(
            v-for="(item, index) in $t(`team.technology.list`)"
            :key="index"
          )
            .about-introduce-list-avatar
              img(:src="require(`~/assets/members/a${index + 1}.png`)")
              .about-introduce-list-name-hover {{ item.name }}
            .about-introduce-list-detail {{ item.intro }}
    .about-introduce
      .page-title.photo-header {{ $t('team.business.title') }}
      .about-introduce-list
        ul
          li(
            v-for="(item, index) in $t('team.business.list')"
            :key="index"
          )
            .about-introduce-list-avatar
              img(:src="require(`@/assets/members/b${index + 1}.png`)")
              .about-introduce-list-name-hover {{ item.name }}
            .about-introduce-list-detail {{ item.intro }}
    .about-introduce
      .page-title {{ $t('team.consultant.title') }}
      .about-introduce-list
        ul.consult
          li(
            v-for="n in 6"
            :key="n"
          )
            // .about-introduce-list-avatar
              img(:src="require(`@/assets/members/con${n - 1}.jpg`)")
            .about-introduce-list-name {{ $t(`team.consultant.list.${n - 1}.name`) }}
            .about-introduce-list-detail {{ $t(`team.consultant.list.${n - 1}.intro`) }}
</template>
<script>
export default {
  head() {
    return {
      title: this.$t('team.head.title'),
      meta: [
        { hid: 'team-keyword', name: 'keyword', content: this.$t('team.head.keyword'), },
        { hid: 'team-description', name: 'description', content: this.$t('team.head.description'), },
      ]
    }
  }
}
</script>

<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'

.about-container
  padding 100px 20px 40px
  .page-title.photo-header
    margin-bottom 60px
.about-introduce
  display flex
  justify-content center
  flex-direction column
.about-introduce-list
  max-width 850px
  margin 0 auto
  .consult
    padding-top 30px
  ul
    display flex
    align-items baseline
    flex-wrap wrap
    padding 0px
    li
      width 200px
      display flex
      margin 0 40px 60px
      justify-content space-between
      // justify-content center
      flex-direction column
      &:hover
        .about-introduce-list-name-hover
          opacity 1
      .about-introduce-list-avatar
        wh(100%, 200px)
        border-radius 50%
        overflow hidden
        position relative
        margin-bottom 10px
      .about-introduce-list-name-hover
        position absolute
        top 0
        wh(100%, 100%)
        background rgba(32, 50, 96, .5)
        fc()
        color white
        font-size 20px
        opacity 0
        transition all .5s ease
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
  // background red
  ul
    display flex
    flex-wrap wrap
    li
      width 250px
      display flex
      margin 0 15px 40px
      flex-direction column
      .about-honor-list-avatar
        background red
        wh(250px,180px)
        border-radius 15px
        overflow hidden
      .about-honor-list-detail
        padding-top 22px
        font-size 12px
        line-height 22px
        color #456C99
</style>
