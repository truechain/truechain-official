<template>
  <div>
    <canvas id="navi-world" width="1400" height="650"></canvas>
  </div>
</template>

<script>
import coords from '@/assets/webgl/world-points.json'

export default {
  name: 'NavigationWorld',
  mounted () {
    const ctx = this.$el.querySelector('#navi-world').getContext('2d')
    ctx.fillStyle = '#5e98df'
    coords.forEach(coord => {
      ctx.beginPath()
      ctx.arc(21 + (180 + coord.long) * 3.8, 40 + (90 - coord.lat) * 3.8, 3, 0, 2 * Math.PI)
      // ctx.fillRect((180 + coord.long) * 3.3, 50 + (90 - coord.lat) * 3.3, 4, 4)
      ctx.closePath()
      ctx.fill()
    })
  }
}
</script>

<style lang="stylus" scoped>
canvas
  display block
  margin auto
</style>
