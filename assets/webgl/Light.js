/**
 * @author Felix Cai / http://github.com/tari404
 *
 */

import * as THREE from 'three'

import lightVS from './light.glsl.vs'
import lightFS from './light.glsl.fs'

const lightUniforms = THREE.UniformsUtils.merge([
  THREE.UniformsLib.common,
  THREE.UniformsLib.fog,
  {
    uDeformation: { value: 0 },
    uPlaneHeight: { value: 0 },
    uRadiu: { value: 80 },
    uLightMap: { value: null }
  }
])

export default class Light extends THREE.Mesh {
  constructor (worldCoords) {
    const geometry = new THREE.InstancedBufferGeometry()

    const index = [
      0, 2, 1, 1, 2, 3,
      4, 6, 5, 5, 6, 7,
      8, 10, 9, 9, 10, 11
    ]
    const position = [
      -1, 0, 1, 1, 0, 1, -1, 0, 0, 1, 0, 0,
      0, -1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0,
      -1.4, 1.4, 0, 1.4, 1.4, 0, -1.4, -1.4, 0, 1.4, -1.4, 0
    ]
    const uv = [
      0, 1, 1, 1, 0, 0.5, 1, 0.5,
      0, 1, 1, 1, 0, 0.5, 1, 0.5,
      0, 0.5, 1, 0.5, 0, 0, 1, 0
    ]
    geometry.setIndex(index)
    geometry.addAttribute('position', new THREE.Float32BufferAttribute(position, 3))
    geometry.addAttribute('uv', new THREE.Float32BufferAttribute(uv, 2))

    geometry.addAttribute('aCoord', new THREE.InstancedBufferAttribute(new Float32Array(worldCoords), 2))

    geometry.scale(2, 2, 26)
    geometry.translate(0, 0, 0.5)

    const material = new THREE.ShaderMaterial({
      type: 'EarthLightMaterial',
      uniforms: THREE.UniformsUtils.clone(lightUniforms),
      vertexShader: lightVS,
      fragmentShader: lightFS,
      side: THREE.DoubleSide,
      fog: true,
      transparent: true,
      depthTest: false,
      opacity: 0.6
      // blending: THREE.AdditiveBlending
    })

    material.uniforms.diffuse.value = new THREE.Color(0x9cd3ea)

    super(geometry, material)
  }

  set lightMap (value) {
    this.material.uniforms.uLightMap.value = value
  }
  get lightMap () {
    this.material.uniforms.uLightMap.value
  }

  get planeHeight () {
    return this.material.uniforms.uPlaneHeight.value
  }
  set planeHeight (value) {
    this.material.uniforms.uPlaneHeight.value = value
  }

  get radiu () {
    return this.material.uniforms.uRadiu.value
  }
  set radiu (value) {
    this.material.uniforms.uRadiu.value = value
  }

  get deformation () {
    return this.material.uniforms.uDeformation.value
  }
  set deformation (value) {
    this.material.uniforms.uDeformation.value = value
  }
}
