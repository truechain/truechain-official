<template lang="pug">
  .node-container
    .node-header
      .node-header-title
        .node-header-title1 优先节点竞选报名
        .node-header-title2 ▲
        .node-header-title3
          span 38781
          i 人
      .node-header-apply
        .node-header-apply-title 标准节点竞选已报名
        .node-header-apply-list
          ul
            li
              span 总数
              span
                i 21932
                i &nbsp;人
            li
              span 个人竞选
              span
                i 21932
                i &nbsp;人
            li
              span 组队竞选
              span
                i 21932
                i &nbsp;组
      .node-header-apply
        .node-header-apply-title 全节点竞选已报名
        .node-header-apply-list
          ul
            li
              span 总数
              span
                i 21932
                i &nbsp;人
            li
              span 个人竞选
              span
                i 21932
                i &nbsp;人
            li
              span 组队竞选
              span
                i 21932
                i &nbsp;组
      .node-header-countdown
        .node-header-countdown-title 优先节点竞选投票倒计时
        .node-header-countdown-clock
          ul
            li 87
            li 天
            li 22
            li 时
            li 59
            li 分
            li 29
            li 秒
    .node-body
      .node-body-title 优先节点竞选投票排行
      .node-body-table
        .node-body-table-btn
          div(
            :class="{ 'node-body-table-btn-avtive': nodeType === 1 }",
            @click="toggleNode(1)"
          ) 标准节点
          div(
            :class="{ 'node-body-table-btn-avtive': nodeType === 2 }",
            @click="toggleNode(2)"
            ) 全节点
        .node-body-table-header
          ul
            li
              div 排名
              div 昵称
              div 报名时间
              div TRUE数量
              div TTR得票
        .node-body-table-body
          ul
            li(
              v-for="(item, index) in list",
              :key="index"
            )
              div {{ 1 +  (pageNumber * (pageIndex)) + index}}
              div {{item.nickname}}
              //- div {{item.create_time}}
              div {{getTime(+item.create_time)}}
              div {{item.lock_num}}TRUE
              div {{item.tickets}}票
      .node-body-page
        Page(
          :total="pageSum",
          :current="currentPage",
          @on-change="onChangePage",
          @on-page-size-change="onChangePageSize"
        )

</template>

<script>
  import http from '@/service/http.js'
  import { getTime } from '@/util'

export default {
    data () {
      return {
        list: [],
        pageNumber: 10,
        pageSum: 0,
        nodeType: 1,
        pageIndex: 0,
        currentPage: 1
      }
    },
    created () {
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
        http.get('nodeRank', {
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
.node-header
  wh(100%, 1027px)
  color white
  background-image url("~@/assets/images/node_bg.jpg")
  display flex
  align-items center
  flex-direction column
  padding-top 99px
  position relative
.node-header-title
  padding-bottom 40px
  div
    text-align center
    color white
  .node-header-title1
      font-size 48px
  .node-header-title2
      text-align center
      transform rotate(180deg) scale(1.8)
      padding 35px 0
  .node-header-title3
    span
      font-size 60px
      font-weight bold
      color inherit
    i
      font-size 16px
      color inherit
      margin-left 5px
.node-header-apply
  padding 50px 0
  // background red
.node-header-apply-title
  font-size 30px
  color white
  padding-bottom 40px
  text-align center
.node-header-apply-list
  ul
    display flex
    justify-content space-around
    text-align center
    li
      display flex
      flex-direction column
      color white
      margin 0 50px
      span
        color inherit
        line-height 40px
        &:nth-child(1)
          font-size 20px
        &:nth-child(2)
          i
            color white
          i:nth-child(1)
            font-size 30px
.node-header-countdown
  wh(900px, 238px)
  background white
  border-radius 10px
  position absolute
  bottom -(238/2)px
  box-shadow:0px 2px 5px #EEEFF3
.node-header-countdown-title
  color $font-dark
  font-size 26px
  font-weight bold
  text-align center
  padding 40px 0
.node-header-countdown-clock
  display flex
  justify-content center
  color white
  ul
    display flex
    li
      line-height 93px
      margin 0 8px
    li:nth-child(even)
      color $font-dark
    li:nth-child(odd)
      wh(83px, 93px)
      background-color $dark-blue
      border-radius 5px
      text-align center

      color white
      font-weight bold
      font-size 48px
.node-body
  display flex
  flex-direction column
  align-items center
  padding-top 238px
  padding-bottom 140px
  position relative
.node-body-title
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
.node-body-table
  width 900px
.node-body-table-btn
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
.node-body-table-btn-avtive
  color $font-dark !important
  background rgba(235,242,249,1) !important
.node-body-table-body,
.node-body-table-header
  ul
    width 100%
    display flex
    li
      width 100%
      display flex
      div
        wh(0, 50px)
        text-align center
        line-height 50px
        flex-grow 1
      div:nth-child(1)
        flex-grow .5
      div:nth-child(2)
        flex-grow 2
      div:nth-child(3)
        flex-grow 1
      div:nth-child(4)
        flex-grow 1
.node-body-table-header
  background #EBF2F9
  div
    color $font-dark
.node-body-table-body
  ul
    flex-wrap wrap
    li
      font-size 14px
      height 50px
      div
        color #456C99
    li:nth-child(odd)
      background #FBFCFE
    li:nth-child(even)
      background #EBF2F9
.node-body-page
  position absolute
  right 270px
  bottom 70px
</style>
