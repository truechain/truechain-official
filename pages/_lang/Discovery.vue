<template>
  <div>
    <div class="navi-banner">
      <div>
        <Earth :shipPos="shipPos" />
        <!-- <div class="ship" :style="{
          'transform': `translate3d(${shipX}px, ${shipY}px, 0)`
        }"><Ship/></div> -->
      </div>
    </div>
    <div class="navi-intro">
      <ul>
        <li v-for="i in 3" :key="i">{{ $t(`navigation.intro[${i - 1}]`) }}</li>
      </ul>
    </div>
    <div class="navi-count-down">
      <p class="title">{{ $t('navigation.congratulate') }}</p>
      <span>2019-3-30</span>
      <!-- <p class="title">{{ $t('navigation.countdown') }}</p>
      <CountDown/> -->
    </div>
    <div class="navi-steps">
      <p class="title">{{ $t('navigation.title') }}</p>
      <hr>
      <div class="context">
        <p v-for="i in 2" :key="i">
          {{ $t(`navigation.context[${i - 1}]`) }}
        </p>
      </div>
      <ul>
        <Step @click="toggle(i - 1)" @like="like(i - 1)"
          v-for="i in 5" :key="i" :index="i - 1"
          :focus="focusIndex" :likeCount="likeCount[i - 1]" />
      </ul>
    </div>
  </div>
</template>

<script>
import * as Client from '@/components/navigation/lib/client'

import Earth from '@/components/navigation/Earth'
import Ship from '@/components/navigation/Ship'
import Step from '@/components/navigation/Step'
import CountDown from '@/components/navigation/CountDown'

const trans = ([long, lat]) => {
  // Adjusting the position of the Bering Strait
  long = (long + 540 - 12) % 360 - 180

  // Remove Antarctica from Earth
  if (lat < -59) {
    return [long, lat - 180]
  }

  return [long * (0.9 - Math.pow(lat / 270, 2)), lat - 15]
}

export default {
  name: 'Navigation',
  head () {
    return {
      title: this.$t('navigation.head.title'),
      meta: [
        { hid: 'news-keyword', name: 'keywords', content: this.$t('navigation.head.keywords') }
      ]
    }
  },
  data () {
    return {
      focusIndex: -1,
      shipPos: [88.85, 4.3],
      likeCount: [0, 0, 0, 0, 0]
    }
  },
  computed: {
    transedShipPos () {
      return trans(this.shipPos)
    },
    shipX () {
      return this.transedShipPos[0] * 3.75
    },
    shipY () {
      return -this.transedShipPos[1] * 3.75
    }
  },
  mounted () {
    Client.likeCount().then(count => {
      this.likeCount = count
    })
  },
  methods: {
    toggle (i) {
      if (this.focusIndex === i) {
        this.focusIndex = -1
      } else {
        this.focusIndex = i
      }
    },
    like (i) {
      Client.like(i).then(console.log)
      this.$set(this.likeCount, i, this.likeCount[i] + 1)
    }
  },
  components: {
    Earth,
    Ship,
    Step,
    CountDown
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/mixin.styl'

.navi-banner
  background-color $dark-blue
  >div
    max-width 1200px
    max-height 660px
    width 100vw
    height 55vw
    margin auto
    position relative
  .ship
    width 60px
    height 60px
    position absolute
    top 50%
    left 50%
.navi-intro
  background-color #f2f5fa
  ul
    display flex
    max-width 1240px
    padding 0 20px
    margin auto
    justify-content space-between
    align-items center
  li
    height 140px
    font-size 18px
    padding-left 80px
    line-height 34px
    font-weight 500
    width 330px
    color #203260
    display flex
    align-items center
    position relative
    &:before
      font-family 'font_family'
      position absolute
      font-size 70px
      top 50%
      left 0
      color #1e64b4
      transform translateY(-50%)
    &:nth-child(1):before
      content '\e650'
    &:nth-child(2):before
      content '\e64d'
    &:nth-child(3):before
      content '\e64f'
.navi-count-down
  // height 350px
  height 200px
  display flex
  flex-direction column
  justify-content center
  align-items center
  position relative
  .title
    font-size 30px
    font-weight 600
    color #2870bc
  span
    position absolute
    bottom 20px
    color #2870bc
    opacity .8
.navi-steps
  min-height 820px
  padding 60px 0
  background-color #f2f5fa
  display flex
  flex-direction column
  justify-content center
  align-items center
  .title
    font-size 40px
    font-weight 600
    color #2870bc
  hr
    border none
    height 6px
    width 100px
    border-radius 3px
    background-color $font-dark
    margin 30px 0
  ul
    width 100%
    max-width 1240px
    padding 0 20px
    margin 30px 0
    display flex
  .context
    margin 16px 0
    p
      max-width 1240px
      padding 0 20px
      font-size 16px
      line-height 32px
      color #203260
      margin 16px 0

@media screen and (max-width 500px)
  .navi-steps
    .title
      font-size 28px
    .context
      margin 10px 0
      p
        font-size 14px
        line-height 22px
        margin 10px 0

@media screen and (max-width 860px)
  .navi-intro ul
    flex-direction column

  .navi-banner >div
    width 100vw
    height 80vw
  
  .navi-steps ul
    flex-direction column
</style>
