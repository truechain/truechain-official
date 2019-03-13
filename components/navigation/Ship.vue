<template>
  <svg id="navi-ship" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 200 200" xml:space="preserve">
    <path d="M99.8,61.1L99,67l-20.8-0.7c34.4,12.7,62.6,29.9,100.6,33.3v-2.4l-16.4-3.9L156.2,81l-3.3-12.7l0.1-5.6l-43.2-22.9
      c-20.7-4.1-32.7-4.2-53.4-0.2L51.3,58c3.4,0.8,6.7,1.7,9.9,2.7C61.2,60.6,99.8,61.1,99.8,61.1z M119.8,73.8l-13.2-5.7l-0.2-6.8
      l13.4,6.7L119.8,73.8L119.8,73.8z M137.2,62.5l11.4,6v4.3l-11.4-5.5V62.5z M137.1,76.6l15.4,6v4.4l-15.4-5.6L137.1,76.6L137.1,76.6z
      M124.3,56.1l9.4,4.6v5.1l-9.4-4.1C124.3,61.7,124.3,56.1,124.3,56.1z M124.3,70.2l9.4,4.6v5l-9.4-4.1
      C124.3,75.8,124.3,70.2,124.3,70.2z M119.8,53.8v5.9l-13.5-5.9l-0.2-6.8L119.8,53.8z M58.1,46.4l44,0.6l-0.9,5.9l-44-1.6
      C57.2,51.3,58.1,46.4,58.1,46.4z"/>
    <path d="M168.7,150.5c2-1.5,5.5-6.7,6.4-8.8c6.2-12.8,12.3-27.2,12.5-37.3c-33,0.4-70.8-15-103.4-27.1s-59.8-21.1-71.4-7.7
    c-3,31.4,19.3,35.4,25.8,69.9c0.9,4.3,1.1,6.4,1.1,7L168.7,150.5z"/>
    <path d="M-74,132c15,0,22,16,37,16s22,-16,37,-16s22,16,37,16s22,-16,37,-16s22,16,37,16s22,-16,37,-16s22,16,37,16s22,-16,37,-16" class="shadow"/>
    <path d="M-74,142c15,0,22,16,37,16s22,-16,37,-16s22,16,37,16s22,-16,37,-16s22,16,37,16s22,-16,37,-16s22,16,37,16s22,-16,37,-16" class="line"/>
  </svg>
</template>

<script>
export default {
  name: 'NavigationShip',
  data () {
    return {
      raf: null
    }
  },
  mounted () {
    this.raf = requestAnimationFrame(this.update)
  },
  methods: {
    update (time) {
      // this.k = Math.sin(time / 400) * 8
      this.raf = requestAnimationFrame(this.update)
    }
  },
  beforeDestroy () {
    if (this.raf) {
      cancelAnimationFrame(this.raf)
    }
  }
}
</script>

<style lang="stylus" scoped>
#navi-ship
  width 100%
  height 100%
  fill #fff
  transform translate3d(-50%, -50%, 0)
  .line
    fill none
    stroke #fff
    stroke-width 10
    stroke-linecap round
    animation move 1s linear infinite
  .shadow
    fill none
    stroke #203260
    stroke-width 10
    stroke-linecap round
    animation move 1s linear infinite
@keyframes move
  from
    transform translateX(0)
  to
    transform translateX(74px)
</style>
