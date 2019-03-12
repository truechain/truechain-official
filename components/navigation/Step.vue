<template>
  <li class="navi-step-box" :class="{ 'navi-stpe-open': open }">
    <transition name="fade">
    <div class="navi-step-default" v-if="!open">
      <transition name="fade-delay">
        <div class="content" v-if="focus === -1">
          <i class="font_family icon-chuan"></i>
          <span class="title">{{ $t(`navigation.stpes[${index}].name`) }}</span>
          <span class="summary">{{ $t(`navigation.stpes[${index}].summary`) }}</span>
        </div>
      </transition>
      <transition name="fade-delay">
        <div class="content" style="width: 40px;" v-if="close">
          <span class="title">{{ $t(`navigation.stpes[${index}].name`) }}</span>
        </div>
      </transition>
    </div>
    </transition>
  </li>
</template>

<script>
export default {
  name: 'NavigationStep',
  props: {
    index: Number,
    focus: Number
  },
  computed: {
    open () {
      return this.index === this.focus
    },
    close () {
      return this.index !== this.focus && this.focus !== -1
    }
  }
}
</script>

<style lang="stylus" scoped>
.navi-step-box
  height 500px
  flex 1 1 100px
  background-color #2870bc
  margin 0 6px
  border-radius 10px
  position relative
  transition flex 1s
.navi-stpe-open
  flex 0 1 800px
.navi-step-default
  position relative
  margin 2px
  background-color #fff
  border-radius 8px
  height 496px
  overflow hidden
  .content
    position absolute
    top 0
    left 50%
    width 160px
    height 100%
    text-align center
    display flex
    flex-direction column
    justify-content center
    transform translateX(-50%)
  i
    display block
    font-size 80px
    color #2870bc
  .title
    font-size 28px
    font-weight 500
    line-height 46px
    color #2870bc
    margin 26px 0
  .summary
    margin-top 90px
    font-size 22px
    line-height 30px
    font-weight 500
    color #2870bc

.fade-delay-enter, .fade-delay-leave-to
  opacity 0
.fade-delay-enter-active
  transition all .6s .2s
.fade-delay-leave-active
  transition all .4s
</style>
