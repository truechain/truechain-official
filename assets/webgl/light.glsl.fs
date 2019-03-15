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

  vec4 mapColor = texture2D(uLightMap, vUv);

  vec4 diffuseColor = vec4(mix(diffuse, vec3(1.0, 1.0, 1.0), mapColor.b), opacity * mapColor.r);

  #include <logdepthbuf_fragment>
  #include <color_fragment>

  gl_FragColor = diffuseColor;

  #include <premultiplied_alpha_fragment>
  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>
}