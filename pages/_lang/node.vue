<template lang="pug">
  .node-container
    .node-bg
      img(src="~assets/images/home-banner3bg.jpg")
      .node-header
        .node-header-title
          .node-header-title1 {{$t('node.head.title')}}
        .node-header-block
          p {{$t('node.head.text1')}}
          br
          p {{$t('node.head.text2')}}
          br
          p {{$t('node.head.text3')}}
          p {{$t('node.head.text4')}}
          p {{$t('node.head.text5')}}
          p {{$t('node.head.text6')}}
          p {{$t('node.head.text7')}}
          br
          br
          p(style="text-align:right;") {{$t('node.head.text8')}}
          p(style="text-align:right;") {{$t('node.head.text9')}}
    .node-body
      // .node-body-title {{$t('node.nodeRank')}}
      .page-title {{$t('node.nodeRank')}}
      .node-body-table
        .node-body-table-btn
          div(
            :class="{ 'node-body-table-btn-avtive': nodeType === 1 && isEligibility === 1 }",
            @click="toggleNode(1,1)"
          ) {{$t('node.nodeStandard')}}
          div(
            :class="{ 'node-body-table-btn-avtive': nodeType === 2 && isEligibility === 1 }",
            @click="toggleNode(2,1)"
            ) {{$t('node.nodeFull')}}
          div(
            :class="{ 'node-body-table-btn-avtive': nodeType === 1 && isEligibility === 0  }",
            @click="toggleNode(1,0)"
          ) {{$t('node.nodeStandard')}}{{$t('node.notPass')}}
          div(
            :class="{ 'node-body-table-btn-avtive': nodeType === 2 && isEligibility === 0  }",
            @click="toggleNode(2,0)"
            ) {{$t('node.nodeFull')}}{{$t('node.notPass')}}
        .node-body-table-header
          ul
            li
              div {{$t('node.tableRank')}}
              div {{$t('node.tableNickname')}}
              div {{$t('node.tableTime')}}
              div {{$t('node.result')}}
              //- div {{ nodeType === 1 ? $t('node.tableScore') : 'TTR' + $t('node.tableTickets')}}
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
              //- div {{item.lock_num}}TRUE icon-tongguo
              div
                i(
                  class="icon font_family"
                  :class="item.is_eligibility === 1?'icon-tongguo':'icon-butongguo' "
                )
              //- template(v-if="nodeType === 1")
              //-   div {{item.score}}分
              //- template(v-else)
              //-   div {{item.tickets}}票
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
        { hid: 'node-keyword', name: 'keywords', content: this.$t('node.head.keywords') },
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
      isEligibility:1,
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
    // this.setContdown() //倒计时方法
    // this.NodeSum()
    // this.nodeArr.forEach(item => {
    //   this.nodeRankPc(item.type, item.nodeType)
    // })
    // this.nodeStandardSum = await this.nodeTypeSumNum(this.nodeStandardObj)
    // this.nodeFullSum = await this.nodeTypeSumNum(this.nodeFullObj)
  },
  methods: {
    getTime,
    // async nodeTypeSumNum (options) {
    //   const { data: { data }} = await apiNodeTypeSumNum(options)
    //   console.log(data)
    //   return data[0].sumNum
    // },
    // async nodeRankPc (type = 1, nodeType = 1) {
    //   // debugger
    //   const { data: { data }} = await apiNodeRankPc({
    //     type: type,
    //     node_type: nodeType
    //   })
    //   const { sumNum } = data[0]
    //   if (type === 2 && nodeType === 1) {
    //     this.nodeStandard_21 = sumNum
    //   } else if (type === 1 && nodeType === 1) {
    //     this.nodeStandard_11 = sumNum
    //   } else if (type === 2 && nodeType === 2) {
    //     this.nodeFull_22 = sumNum
    //   } else if (type === 1 && nodeType === 2) {
    //     this.nodeFull_12 = sumNum
    //   }
    // },
    // async NodeSum () {
    //   const { data: { data }} = await apiNodeSum()
    //   this.sumNum = data[0].sumNum
    // },
    // setContdown () {
    //   const timer = setInterval(() => {
    //     const { time, lefttime } = contdown()
    //     if (lefttime <= 0) {
    //       clearInterval(timer)
    //       this.time = {
    //         d: '00',
    //         h: '00',
    //         m: '00',
    //         s: '00'
    //       }
    //       return
    //     }
    //     this.time = time
    //   }, 1000)
    // },
    toggleNode (x,isEligibility) {
      this.nodeType = x
      this.isEligibility = isEligibility
      this.pageIndex = 0
      this.onFetchSumPage(x,isEligibility)
      this.fetchData({
        nodeType: x,
        isEligibility
      })
    },
    fetchData (obj = {}) {
      const { pageSum, nodeType, pageIndex = 1, isEligibility } = obj
      this.pageIndex = pageIndex - 1
      apiNodeRank({
        'node_type': nodeType || 1,
        'pageIndex': (pageIndex - 1) * this.pageNumber,
        'pageNumber': pageSum || this.pageNumber,
        'isScore': this.nodeType === 1,
        'isEligibility': isEligibility
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
        nodeType: this.nodeType,
        isEligibility:this.isEligibility
      })
    },
    onFetchSumPage (x,isEligibility) {
      this.fetchData({
        nodeType: x,
        pageSum: 1000,
        isEligibility
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'
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
  wh(100%, 1000px)
  border-bottom 1px solid rgba(250,250,250,0.2)
  background-color $dark-blue
  position relative
  z-index 160
  top 0
  left 0
  right 0
  bottom 0

.node-header
  wh(100%, 1000px)
  display flex
  top 0px
  left 0px
  right 0px
  align-items center
  flex-direction column
  padding-top 100px
  position absolute
  z-index 180
.node-header-title
  padding-bottom 40px
  div
    text-align center
    color white
.node-header-title1
    font-size 38px
    font-weight 600
    position relative
    &::after
      border 15px solid
      border-color white transparent transparent transparent
      content ''
      display inline-block
      position absolute
      top 90px
      left 49%
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
.node-header-block
  max-width 1200px
  padding 60px 100px
  background-color rgba(255,255,255,0.1)
  margin-top 50px
  color white
  line-height 28px
  border-radius 10px
  p
    color white
    font-size 18px
    line-height 34px

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
  // display flex
  display none
  flex-direction column
  align-items center
  padding-top 80px
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
.icon-tongguo
  font-size 30px
  color #78c06e
.icon-butongguo
  font-size 30px
  color #f02c2c
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
    padding-bottom 30px
    overflow scroll
  .node-header-block
    padding 30px 15px
    margin-left 15px
    margin-right 15px
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
</style>
