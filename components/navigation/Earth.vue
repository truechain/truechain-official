<template>
  <div @click="toggle" @mousemove="moveCamera"></div>
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
      raf: null
    }
  },
  beforeMount () {
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
    renderer.setSize(1200, 660)

    const geometry = new InstancedPointsGeometry(0.75, 10)
    const pos = coords.reduce((res, coord) => {
      return res.concat(...coord, 0)
    }, [])
    geometry.setPositions(pos)
    const material = new InstancedPointsMaterial({
      planeHeight: 0,
      radiu: 80,
      color: 0x5e98df,
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
    const mainCanvas = this.renderer.domElement
    mainCanvas.id = 'webgl-world'
    this.$el.appendChild(this.renderer.domElement)
    this.raf = requestAnimationFrame(this.render)
  },
  methods: {
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
      this.cameraX = (e.offsetX / 600 - 1) * 50
      this.cameraY = (e.offsetY / 330 - 1) * 50
    }
  },
  beforeDestroy () {
    if (this.raf) {
      cancelAnimationFrame(this.raf)
    }
  }
}
</script>
