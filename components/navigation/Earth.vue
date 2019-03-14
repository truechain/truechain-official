<template>
  <div class="navi-earth" @click="toggle"
    @mousemove="moveCamera" @mouseleave="resetCamera">
    <div class="navi-earth-plane" :class="{ 'navi-earth-ball': isBall }"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Mesh,
} from 'three'

import InstancedPointsGeometry from '@/assets/webgl/InstancedPointsGeometry'
import InstancedPointsMaterial from '@/assets/webgl/InstancedPointsMaterial'

import coords from '@/assets/webgl/world-points.json'

const deg = Math.PI / 180

const trans = ([long, lat]) => {
  // Adjusting the position of the Bering Strait
  long = (long + 540 - 12) % 360 - 180

  // Remove Antarctica from Earth
  if (lat < -59) {
    return [long, lat - 180]
  }

  return [long * (0.9 - Math.pow(lat / 270, 2)), lat - 15]
}

export default {
  name: 'NavigationEarth',
  props: ['shipPos'],
  data () {
    return {
      renderer: null,
      scene: null,
      camera: null,
      earth: null,
      ship: null,
      shipTrans: null,
      material: null,
      isBall: false,
      launching: 0,
      cameraX: 0,
      cameraY: 0,
      left: 0,
      top: 0,
      animator: null,
      raf: null
    }
  },
  beforeMount () {
    if (window.innerWidth <= 860) {
      this.toggle()
    }
    // const camera = new OrthographicCamera(-160, 160, 88, -88, 0.1, 1000)
    // camera.position.set(0, 0, 100)
    const camera = new PerspectiveCamera(30, 1200 / 660, 0.1, 1000)
    camera.position.set(0, 0, 328)
    const scene = new Scene()
    scene.fog = new THREE.Fog(0x203260, 320, 420)
    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true
    })

    const geometry = new InstancedPointsGeometry(0.75, 10)
    const pos = coords.reduce((res, coord) => {
      return res.concat(...coord, 0)
    }, [])
    geometry.setPositions(pos)
    const material = new InstancedPointsMaterial({
      planeHeight: 0,
      radiu: 80,
      color: 0x5e98df,
      highlight: 0x96dcfd,
      fog: true,
      side: THREE.DoubleSide
    })
    const earth = new Mesh(geometry, material)
    earth.position.set(0, 0, 0)
    scene.add(earth)

    new THREE.TextureLoader().load(require('@/assets/webgl/ship_128.png'), texture => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      texture.anisotropy = false
      const ship = new THREE.Mesh(new THREE.PlaneBufferGeometry(20, 20), new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      }))
      ship.position.set(0, 0, 4)
      const shipTrans = new THREE.Group()
      shipTrans.position.set(...trans(this.shipPos), 0)

      shipTrans.add(ship)
      earth.add(shipTrans)

      this.ship = ship
      this.shipTrans = shipTrans
    })

    this.earth = earth
    this.material = material

    this.scene = scene
    this.renderer = renderer
    this.camera = camera
  },
  mounted () {
    window.addEventListener('resize', this.onresize)
    this.onresize()

    const mainCanvas = this.renderer.domElement
    mainCanvas.id = 'webgl-world'
    this.$el.appendChild(this.renderer.domElement)
    this.raf = requestAnimationFrame(this.render)
  },
  methods: {
    onresize () {
      const rect = this.$el.getBoundingClientRect()
      this.left = rect.left + window.pageXOffset
      this.top = rect.top + window.pageYOffset
      if (rect.width > 860) {
        this.camera.aspect = 1 / 0.55
        this.renderer.setSize(rect.width, rect.width * 0.55)
        this.camera.updateProjectionMatrix()
      } else {
        this.camera.aspect = 1 / 0.8
        this.renderer.setSize(rect.width, rect.width * 0.8)
        this.camera.updateProjectionMatrix()
      }
    },
    render (timer) {
      if (this.animator) {
        const { done } = this.animator.next()
        if (done) {
          this.animator = null
        }
      }
      if (this.isBall) {
        // if (this.ship) {
        //   this.ship.material.opacity += (1 - this.ship.material.opacity) * 0.03
        // }
        this.launching  *= 0.97
        this.earth.rotation.y += 0.007 + this.launching
        this.earth.rotation.x += (0.4 - this.earth.rotation.x) * 0.01
        this.material.deformation += (1 - this.material.deformation) * 0.03
      } else {
        // if (this.ship) {
        //   this.ship.material.opacity *= 0.93
        // }
        // if (this.earth.rotation.y > Math.PI) {
        //   this.earth.rotation.y = (this.earth.rotation.y + Math.PI) % Math.PI - Math.PI
        // }
        if (this.earth.rotation.y > 0) {
          this.earth.rotation.y = this.earth.rotation.y % (2 * Math.PI) -  2 * Math.PI
        }
        this.earth.rotation.y *= 0.96
        this.earth.rotation.x *= 0.98
        this.material.deformation *= 0.97
      }

      if (this.ship) {
        this.ship.position.y = Math.sin(timer / 500) * 2
      }

      this.camera.position.x += (this.cameraX - this.camera.position.x) * 0.03
      this.camera.position.y += (this.cameraY - this.camera.position.y) * 0.03
      this.camera.lookAt(0, 0, 0)

      this.material.timer = timer / 1000

      this.renderer.render(this.scene, this.camera)
      this.raf = requestAnimationFrame(this.render)
    },
    toggle () {
      this.isBall = !this.isBall
      this.animator = this.shipAnimator(this.isBall)
      this.launching = Math.random() / 10
    },
    moveCamera (e) {
      this.cameraX = ((e.pageX - this.left) / 600 - 1) * 50
      this.cameraY = ((e.pageY - this.top) / 330 - 1) * 50
    },
    resetCamera () {
      this.cameraX = 0
      this.cameraY = 0
    },
    *shipAnimator (tansToBall) {
      const from = tansToBall ? 4 : 84
      const to = tansToBall ? 84 : 4
      for (let i = 0; i <= 20; i++) {
        this.ship.material.opacity = 1 - i / 20
        this.ship.position.z = from - i * 4
        yield
      }
      if (tansToBall) {
        this.shipTrans.position.set(0, 0, 0)
        this.shipTrans.rotation.x = this.shipPos[1] * deg
        this.shipTrans.rotation.y = this.shipPos[0] * deg
      } else {
        this.shipTrans.position.set(...trans(this.shipPos), 0)
        this.shipTrans.rotation.x = 0
        this.shipTrans.rotation.y = 0
      }
      for (let i = 20; i >= 0; i--) {
        yield
      }
      for (let i = 40; i >= 0; i--) {
        this.ship.material.opacity = 1 - Math.pow(i, 2) / 1600
        this.ship.position.z = Math.pow(i, 2) / 20 + to
        yield
      }
    }
  },
  beforeDestroy () {
    if (this.raf) {
      cancelAnimationFrame(this.raf)
    }
    window.removeEventListener('resize', this.onresize)
  }
}
</script>

<style lang="stylus">
.navi-earth
  width 100%
  height 100%
  position relative
.navi-earth-plane
  position absolute
  bottom 30px
  left 50%
  width 40px
  height 10px
  border-radius 5px
  background-color #96dcfd
  transform translate3d(-50%, 50%, 0)
  transition all .4s
  cursor pointer
.navi-earth-ball
  width 20px
  height 20px
  border-radius 10px

@media screen and (max-width 860px)
  #webgl-world
    transform translateY(-40px)
    position relative
    z-index 1001
</style>
