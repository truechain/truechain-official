<template lang="pug">
  .news-detail-container
    .news-detail
      .news-detail-title {{detail.title}}
      .news-detail-timestamp {{getTime(+detail.create_time, true)}}
      .news-detail-content(v-html="detail.content")
</template>

<script>
import { apiArticleDetail } from '@/api'
import { getTime } from '@/util'
export default {
  data () {
    return {
      detail: {}
    }
  },
  methods: {
    getTime
  },
  mounted () {
    apiArticleDetail({
      id: this.$route.params.id
    }).then(res => {
      this.detail = res.data.data[0] || {}
    })
  }
}
</script>

<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'
  /* 覆盖分页样式 */
.news-detail
  display flex
  flex-direction column
  margin 0 auto
  width 750px
  // background red
  padding-top 50px
  padding-bottom 25px
  position relative
.news-detail-title
  color $font-dark
  text-align center
  font-size 20px
  width 100%
  font-weight bold
  position relative
  padding-bottom 30px
.news-detail-content
  // background red
  margin-top 15px
  line-height 25px
  font-size 14px
  span, p
    color $font-dark
.news-detail-timestamp
  text-align right
  font-size 12px
  color #456C99
</style>
