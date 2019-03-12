<template>
  <li @click="onClick" class="navi-step-box" :class="{ 'navi-stpe-box-open': open }">
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
    <transition name="fade">
      <div class="navi-step-open" v-if="open">
        <span class="border"/>
        <span class="border"/>
        <div class="content">
          <span class="title">{{ $t(`navigation.stpes[${index}].name`) }}</span>
          <span class="summary">{{ $t(`navigation.stpes[${index}].summary`) }}</span>
          <p class="intro" v-if="intro">{{ intro }}</p>
          <span class="lock" v-else>{{ $t('navigation.locked') }}</span>
          <span class="like" :class="{ 'liked': liked }" @click="like">{{likeCount}}</span>
        </div>
      </div>
    </transition>
  </li>
</template>

<script>
export default {
  name: 'NavigationStep',
  props: {
    index: Number,
    focus: Number,
    likeCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      liked: false
    }
  },
  computed: {
    open () {
      return this.index === this.focus
    },
    close () {
      return this.index !== this.focus && this.focus !== -1
    },
    intro () {
      return this.$t(`navigation.stpes[${this.index}].intro`)
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    },
    like (e) {
      e.stopPropagation()
      if (!this.liked) {
        this.liked = true
        this.$emit('like')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.navi-step-box
  height 500px
  flex 1 0 85px
  background-color #2870bc
  margin 0 6px
  border-radius 10px
  position relative
  transition flex 1s
.navi-stpe-box-open
  flex 0 0 800px
.navi-step-default
  position absolute
  top 0
  left 0
  width calc(100% - 4px)
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

.navi-step-open
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  .border
    position absolute
    top -18px
    width 24px
    height 536px
    border-radius 4px
    border solid 2px #2870bc
    background-color #fff
    &:before
      content ''
      position absolute
      width 12px
      height 6px
      background-color #2870bc
      left 4px
      top -8px
    &:after
      content ''
      position absolute
      width 12px
      height 6px
      background-color #2870bc
      left 4px
      bottom -8px
    &:first-of-type
      left 0
    &:last-of-type
      right 0
  .content
    position absolute
    top 0
    left 50%
    width 800px
    height 100%
    padding 30px 40px
    display flex
    flex-direction column
    transform translateX(-50%)
  .title
    text-align center
    font-size 28px
    font-weight 500
    line-height 46px
    color #fff
  .summary
    text-align center
    font-size 18px
    line-height 30px
    font-weight 500
    margin 10px 0 20px
    color #fff
  .intro
    white-space pre-line
    font-size 14px
    line-height 20px
    color #fff
  .lock
    color #2870bc
    width 150px
    height 150px
    border-radius 75px
    margin 60px auto 0
    background-color #fff
    display flex
    flex-direction column
    justify-content center
    align-items center
    font-size 14px
    line-height 24px
    &:before
      content '\e7cb'
      font-family 'font_family'
      font-size 80px
      line-height 80px
  .like
    color #fff
    display block
    position absolute
    bottom 30px
    left 50%
    transform translateX(-50%)
    cursor pointer
    &:before
      content '\e651'
      font-family 'font_family'
      position absolute
      top -32px
      left 50%
      transform translateX(-50%)
      font-size 28px
  .liked:before
    animation like .6s
    content '\e64e'

@keyframes like
  0%
    transform translateX(-50%) scale(1)
  50%
    transform translateX(-50%) scale(1.3)
  100%
    transform translateX(-50%) scale(1)

.fade-delay-enter, .fade-delay-leave-to
  opacity 0
.fade-delay-enter-active
  transition all .6s .2s
.fade-delay-leave-active
  transition all .4s
</style>
