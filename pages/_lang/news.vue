<template lang="pug">
  .news-container
    .news-body
      .news-body-title {{$t('newsRouter.title')}}
      .news-body-table
        .news-body-table-btn
          div(
            :class="{ 'news-body-table-btn-avtive': nodeType === 1 }",
            @click="toggleNode(1)"
          ) {{$t('newsRouter.technical')}}
          div(
            :class="{ 'news-body-table-btn-avtive': nodeType === 2 }",
            @click="toggleNode(2)"
            ) {{$t('newsRouter.biz')}}
        .news-body-table-body
          ul
            li(
              v-for="(item, index) in list",
              :key="index"
            )
              .news-body-table-body-date {{ item.tickets }}
              .news-body-table-body-title  {{item.nickname}}
      .news-body-page
        Page(
          :total="pageSum",
          :current="currentPage",
          @on-change="onChangePage",
          @on-page-size-change="onChangePageSize"
        )

</template>

<script>

import { getTime, contdown } from '~/util/index.js'
// console.log(getTime);

import { apiNodeRank, apiNodeSum, apiNodeRankPc, apiNodeTypeSumNum } from '@/api'
export default {
  data () {
    return {
      list: [],
      sumNum: 0,
      pageSum: 0,
      nodeType: 1,
      pageIndex: 0,
      currentPage: 1,
      pageNumber: 10,
      time: {
        d: '00',
        h: '00',
        m: '00',
        s: '00'
      },
      nodeStandardObj: {
        type1: 2,
        type2: 1,
        type3: 1,
        type4: 1
      },
      nodeFullObj: {
        type1: 2,
        type2: 2,
        type3: 1,
        type4: 2
      },
      nodeStandardSum: 0,
      nodeFullSum: 0,
      nodeStandard_21: 0,
      nodeStandard_11: 0,
      nodeFull_22: 0,
      nodeFull_12: 0,
      nodeArr: [
        {
          type: 2,
          nodeType: 1
        },
        {
          type: 1,
          nodeType: 1
        },
        {
          type: 2,
          nodeType: 2
        },
        {
          type: 1,
          nodeType: 2
        }
      ]
    }
  },
  async created () {
    this.fetchData()
    this.onFetchSumPage()
    this.setContdown()
    this.NodeSum()
    this.nodeArr.forEach(item => {
      this.nodeRankPc(item.type, item.nodeType)
    })
    this.nodeStandardSum = await this.nodeTypeSumNum(this.nodeStandardObj)
    this.nodeFullSum = await this.nodeTypeSumNum(this.nodeFullObj)
  },
  methods: {
    getTime,
    async nodeTypeSumNum (options) {
      const { data: { data } } = await apiNodeTypeSumNum(options)
      return data[0].sumNum
    },
    async nodeRankPc (type = 1, nodeType = 1) {
      // debugger
      const { data: { data } } = await apiNodeRankPc({
        type: type,
        node_type: nodeType
      })
      let { sumNum } = data[0]
      if (type === 2 && nodeType === 1) {
        this.nodeStandard_21 = sumNum
      } else if (type === 1 && nodeType === 1) {
        this.nodeStandard_11 = sumNum
      } else if (type === 2 && nodeType === 2) {
        this.nodeFull_22 = sumNum
      } else if (type === 1 && nodeType === 2) {
        this.nodeFull_12 = sumNum
      }
    },
    async NodeSum () {
      const { data: { data } } = await apiNodeSum()
      this.sumNum = data[0].sumNum
    },
    setContdown () {
      const timer = setInterval(() => {
        const { time, lefttime } = contdown()
        if (lefttime <= 0) {
          clearInterval(timer)
          this.time = {
            d: '00',
            h: '00',
            m: '00',
            s: '00'
          }
          return
        }
        this.time = time
      }, 1000)
    },
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
      apiNodeRank({
        'node_type': nodeType || 1,
        'pageIndex': (pageIndex - 1) * this.pageNumber,
        'pageNumber': pageSum || this.pageNumber
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
        pageSum: 1000
      })
    },
    onChangePageSize (x) {
      console.log(x, '=======')
    }

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
.news-body-title
  color $font-dark
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
.news-body-table
  width 900px
.news-body-table-btn
  padding-top 50px
  display flex
  div
    wh(240px, 60px)
    background rgba(208,224,240,1)
    border-radius 10px 10px 0px 0px
    text-align center
    line-height 60px
    color white
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
</style>
