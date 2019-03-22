<template>
  <div class="navi-count-down-box">
    <ul class="days" v-if="true">
      <li v-for="(num, index) in numbers" :key="index">
        <Numebr :num="num" />
      </li>
      <span>{{ $t('node.day') }}</span>
    </ul>
    <ul class="days" v-else>
      <li v-for="(num, index) in hour" :key="index">
        <Numebr :num="num" />
      </li>
      <span>{{ $t('node.hour') }}</span>
      <li v-for="(num, index) in minute" :key="index + 2">
        <Numebr :num="num" />
      </li>
      <span>{{ $t('node.minute') }}</span>
      <li v-for="(num, index) in second" :key="index + 4">
        <Numebr :num="num" />
      </li>
      <span>{{ $t('node.second') }}</span>
    </ul>
  </div>
</template>

<script>
import Numebr from './Number'

const endTime = 1553961600000 // 2013.3.30 12:00:00 GMT+0800

export default {
  name: 'NavigationCountDown',
  data () {
    const diff = Math.max(Math.floor((endTime - Date.now()) / 1000), 0)
    const day = Math.floor(diff / 86400)
    const second = diff % 60
    const minute = Math.floor(diff / 60) % 60
    const hour = Math.floor(diff / 3600) % 24
    const stiv = setInterval(() => {
      this.updateTime()
    }, 1000)
    return {
      day,
      second: [Math.floor(second / 10), second % 10],
      minute: [Math.floor(minute / 10), minute % 10],
      hour: [Math.floor(hour / 10), hour % 10],
      numbers: day.toString().split('').map(item => Number(item)),
      stiv
    }
  },
  methods: {
    updateTime () {
      let needLoan = this.inc(this.second, 1, 10)
      if (needLoan) {
        needLoan = this.inc(this.second, 0, 6, 200)
      }
      if (needLoan) {
        needLoan = this.inc(this.minute, 1, 10, 400)
      }
      if (needLoan) {
        needLoan = this.inc(this.minute, 0, 6, 600)
      }
      if (needLoan) {
        needLoan = this.inc(this.hour, 1, 10, 800)
      }
      if (needLoan) {
        needLoan = this.inc(this.hour, 0, 0, 1000)
      }
      if (needLoan) {
        clearInterval(this.stiv)
        this.second = [0, 0]
        this.minute = [0, 0]
        this.hour = [0, 0]
      }
    },
    inc (array, index, radix, delay = 0) {
      let needLoan = false
      let newValue = array[index] - 1
      if (newValue < 0) {
        newValue += radix
        needLoan = true
      }
      setTimeout(() => {
        this.$set(array, index, newValue)
      }, delay)
      return needLoan
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
