#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

attribute vec3 instancePos;

vec2 restoreLongAndLat(const in vec2 longAndLat) {
  float latI = longAndLat.y + 15.0;
  float k = 0.9 - latI * latI / 72900.0;
  float longI = longAndLat.x / k;
  return vec2(longI, latI);
}

vec3 coordTrans(const in vec2 longAndLat, const in float radiu) {
  float xz = radiu * cos(radians(longAndLat.y));
  float y = radiu * sin(radians(longAndLat.y));
  float x = xz * sin(radians(longAndLat.x));
  float z = xz * cos(radians(longAndLat.x));
  return vec3(x, y, z);
}

void main() {
  vec2 longAndLat = restoreLongAndLat(instancePos.xy);
  vec3 coord = coordTrans(longAndLat, 80.0);
  float cosX = cos(radians(longAndLat.y));
  float sinX = sin(radians(longAndLat.y));
  mat3 tranX = mat3(
    1, 0, 0,
    0, cosX, -sinX,
    0, sinX, cosX
  );
  float cosY = cos(radians(longAndLat.x));
  float sinY = sin(radians(longAndLat.x));
  mat3 tranY = mat3(
    cosY, 0, -sinY,
    0, 1, 0,
    sinY, 0, cosY
  );
  vec3 pos = tranY * tranX * position;
  vec4 mvPosition = modelViewMatrix * vec4(coord + pos, 1.0);
  // vec4 mvPosition = modelViewMatrix * vec4(instancePos + position + vec3(0, 0, 80), 1.0);
  gl_Position = projectionMatrix * mvPosition;

  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>
  #include <fog_vertex>
}
