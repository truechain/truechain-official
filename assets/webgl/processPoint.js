'use strtic'

const fs = require('fs')
const path = require('path')

const origin = require('./world-simplified.json')
// var origin = fs.readFileSync('./world-simplified.json')

const deg = Math.PI / 180
const r = 180
const longNum = 120
const latNum = 60
const dLong = 360 / longNum
const dLat = 180 / latNum

const initPoints = (world) => {
  let boundary = []
  world.map((countryInfo) => {
    const coordinates = countryInfo.coordinates
    for (let i = 0; i < coordinates.length; i++) {
      const polygon = coordinates[i]
      let lastPoint = polygon[0]
      let nextPoint = []
      for (let j = 1; j < polygon.length; j++) {
        nextPoint = polygon[j]
        const minLat = Math.min(lastPoint[1], nextPoint[1])
        const maxLat = Math.max(lastPoint[1], nextPoint[1])
        const startLat = Math.ceil(minLat / dLat) * dLat
        const k = (nextPoint[0] - lastPoint[0]) / (nextPoint[1] - lastPoint[1])
        for (let lat = startLat; lat < maxLat; lat += dLat) {
          const long = k * (lat - lastPoint[1]) + lastPoint[0]
          const index = Math.round((lat + 90) / dLat) + 1
          if (boundary[index] === undefined) {
            boundary[index] = []
          }
          boundary[index].push(long)
        }
        lastPoint = nextPoint
      }
    }
  })

  for (let i = 0; i < boundary.length; i++) {
    if (boundary[i]) {
      // boundary[i].push(-180,180)
      break
    }
    boundary[i] = [-180, 180]
  }

  const points = []
  const coords = []
  const borders = []
  boundary = boundary.map((longList, latOrder) => {
    longList.sort((a, b) => a - b)
    const lat = (latOrder + 1) * dLat - 90
    // remove arctic
    if (lat < -59) {
      return []
    }

    const minLong = longList[0]
    const maxLong = longList[longList.length - 1]
    // const dis = lat * lat / 90
    const dis = 0
    const startLong = Math.ceil((minLong - dis) / dLong) * dLong + dis
    let right = 1
    let isInside = true

    const cosLat = Math.cos(lat * deg)
    const sinLat = Math.sin(lat * deg)
    for (let long = startLong; long < maxLong; long += dLong) {
      while (long > longList[right]) {
        right++
        isInside = !isInside
      }
      if (isInside) {
        const x = r * Math.sin(long * deg) * cosLat
        const y = r * sinLat
        const z = r * Math.cos(long * deg) * cosLat
        const point = { x, y, z }
        points.push(point)
        coords.push({ long, lat })
      }
    }

    for (let i = 0; i < longList.length; i++) {
      const long = longList[i]
      const x = r * Math.sin(long * deg) * cosLat
      const y = r * sinLat
      const z = r * Math.cos(long * deg) * cosLat
      const point = { x, y, z }
      borders.push(point)
    }

    return longList
  })

  return coords
}

const coords = initPoints(origin)
const string = JSON.stringify(coords)
fs.writeFileSync(path.resolve(__dirname, './world-points.json'), string)
