<template>
  <div class="app-button-box" @mouseleave="onleave">
    <a target="_blank" :href="url" class="app-button" @mouseenter="onenter">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="icon" viewBox="0 0 1024 1024" version="1.1" width="30" height="30">
        <path d="M921.809408 727.04c-20.48 51.2-30.72 71.68-61.44 117.76-40.96 61.44-97.28 138.24-168.96 138.24-61.44 0-76.8-40.96-163.84-40.96-87.04 0-102.4 40.96-163.84 40.96-71.68 0-122.88-71.68-163.84-133.12C87.249408 675.84 77.009408 476.16 143.569408 368.64c51.2-76.8 128-122.88 199.68-122.88 76.8 0 122.88 40.96 184.32 40.96 61.44 0 97.28-40.96 184.32-40.96 66.56 0 133.12 35.84 184.32 97.28-163.84 87.04-138.24 322.56 25.6 384z m-266.24-563.2c-30.72 46.08-87.04 81.92-143.36 81.92-10.24-61.44 15.36-122.88 46.08-163.84C594.129408 35.84 650.449408 0 701.649408 0c10.24 61.44-15.36 122.88-46.08 163.84z"/>
      </svg>
      <span>IOS</span>
    </a>
    <div class="app-button-qrcode" :class="{'app-button-qrcode-show': showQRCode}">
      <div>
        <!-- <img src="~@/assets/images/iosQR.png"> -->
        <img src="~@/assets/images/downloadQR.png">
      </div>
    </div>
  </div>
</template>

<script>
// const url = 'http://wapxk.com/wapindex-1000-6879.html'
// const url = 'https://www.truechain.pro/download/truewallet.html'
const url = 'https://dapp.truedapp.net/appdown'

export default {
  name: 'app-ios',
  data () {
    return {
      showQRCode: false,
      url
    }
  },
  methods: {
    onenter () {
      this.showQRCode = true
    },
    onleave () {
      this.showQRCode = false
    }
  }
}
</script>

<style lang="stylus">
@import '~@/assets/stylus/common/app-button.styl'
</style>
