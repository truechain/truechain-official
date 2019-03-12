<template>
  <div>
    <div class="navi-banner"></div>
    <div class="navi-intro">
      <ul>
        <li>解决公链最显著的问题</li>
        <li>第一代混合共识激励机制</li>
        <li>稳定、低成本的燃料费机制及首家代付机制</li>
      </ul>
    </div>
    <div class="navi-count-down">
      <p class="title">TrueChain主网距离上线还有</p>
    </div>
    <div class="navi-steps">
      <p class="title">True大航海时代</p>
      <hr>
      <ul>
        <Step v-for="i in 5" :key="i" :index="i - 1" :focus="focusIndex" />
      </ul>
    </div>
  </div>
</template>

<script>
import Step from '@/components/navigation/Step'

export default {
  name: 'Navigation',
  data () {
    return {
      focusIndex: 0
    }
  },
  components: {
    Step
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/mixin.styl'

.navi-banner
  height 650px
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
    line-height 34px
    font-weight 500
    width 250px
    color #203260
.navi-count-down
  height 350px
  display flex
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
