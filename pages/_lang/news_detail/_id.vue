<template lang="pug">
  .news-detail-container
    .news-detail
      .news-detail-title {{ detail.title }}
      .news-detail-timestamp(v-text="getTime(+detail.create_time, true)")
      .news-detail-content(v-html="detail.content")
</template>

<script>
import { apiArticleDetail } from '@/api'
import { getTime } from '@/util'
export default {
  head () {
    return {
      title: this.$t('news.head.title'),
      meta: [
        { hid: 'news-keyword', name: 'keywords', content: this.$t('news.head.keywords') },
        { hid: 'news-description', name: 'description', content: this.$t('news.head.description') }
      ]
    }
  },
  /* async asyncData({ params }) {
     const result = await apiArticleDetail({
      id: params.id
    });
    return {
      detail: result.data.data[0] || {}
    }
  }, */
  data () {
    return {
      detail: {},
      spinShow: true
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
  width 62%
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
  p
    text-indent 2em
  span, p
    color $font-dark

.news-detail-timestamp
  text-align right
  font-size 12px
  color #456C99
.news-detail-container
  h1
    font-size 2em
    margin 0.67em 0
  h2
    font-size 1.5em
    margin 0.75em 0
  h3
    font-size 1.17em
    margin 0.83em 0
  h4, p, blockquote, ul, fieldset, form, ol, dl, menu
    margin 1.12em 0
  h5
    font-size .83em
    margin 1.5em 0
  h6
    font-size .75em
    margin 1.67em 0
  h1, h2, h3, h4, h5, h6, b, strong
    font-weight bolder
  table
    display table
  tr
    display table-row
  thead
    display table-header-group
  tbody
    display table-row-group
  tfoot
    display table-footer-group
  td, th
    display table-cell
  caption
    display table-caption
  th
    font-weight bolder
    text-align center
  caption
    text-align center
  table
    border-spacing 2px
  thead, tbody, tfoot
    vertical-align middle
  td, th
    vertical-align inherit
  blockquote
    margin-left 40px
    margin-right 40px
  pre, tt, code, kbd, samp
    font-family monospace
  pre
    white-space pre
  big
    font-size 1.17em
  small, sub, sup
    font-size 0.83em
  sub
    vertical-align sub
  sup
    vertical-align super
  s, strike, del
    text-decoration line-through
  hr
    border 1px inset
  img
    width auto
    height auto
</style>
