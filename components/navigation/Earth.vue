<template>
  <div></div>
</template>

<script>
import * as THREE from 'three'

import InstancedPointsGeometry from '@/assets/webgl/InstancedPointsGeometry'
import InstancedPointsMaterial from '@/assets/webgl/InstancedPointsMaterial'

import coords from '@/assets/webgl/world-points.json'
import { OrthographicCamera, Scene, WebGLRenderer, Mesh, BoxBufferGeometry, MeshBasicMaterial } from 'three';

export default {
  name: 'NavigationEarth',
  data () {
    return {
      renderer: null,
      scene: null,
      camera: null,
      mesh: null,
      raf: null
    }
  },
  beforeMount () {
    const camera = new OrthographicCamera(-160, 160, 88, -88, 0.1, 1000)
    camera.position.set(0, 0, 100)
    const scene = new Scene()
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
      color: 0x5e98df
    })
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)
    const plane = new Mesh(new BoxBufferGeometry(360, 180), new MeshBasicMaterial({ color: 0x30457a }))
    plane.position.set(0, 0, -10)
    // scene.add(plane)

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
    render () {
      this.renderer.render(this.scene, this.camera)
      this.raf = requestAnimationFrame(this.render)
    }
  },
  beforeDestroy () {
    if (this.raf) {
      cancelAnimationFrame(this.raf)
    }
  }
}
</script>
