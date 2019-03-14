<template>
  <div class="navi-earth" @click="toggle"
    @mousemove="moveCamera" @mouseleave="resetCamera">
    <div class="navi-earth-plane" :class="{ 'navi-earth-ball': isBall }"></div>
  </div>
</template>

<script>
import * as THREE from 'three'

import InstancedPointsGeometry from '@/assets/webgl/InstancedPointsGeometry'
import InstancedPointsMaterial from '@/assets/webgl/InstancedPointsMaterial'

import coords from '@/assets/webgl/world-points.json'
import { OrthographicCamera, Scene, WebGLRenderer, Mesh, BoxBufferGeometry, MeshBasicMaterial, PerspectiveCamera } from 'three';

export default {
  name: 'NavigationEarth',
  data () {
    return {
      renderer: null,
      scene: null,
      camera: null,
      earth: null,
      material: null,
      isBall: false,
      launching: 0,
      cameraX: 0,
      cameraY: 0,
      left: 0,
      top: 0,
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
    scene.fog = new THREE.Fog(0x203260, 320, 370)
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
    const mesh = new Mesh(geometry, material)
    mesh.position.set(0, 0, 0)
    scene.add(mesh)
    // const plane = new Mesh(new BoxBufferGeometry(360, 180), new MeshBasicMaterial({ color: 0x30457a }))
    // plane.position.set(0, 0, -10)
    // scene.add(plane)

    this.earth = mesh
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
      if (this.isBall) {
        this.launching  *= 0.97
        this.earth.rotation.y += 0.01 + this.launching
        this.earth.rotation.x += (0.4 - this.earth.rotation.x) * 0.01
        this.material.deformation += (1 - this.material.deformation) * 0.03
      } else {
        // if (this.earth.rotation.y > Math.PI) {
        //   this.earth.rotation.y = (this.earth.rotation.y + Math.PI) % Math.PI - Math.PI
        // }
        if (this.earth.rotation.y > 0) {
          this.earth.rotation.y = this.earth.rotation.y % (2 * Math.PI) -  2 * Math.PI
        }
        this.earth.rotation.y *= 0.92
        this.earth.rotation.x *= 0.98
        this.material.deformation *= 0.97
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
      this.launching = Math.random() / 10
    },
    moveCamera (e) {
      this.cameraX = ((e.pageX - this.left) / 600 - 1) * 50
      this.cameraY = ((e.pageY - this.top) / 330 - 1) * 50
    },
    resetCamera () {
      this.cameraX = 0
      this.cameraY = 0
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
