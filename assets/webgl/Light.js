/**
 * @author Felix Cai / http://github.com/tari404
 *
 */

import * as THREE from 'three'

const vs = `
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

attribute vec2 aCoord;

uniform float uDeformation;
uniform float uPlaneHeight;
uniform float uRadiu;

varying vec2 vUv;

vec2 transLatAndLong(const in vec2 LatAndLong) {
  float k = 0.9 - LatAndLong.x * LatAndLong.x / 72900.0;
  float longI;
  if (LatAndLong.y < -168.0) {
    longI = (LatAndLong.y + 348.0) * k;
  } else {
    longI = (LatAndLong.y - 12.0) * k;
  }
  float latI = LatAndLong.x - 15.0;
  return vec2(longI, latI);
}

vec3 coordTrans(
  const in vec2 LatAndLong,
  const in float radiu,
  out mat3 tranX,
  out mat3 tranY
) {
  float dk = saturate(uDeformation * 2.0 - rand(LatAndLong));
  float cosX = cos(radians(LatAndLong.x * dk));
  float sinX = sin(radians(LatAndLong.x * dk));
  float cosY = cos(radians(LatAndLong.y * dk));
  float sinY = sin(radians(LatAndLong.y * dk));
  float xz = radiu * cos(radians(LatAndLong.x));
  float y = radiu * sin(radians(LatAndLong.x));
  float x = xz * sin(radians(LatAndLong.y));
  float z = xz * cos(radians(LatAndLong.y));
  tranX = mat3(
    1, 0, 0,
    0, cosX, -sinX,
    0, sinX, cosX
  );
  tranY = mat3(
    cosY, 0, -sinY,
    0, 1, 0,
    sinY, 0, cosY
  );
  return mix(vec3(transLatAndLong(aCoord), uPlaneHeight), vec3(x, y, z), dk);
}

void main() {
  vUv = uv;

  mat3 tranX, tranY;
  vec3 coord = coordTrans(aCoord, uRadiu, tranX, tranY);
  vec3 pos = tranY * tranX * position;
  vec4 mvPosition = modelViewMatrix * vec4(coord + pos, 1.0);

  gl_Position = projectionMatrix * mvPosition;

  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>
  #include <fog_vertex>
}
`

const fs = `
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

uniform sampler2D uLightMap;

varying vec2 vUv;

void main() {

  #include <clipping_planes_fragment>

  float strength = 1.0;
  strength = texture2D(uLightMap, vUv).r;

  vec4 diffuseColor = vec4(diffuse, opacity * strength);

  #include <logdepthbuf_fragment>
  #include <color_fragment>

  gl_FragColor = diffuseColor;

  #include <premultiplied_alpha_fragment>
  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>
}
`
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
      4, 6, 5, 5, 6, 7
    ]
    const position = [
      -1, 0, 1, 1, 0, 1, -1, 0, 0, 1, 0, 0,
      0, -1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0
    ]
    const uv = [
      0, 1, 1, 1, 0, 0, 1, 0,
      0, 1, 1, 1, 0, 0, 1, 0
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
      vertexShader: vs,
      fragmentShader: fs,
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
