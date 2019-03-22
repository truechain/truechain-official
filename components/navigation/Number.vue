<template>
  <div class="navi-number-box">
    <span>{{ num }}</span>
    <div class="turn-top" :class="{ 'top-move': this.num !== this.last }">
      <span>{{ last }}</span>
    </div>
    <div class="turn-bottom turn-bottom-static">
      <span>{{ last }}</span>
    </div>
    <div class="turn-bottom turn-bottom-move" :class="{ 'bottom-move': this.num !== this.last }">
      <span>{{ num }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationNumber',
  props: {
    num: Number
  },
  data () {
    return {
      last: this.num
    }
  },
  watch: {
    num () {
      setTimeout(() => {
        this.last = this.num
      }, 850)
    }
  }
}
</script>

<style lang="stylus" scoped>
.navi-number-box
  width 72px
  height 96px
  margin 0 3px
  border-radius 3px
  background-color #2870bc
  font-size 72px
  line-height 96px
  text-align center
  position relative
  &:before
    content ''
    width 100%
    height 2px
    position absolute
    top 47px
    left 0
    background-color #fff
  span
    color #fff
  .turn-top
    width 72px
    height 47px
    background-color #2870bc
    position absolute
    top 0px
    left 0
    border-radius 3px 3px 0 0
    transform-origin 50% 100%
    overflow hidden
  .turn-bottom
    width 72px
    height 47px
    background-color #2870bc
    position absolute
    top 49px
    left 0
    border-radius 0 0 3px 3px
    border-bottom solid 1px #fff
    transform-origin 50% 0
    overflow hidden
    span
      transform translateY(-49px)
  .turn-bottom-static
    transform scaleY(0.97)
  .turn-bottom-move
    transform scaleY(0)

  .top-move
    animation 0.4s ease-in forwards top
  .bottom-move
    animation 0.4s ease-out 0.4s forwards bottom

@keyframes top
  from
    transform scaleY(1)
  to
    transform scaleY(0)

@keyframes bottom
  from
    transform scaleY(0)
  to
    transform scaleY(0.97)
</style>
