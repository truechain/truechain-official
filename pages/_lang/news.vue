<template lang="pug">
  .news-container
    .news-body
      .page-title {{$t('newsRouter.title')}}
      .news-body-table
        .news-body-table-btn
          div(
            :class="{ 'news-body-table-btn-avtive': theme === 1 }",
            @click="toggleNode(1)"
          ) {{$t('newsRouter.technical')}}
          div(
            :class="{ 'news-body-table-btn-avtive': theme === 2 }",
            @click="toggleNode(2)"
            ) {{$t('newsRouter.biz')}}
        .news-body-table-body
          ul
            nuxt-link(
              tag="li",
              v-for="(item, index) in list",
              :key="index",
              :to="`news_detail/${item.id}`",
            )
              .news-body-table-body-date {{ getTime(+item.create_time, true) }}
              .news-body-table-body-title.ellipsis  {{item.title}}
      .news-body-page
        Page(
          :total="pageSum",
          :current="currentPage",
          @on-change="onChangePage"
        )

</template>

<script>

import { getTime, contdown } from '~/util/index.js'
import { apiArticleList } from '@/api'
export default {
  data () {
    return {
      list: [],
      sumNum: 0,
      pageSum: 0,
      theme: 1,
      pageIndex: 0,
      currentPage: 1,
      pageNumber: 10,
      nodeStandardSum: 0,
      nodeFullSum: 0
    }
  },
  async created () {
    this.fetchData()
    // this.NodeSum()
  },
  methods: {
    getTime,
    // async NodeSum () {
    //   const { data: { data } } = await apiNodeSum()
    //   this.sumNum = data[0].sumNum
    // },
    toggleNode (x) {
      this.pageIndex = 0
      this.theme = x
      this.fetchData({
        theme: x
      })
    },
    fetchData (obj = {}) {
      const { pageSum, theme, pageIndex = 1 } = obj
      // debugger
      this.pageIndex = pageIndex - 1
       apiArticleList({
         theme
       }).then(res =>{
        const { data } = res.data;
        console.log(data);
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
        theme: this.theme
      })
    },
  }
}
</script>

<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'
  /* 覆盖分页样式 */
.ivu-page
  .ivu-page-item-active
    background $font-dark
  .ivu-page-item
    color $font-light
    border 1px solid $font-light
.news-body
  display flex
  flex-direction column
  align-items center
  padding-top 50px
  padding-bottom 140px
  position relative
// .news-body-title
//   color $font-dark
//   font-size 26px
//   font-weight bold
//   position relative
//   padding-bottom 30px
//   &:after
//     content ''
//     width 60px
//     height 2px
//     background rgba(30,100,180,1)
//     position absolute
//     left 50%
//     bottom 0
    // transform translate(-50%, -50%)
.news-body-table
  width 900px
.news-body-table-btn
  padding-top 50px
  display flex
  div
    wh(240px, 60px)
    background rgba(255,255,255,1)
    border-radius 10px 10px 0px 0px
    text-align center
    line-height 60px
    color #456c99
    border 1px solid #dae2eb
    font-weight bold
.news-body-table-btn-avtive
  color $font-dark !important
  background rgba(235,242,249,1) !important
.news-body-table-body
  ul
    width 100%
    // flex-wrap wrap
    li
      font-size 14px
      width 100%
      height 50px
      display flex
      align-items center
      div
        color #456C99
        font-weight bold
      .news-body-table-body-date
        color #456C99
        margin 0 30px 0 20px
    li:nth-child(odd)
      background #FBFCFE
    li:nth-child(even)
      background #EBF2F9
.news-body-page
  position absolute
  right 270px
  bottom 70px
.news-body-table-body-title
  width 82%
</style>
