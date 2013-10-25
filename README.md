    Raytracer
=================

Implemented features:
------------------------------------------------------------------------

A1: Basic Features

Ray casting:
- ray.js
    - trace()
    - traceRay()

Ray-object intersection:
- raytracer.js
    - intersect()
- sphere.js
    - intersects()
- intersection.js

Shadows:
- raytracer.js
    - illuminate()

Phong lighting model:
- raytracer.js
    - illuminate()

The Scene:
- scene/scene.js
- scene/A1.js
- camera.js
- light.js
- material.js
- color.js

------------------------------------------------------------------------
B1: Specular reflection and specular refraction
- raytracer.js
    - reflect_refract()
    - getSpecularRays()

------------------------------------------------------------------------
B2: Anti-aliasing with a regular grid
- ray.js
    - getRays()
- raytracer.js
    - trace()

------------------------------------------------------------------------
B3: Quadrics
- scene/B3.js
- objects/ellipsoid.js
- objects/cylinder.js

------------------------------------------------------------------------
B4: Boolean operations
- scene/B4.js
- objects/hemisphere.js
- objects/object_intersection.js

------------------------------------------------------------------------



Run
========================================================================

To run the framework, you need to start raytracer.html in your browser (recent versions of Firefox and Chrome are supported, don't use IE)
To export your rendered images as PNG, just click Export. It will download the image.