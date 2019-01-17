
<template lang="pug">
  .news-container
    .news-body
      .page-title {{$t('news.title')}}
      .news-body-table
        .news-body-table-btn
          div(
            :class="{ 'news-body-table-btn-avtive': nodeType === 1 }"
          ) {{$t('news.technical')}}
          // div(
          //   :class="{ 'news-body-table-btn-avtive': nodeType === 1 }",
          //   @click="toggleNode(1)"
          // ) {{$t('news.technical')}}
          // div(
          //   :class="{ 'news-body-table-btn-avtive': nodeType === 2 }",
          //   @click="toggleNode(2)"
          //   ) {{$t('news.biz')}}
        .news-body-table-body
          ul
            template(v-if="list.length")
              nuxt-link(
                tag="li",
                v-for="(item, index) in list",
                :key="index",
                :to="`news_detail/${item.id}`",
              )
                .news-body-table-body-date {{ getTime(+item.create_time, true) }}
                .news-body-table-body-title.ellipsis  {{item.title}}
            template(v-else)
              li
                .news-body-table-body-date
                .news-body-table-body-title {{$t('news.point')}}
      .news-body-page
        Page(
          :total="pageSum",
          :current="currentPage",
          @on-change="onChangePage"
        )
</template>

<script>

import { getTime } from '~/util/index.js'
import { apiArticleList } from '@/api'
export default {
  /* async asyncData({ store }) {
    const result = await apiArticleList({
        'theme': 1,
        'pageIndex': 0,
        'pageNumber': 10,
        'language': store.state.locale === 'zh' ? '1' : '2'
      })
      return {
        list: result.data.data
      }
  }, */
  head () {
    return {
      title: this.$t('news.head.title'),
      meta: [
        { hid: 'news-keyword', name: 'keywords', content: this.$t('news.head.keywords') },
        { hid: 'news-description', name: 'description', content: this.$t('news.head.description') }
      ]
    }
  },
  data () {
    return {
      list: [],
      sumNum: 0,
      pageSum: 0,
      nodeType: 1,
      pageIndex: 0,
      currentPage: 1,
      pageNumber: 10
    }
  },
  mounted () {
    this.fetchData()
    this.onFetchSumPage()
  },
  methods: {
    getTime,
    toggleNode (x) {
      this.nodeType = x
      this.pageIndex = 0
      this.onFetchSumPage(x)
      this.fetchData({
        nodeType: x
      })
    },
    fetchData (obj = {}) {
      const { pageSum, nodeType, pageIndex = 1 } = obj
      this.pageIndex = pageIndex - 1
      const language = {
        'zh': '1',
        'en': '2',
      }
      apiArticleList({
        'theme': nodeType || 1,
        'pageIndex': (pageIndex - 1) * this.pageNumber,
        'pageNumber': pageSum || this.pageNumber,
        'language': language[ this.$store.state.locale ] || '2'
      }).then(res => {
        if (pageSum > 10) {
          this.pageSum = res.data.data.length
        } else {
          this.list = res.data.data
        }
      })
    },
    onChangePage (x) {
      this.fetchData({
        pageIndex: x,
        nodeType: this.nodeType
      })
    },
    onFetchSumPage (x) {
      this.fetchData({
        nodeType: x,
        pageSum: 50000
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'
@media screen and (max-width 1024px)
  .news-body
    width 90% !important
  .news-body-table-body-date
    margin 0 10px !important
.news-body
  display flex
  flex-direction column
  align-items center
  padding-top 100px
  padding-bottom 170px
  position relative
  width 62%
  // background red
  margin 0px auto
.news-body-table
  // width 900px
  width 100%
.news-body-table-btn
  padding-top 60px
  display flex
  div
    wh(240px, 60px)
    background white
    color $font-light
    // background rgba(208,224,240,1)
    border-radius 10px 10px 0px 0px
    text-align center
    line-height 60px
    color #456c99
    font-weight bold
    border 1px solid #DAE2EB
    box-sizing border-box
    border-bottom 0
.news-body-table-btn-avtive
  color $font-dark !important
  border 0 !important
  background $bg-pearlblue !important
  border none !important

.news-body-table-body
  ul
    width 100%
    // flex-wrap wrap
    li
      font-size 16px
      width 100%
      height 60px
      display flex
      align-items center
      div
        color #456C99
        font-weight bold
      .news-body-table-body-date
        color #456C99
        margin 0 30px 0 20px
        white-space nowrap
        font-size 14px
    li:nth-child(odd)
      background $bg-pearlblue
    li:nth-child(even)
      background #FBFCFE
.news-body-page
  position absolute
  right 0px
  bottom 100px
.news-body-table-body-title
  width 82%
  color $font-dark !important
</style>

