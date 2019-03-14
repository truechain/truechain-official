/**
 * @author Felix Cai / http://github.com/tari404
 *
 * parameters = {
 *  color: <hex>,
 *  highlight: <hex>
 *  planeHeight: <float>,
 *  radiu: <float>,
 *  deformation: <float>,
 *  timer: <float>
 * }
 */

import * as THREE from 'three'

import pointsVS from './points.glsl.vs'
import pointsFS from './points.glsl.fs'

const pointsUniforms = THREE.UniformsUtils.merge([
  THREE.UniformsLib.common,
  THREE.UniformsLib.fog,
  {
    uDeformation: { value: 0 },
    uPlaneHeight: { value: 0 },
    uRadiu: { value: 100 },
    uTimer: { value: 0 },
    uHighlight: { value: new THREE.Color(0xffffff) }
  }
])

export default class InstancedPointsMaterial extends THREE.ShaderMaterial {
  constructor (parameters) {
    super({
      type: 'InstancedPointsMaterial',
      uniforms: THREE.UniformsUtils.clone(pointsUniforms),
      vertexShader: pointsVS,
      fragmentShader: pointsFS
    })

    this.setValues(parameters)
  }

  get color () {
    return this.uniforms.diffuse.value
  }
  set color (value) {
    this.uniforms.diffuse.value = value
  }

  get planeHeight () {
    return this.uniforms.uPlaneHeight.value
  }
  set planeHeight (value) {
    this.uniforms.uPlaneHeight.value = value
  }

  get radiu () {
    return this.uniforms.uRadiu.value
  }
  set radiu (value) {
    this.uniforms.uRadiu.value = value
  }

  get deformation () {
    return this.uniforms.uDeformation.value
  }
  set deformation (value) {
    this.uniforms.uDeformation.value = value
  }

  get timer () {
    return this.uniforms.uTimer.value
  }
  set timer (value) {
    this.uniforms.uTimer.value = value
  }

  get highlight () {
    return this.uniforms.uHighlight.value
  }
  set highlight (value) {
    this.uniforms.uHighlight.value.copy(value)
  }

  static get isInstancedPointsMaterial () {
    return true
  }

  clone () {
    return new this.constructor().copy(this)
  }

  copy (source) {
    THREE.ShaderMaterial.prototype.copy.call(this, source)
    this.color.copy(source.color)
    // TODO
    return this
  }
}
