<template>
  <div>
    <div class="navi-banner">
      <Earth/>
    </div>
    <div class="navi-intro">
      <ul>
        <li v-for="i in 3" :key="i">{{ $t(`navigation.intro[${i - 1}]`) }}</li>
      </ul>
    </div>
    <div class="navi-count-down">
      <p class="title">{{ $t('navigation.countdown') }}</p>
      <CountDown/>
    </div>
    <div class="navi-steps">
      <p class="title">{{ $t('navigation.title') }}</p>
      <hr>
      <ul>
        <Step @click="toggle(i - 1)" @like="like(i - 1)"
          v-for="i in 5" :key="i" :index="i - 1"
          :focus="focusIndex" :likeCount="likeCount[i - 1]" />
      </ul>
    </div>
  </div>
</template>

<script>
import Earth from '@/components/navigation/Earth'
import Step from '@/components/navigation/Step'
import CountDown from '@/components/navigation/CountDown'

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
  asyncData () {
    // TODO: get data from chain
    return {
      likeCount: [0, 0, 0, 0, 0]
    }
  },
  data () {
    return {
      focusIndex: -1,
    }
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
      // TODO: update count to chain
      this.$set(this.likeCount, i, this.likeCount[i] + 1)
    }
  },
  components: {
    Earth,
    Step,
    CountDown
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/mixin.styl'

.navi-banner
  height 660px
  background-color $dark-blue
.navi-intro
  background-color #f2f5fa
  ul
    display flex
    max-width 1240px
    padding 0 20px
    height 140px
    margin auto
    justify-content space-between
    align-items center
  li
    font-size 22px
    padding-left 80px
    line-height 34px
    font-weight 500
    width 330px
    color #203260
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
  height 350px
  display flex
  flex-direction column
  justify-content center
  align-items center
  .title
    font-size 30px
    font-weight 600
    color #2870bc
.navi-steps
  height 820px
  background-color #f2f5fa
  display flex
  flex-direction column
  justify-content center
  align-items center
  .title
    font-size 30px
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
    height 500px
    width 1240px
    padding 0 20px
    margin 30px 0
    display flex
</style>
