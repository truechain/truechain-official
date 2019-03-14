uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

uniform float uTimer;
varying float vRand;

void main() {

  #include <clipping_planes_fragment>

  // float flash = rand(vec2(uTimer, vRand));
  // float test = saturate(mod(uTimer * 0.1 + 100.0, vRand * 10.0 + 10.0));
  // float flash = 1.0 - sin(test * PI);
  vec4 diffuseColor = vec4(diffuse, opacity * vRand);

  #include <logdepthbuf_fragment>
  #include <color_fragment>

  gl_FragColor = diffuseColor;

  #include <premultiplied_alpha_fragment>
  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>
}
