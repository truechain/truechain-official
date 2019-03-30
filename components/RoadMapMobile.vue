<template>
  <div>
    <div class="roadmap-box">
      <div v-for="(ti, i) in timeIndex" :key="i">
        <div class="time" @click="toggle(i)">
          <div>{{$t(`home.roadmap.content[${ti}]`)}}</div>
          <span :class="{ 'opened': show[i] }"></span>
        </div>
        <ul v-if="show[i]" class="info">
          <li v-for="(type, j) in info[i]" :key="j" :class="'node-' + type">
            <span class="point"></span>
            <span class="text">{{$t(`home.roadmap.content[${ti + 1 + j}]`)}}</span>
          </li>
          <span class="ellipsis" v-if="i === 2"></span>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoadMapMobile',
  data () {
    const timeIndex = [0, 19, 30]
    const info1 = new Array(18).fill('finished')
    const info2 = new Array(3).fill('finished')
    info2.push(...new Array(7).fill('future'))
    const info3 = new Array(4).fill('future')
    return {
      timeIndex,
      info: [info1, info2, info3],
      show: [false, false, false]
    }
  },
  methods: {
    toggle (i) {
      this.$set(this.show, i, !this.show[i])
    }
  }
}
</script>

<style lang="stylus" scoped>
.roadmap-box
  padding 60px 0 80px
  max-width 610px
  margin auto
  .time
    margin-left 40px
    margin-top 20px
    border solid 2px #203260
    border-radius 10px
    padding 6px
    cursor pointer
    position relative
    z-index 2
    &:before
      content ''
      position absolute
      top 50%
      left -42px
      width 20px
      height 20px
      border-radius 50%
      border solid 4px #20326030
      background-color #203260
      background-clip content-box
      transform translateY(-50%)
      z-index 3
    &:after
      content ''
      position absolute
      top 50%
      left -30px
      width 30px
      height 2px
      background-color #203260
      transform translateY(-50%)
    div
      border-radius 6px
      background-color #203260
      color #fff
      height 50px
      font-size 20px
      display flex
      justify-content center
      align-items center
    span
      position absolute
      top 27px
      right 30px
      width 0
      height 0
      border-top solid 8px #fff
      border-left solid 8px transparent
      border-right solid 8px transparent
      transition transform .4s
    .opened
      transform scaleY(-1)
  .info
    margin-top -33px
    padding-top 33px
    position relative
    &:before
      content ''
      width 2px
      height 100%
      background-color #2f65ad
      position absolute
      top 0
      left 9px
    li
      position relative
      margin-top 14px
      .point
        position absolute
        width 20px
        height 20px
        border solid 2px #2f65ad
        top 50%
        left 0
        border-radius 10px
        background-color #fff
        transform translateY(-50%)
        &:after
          content ''
          position absolute
          top 1px
          left 5px
          width 6px
          height 11px
          border-right solid 2px #2f65ad
          border-bottom solid 2px #2f65ad
          transform rotate(45deg)
      .text
        margin-left 40px
        border-radius 10px
        line-height 18px
        padding 11px
        font-size 14px
        color #fff
        display flex
        align-items center
        position relative
      &:before
        content ''
        position absolute
        top 50%
        left 0px
        width 40px
        height 54%
        border-top solid 2px #2f65ad
        transform translateY(-1px)
      &:last-of-type:before
        background-color #fff
    .node-finished
      .text
        background-color #2f65ad
        border solid 1px #2f65ad
        color #fff
      .point
        background-color #2f65ad
        &:after
          content ''
          border-color #fff
    .node-future
      .text
        border dashed 1px #2f65ad
        color #2f65ad
    .ellipsis
      position absolute
      left 8px
      bottom -2px
      width 4px
      height 4px
      background-color #2f65ad
      border-radius 50%
      box-shadow 0 12px 0 #2f65ad, 0 24px 0 #2f65ad
</style>
