export default function (context) {
  if (process.client) {
    setTimeout(() => {
      console.log('baidu Analyse')
      var _hmt = _hmt || [];
      (function () {
        var hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?8761a8148f5feac9a7311c0689657f53'
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
      })()
    }, 250)
  }
}
