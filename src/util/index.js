/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

function addZero (i) {
  return i < 10 ? `0${i}` : i
}

export const getTime = time => {
  const date = new Date(time)
  const Y = date.getFullYear() + '-'
  const M = addZero(date.getMonth() + 1) + '-'
  const D = addZero(date.getDate()) + ' '
  const h = addZero(date.getHours()) + ':'
  const m = addZero(date.getMinutes()) + ':'
  const s = addZero(date.getSeconds())
  return Y + M + D + h + m + s
}

export const contdown = time => {
  let nowtime = new Date()
  let endtime = new Date('2018/8/16,00:00:00')
  let lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000)
  let d = parseInt(lefttime / (24 * 60 * 60))
  let h = parseInt(lefttime / (60 * 60) % 24)
  let m = parseInt(lefttime / 60 % 60)
  let s = parseInt(lefttime % 60)
  d = addZero(d)
  h = addZero(h)
  m = addZero(m)
  s = addZero(s)
  return {
    time: {
      d,
      h,
      m,
      s
    },
    lefttime
  }
}
