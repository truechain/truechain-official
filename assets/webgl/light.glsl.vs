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
