<template>
  <div>
    <ul class="roadmap-box" :style="{
      'width': `${col * 180}px`
    }">
      <li v-for="(type, i) in road" :key="i" :class="[
        !(Math.floor(i / col) % 2) ? 'fl' : 'rl',
        'node-' + type
      ]">
        <span v-if="type === 'time'" class="time">{{$t(`home.roadmap.content[${i}]`)}}</span>
        <span v-else class="text">{{$t(`home.roadmap.content[${i}]`)}}</span>
        <span class="point"></span>
      </li>
      <div v-for="i in Math.ceil(road.length / col) - 1" :key="'bar' + i"
        class="turn" :class="[
          !(i % 2) ? 'turn-left' : 'turn-right'
        ]" :style="{ 'top': `${300 * i - 151}px` }">
      </div>
    </ul>
    <div style="clear: both;"></div>
  </div>
</template>

<script>
const road = []
road.push('time')
road.push(...new Array(18).fill('finished'))
road.push('time')
road.push(...new Array(2).fill('finished'))
road.push(...new Array(9).fill('future'))
road.push('time')
road.push(...new Array(4).fill('future'))

export default {
  name: 'RoadMap',
  data () {
    return {
      col: 6,
      road
    }
  },
  mounted () {
    this.col = Math.min(6, Math.floor((window.innerWidth - 160) / 180)) || 1
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onResize () {
      this.col = Math.min(6, Math.floor((window.innerWidth - 160) / 180)) || 1
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>


<style lang="stylus" scoped>
.roadmap-box
  // display flex
  // flex-flow wrap
  // justify-content center
  box-sizing content-box
  padding 0 60px
  margin auto
  position relative
  font-size 14px
  .fl
    float left
    &:nth-child(even)
      .text
        bottom 180px
        &:after
          bottom -30px
    &:nth-child(odd)
      .text
        top 180px
        &:after
          top -30px
    &:last-of-type:after
      content ''
      position absolute
      top 148px
      right -12px
      width 4px
      height 4px
      background-color #4267a9
      border-radius 50%
      box-shadow 12px 0 0 #4267a9, 24px 0 0 #4267a9
  .rl
    float right
    &:nth-child(even)
      .text
        top 180px
        &:after
          top -30px
    &:nth-child(odd)
      .text
        bottom 180px
        &:after
          bottom -30px
    &:last-of-type:after
      content ''
      position absolute
      top 148px
      left -12px
      width 4px
      height 4px
      background-color #4267a9
      border-radius 50%
      box-shadow -12px 0 0 #4267a9, -24px 0 0 #4267a9
  li
    flex 0 0 180px
    width 180px
    height 300px
    position relative
    &:before
      content ''
      position absolute
      height 2px
      width 180px
      background-color #4267a9
      top 149px
      left 0
    &:first-child:before
      width 230px
      left -50px
    .point
      position absolute
      width 20px
      height 20px
      border solid 2px #4267a9
      top 150px
      left 90px
      border-radius 10px
      background-color #fff
      transform translate3d(-50%, -50%, 0)
      &:after
        content ''
        position absolute
        top 1px
        left 5px
        width 6px
        height 11px
        border-right solid 2px #4267a9
        border-bottom solid 2px #4267a9
        transform rotate(45deg)
    .time
      position absolute
      top 180px
      width 100%
      text-align center
      color #4267a9 
      &:after
        content '\e622'
        position absolute
        top -90px
        left 79px
        font-family 'font_family'
        font-size 60px
        color #2f65ad
    .text
      position absolute
      width 220px
      min-height 60px
      border-radius 10px
      line-height 18px
      padding 11px
      left -20px
      display flex
      align-items center
      &:after
        content ''
        position absolute
        width 2px
        height 30px
        background-color #4267a9
        left 109px
  .node-finished
    .text
      background-color #4267a9
      border solid 1px #4267a9
      color #fff
    .point
      background-color #4267a9
      &:after
        content ''
        border-color #fff
  .node-future
    .text
      border dashed 1px #4267a9
      color #4267a9
  .node-time
    .point
      width 14px
      height 14px
      background-color #4267a9
      &:after
        content none
  .turn
    position absolute
    width 50px
    height 302px
    border solid 2px #4267a9
  .turn-right
    border-radius 0 30px 30px 0
    border-left none
    right 10px
  .turn-left
    border-radius 30px 0 0 30px
    border-right none
    left 10px
</style>
