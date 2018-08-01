<template lang="pug">
  .node-container
    #particles-js-node
    .node-bg
      img(src="~assets/images/home-banner3bg.jpg")
    .node-header
      .node-header-title
        .node-header-title1 {{$t('node.title')}}
        .node-header-title2
        .node-header-title3
          span {{sumNum}}
          i {{$t('node.person')}}
      .node-header-apply
        .node-header-apply-title {{$t('node.StandardSum')}}
        .node-header-apply-list
          ul
            li
              span {{$t('node.sumNum')}}
              span
                i {{nodeStandardSum}}
                i &nbsp;{{$t('node.person')}}
            li
              span {{$t('node.personalCampaign')}}
              span
                i {{nodeStandard_11}}
                i &nbsp;{{$t('node.person')}}
            li
              span {{$t('node.teamCampaign')}}
              span
                i {{nodeStandard_21}}
                i &nbsp;{{$t('node.team')}}
      .node-header-apply
        .node-header-apply-title {{$t('node.nodeFullSum')}}
        .node-header-apply-list
          ul
            li
              span {{$t('node.sumNum')}}
              span
                i {{nodeFullSum}}
                i &nbsp;{{$t('node.person')}}
            li
              span {{$t('node.personalCampaign')}}
              span
                i {{nodeFull_12}}
                i &nbsp;{{$t('node.person')}}
            li
              span {{$t('node.teamCampaign')}}
              span
                i {{nodeFull_22}}
                i &nbsp;{{$t('node.team')}}
      .node-header-countdown
        .node-header-countdown-title {{$t('node.timeDownCampaign')}}
        .node-header-countdown-clock
          ul.ellipsis
            li {{time.d}}
            li {{$t('node.day')}}
            li {{time.h}}
            li {{$t('node.hour')}}
            li {{time.m}}
            li {{$t('node.minute')}}
            li {{time.s}}
            li {{$t('node.second')}}
    .node-body
      // .node-body-title {{$t('node.nodeRank')}}
      .page-title {{$t('node.nodeRank')}}
      .node-body-table
        .node-body-table-btn
          div(
            :class="{ 'node-body-table-btn-avtive': nodeType === 1 }",
            @click="toggleNode(1)"
          ) {{$t('node.nodeStandard')}}
          div(
            :class="{ 'node-body-table-btn-avtive': nodeType === 2 }",
            @click="toggleNode(2)"
            ) {{$t('node.nodeFull')}}
        .node-body-table-header
          ul
            li
              div {{$t('node.tableRank')}}
              div {{$t('node.tableNickname')}}
              div {{$t('node.tableTime')}}
              //- div TRUE数量
              div {{ nodeType === 1 ? $t('node.tableScore') : 'TTR' + $t('node.tableTickets')}}
        .node-body-table-body
          ul
            li(
              v-for="(item, index) in list",
              :key="index"
            )
              div {{ 1 +  (pageNumber * (pageIndex)) + index}}
              div
                span(:class="{ tag: item.type === 1 }") {{item.nickname}}
              div.ellipsis {{getTime(+item.create_time)}}
              //- div {{item.lock_num}}TRUE
              template(v-if="nodeType === 1")
                div {{item.score}}分
              template(v-else)
                div {{item.tickets}}票
      .node-body-page
        Page(
          :total="pageSum",
          :current="currentPage",
          @on-change="onChangePage"
        )

</template>

<script>

import { getTime, contdown } from '~/util/index.js'
// console.log(getTime);

import { apiNodeRank, apiNodeSum, apiNodeRankPc, apiNodeTypeSumNum } from '@/api'
export default {
  head () {
    return {
      title: this.$t('node.head.title'),
      meta: [
        { hid: 'node-keyword', name: 'keyword', content: this.$t('node.head.keyword') },
        { hid: 'node-description', name: 'description', content: this.$t('node.head.description') }
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
      const { data: { data }} = await apiNodeTypeSumNum(options)
      return data[0].sumNum
    },
    async nodeRankPc (type = 1, nodeType = 1) {
      // debugger
      const { data: { data }} = await apiNodeRankPc({
        type: type,
        node_type: nodeType
      })
      const { sumNum } = data[0]
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
      const { data: { data }} = await apiNodeSum()
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
        'pageNumber': pageSum || this.pageNumber,
        'isScore': this.nodeType === 1
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
    }
  }
}
</script>

<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'
@media screen and (max-width 1024px)
  .node-body
    width 90% !important
  .node-body-table-body,
  .node-body-table-header
    div
      wh(0, 60px)
      text-align center
      line-height 60px
      flex-grow 1
    div:nth-child(1)
      flex-grow 0.5
      width auto !important
    div:nth-child(2)
      text-align left
      box-sizing border-box
      flex-grow 0
      width auto !important
    div:nth-child(3)
      flex-grow 1
      margin 0 5px
    div:nth-child(4)
      flex-grow 1
  .node-header
    padding-top 50px !important
  .node-header-countdown
    width 90% !important
    height 200px !important
  .node-header-title1
    font-size 30px !important
  .node-header-title3
    font-size 25px !important
  .node-header-apply-title
    font-size 20px !important
  .node-header-apply
    padding  0 !important
  .node-header-apply-list
    ul
      flex-direction column
  .node-header-countdown-clock
    ul
      display flex
      li
        line-height 40px !important
        margin 0 5px !important
      li:nth-child(odd)
        width 40px !important
        height 40px !important
        font-size 20px !important
.node-container
  position relative
#particles-js-node
  wh(100%, 1027px)
  background-color $dark-blue
  position absolute
  z-index 150
  top 0
  left 0
  right 0
  bottom 0
.node-bg
  wh(100%, 1027px)
  background-color $dark-blue
  position absolute
  z-index 160
  top 0
  left 0
  right 0
  bottom 0

.node-header
  wh(100%, 1027px)
  display flex
  align-items center
  flex-direction column
  padding-top 100px
  position relative
  z-index 180
.node-header-title
  padding-bottom 40px
  div
    text-align center
    color white
.node-header-title1
    font-size 48px
    font-weight 600
.node-header-title2
    width 0
    height 0
    border-left 10px solid transparent
    border-right 10px solid transparent
    border-top 15px solid white
    margin 20px auto
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
  width 100%
.node-header-apply-title
  font-size 30px
  color white
  padding-bottom 40px
  text-align center
.node-header-apply-list
  // background green
  margin 0 auto
  width 50%
  ul
    display flex
    justify-content space-around
    text-align center
    width 100%
    // background red
    li
      display flex
      flex-direction column
      color white
      margin 0 10px
      span
        color inherit
        white-space nowrap
        line-height 40px
        &:nth-child(1)
          font-size 20px
        &:nth-child(2)
          i
            color white
          i:nth-child(1)
            font-size 30px
.node-header-countdown
  wh(62%, 238px)
  background white
  border-radius 10px
  position absolute
  // bottom -20px
  bottom -(238/2)px
  box-shadow:0px 5px 5px rgba(11,23,73,0.15)
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
  padding-bottom 170px
  position relative
  width 62%
  margin 0px auto
.node-body-table
  width 100%
.node-body-table-btn
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
    font-weight bold
    border 1px solid #DAE2EB
    box-sizing border-box
    border-bottom 0
.node-body-table-btn-avtive
  color $font-dark !important
  background $bg-pearlblue !important
  border 0 !important
.node-body-table-body,
.node-body-table-header
  ul
    width 100%
    display flex
    li
      width 100%
      display flex
      div
        wh(0, 60px)
        text-align center
        line-height 60px
        flex-grow 1
      div:nth-child(1)
        flex-grow 0.5
        width 160px
      div:nth-child(2)
        text-align left
        box-sizing border-box
        flex-grow 0
        width 240px
      div:nth-child(3)
        flex-grow 1
      div:nth-child(4)
        flex-grow 1
.node-body-table-header
  background $bg-pearlblue
  font-weight 800
  div
    color $font-dark
.node-body-table-body
  ul
    flex-wrap wrap
    li
      font-size 14px
      div
        color #456C99
      .tag
        position relative
        height 100%
        &:after
          width 40px
          height 20px
          content '个人'
          line-height 20px
          position absolute
          right -45px
          top 50%
          border-radius 10px
          text-align center
          font-size 10px
          color white
          transform translateY(-50%) scale(.8)
          background-color #1E64B4

    li:nth-child(odd)
      background #FBFCFE
    li:nth-child(even)
      background $bg-pearlblue
.node-body-page
  position absolute
  right 0px
  bottom 100px
</style>
