<template>
  <div class="navi-count-down-box">
    <ul class="days" v-if="day >= 1">
      <li v-for="(num, index) in numbers" :key="index">
        <Numebr :num="num" />
      </li>
      <span>{{ $t('node.day') }}</span>
    </ul>
  </div>
</template>

<script>
import Numebr from './Number'

const endTime = 1553918400000 // 2013.3.30 12:00:00 GMT+0800

export default {
  name: 'NavigationCountDown',
  data () {
    const day = Math.floor((endTime - new Date().getTime()) / 86400000)
    return {
      day,
      numbers: day.toString().split('').map(item => Number(item))
    }
  },
  components: {
    Numebr
  }
}
</script>

<style lang="stylus" scoped>
.navi-count-down-box
  margin-top 30px
.days
  display flex
  align-items flex-end
  span
    color #2870bc
    margin 0 3px
</style>
