export default function (context) {
  if (process.client) {
    setTimeout(() => {
      const existEl = document.getElementById('page_stat')
      if (existEl) { document.body.removeChild(existEl) }
      const scriptEl = document.createElement('script')
      scriptEl.type = 'text/javascript'
      scriptEl.id = 'page_stat'
      scriptEl.src = '//s19.cnzz.com/z_stat.php?id=1274893188&web_id=1274893188'
      document.body.appendChild(scriptEl)
    }, 300)
  }
}
