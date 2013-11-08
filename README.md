Raytracer
=========

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
- objects/sphere.js
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
- point_light.js
- properties/material.js
- properties/color.js

------------------------------------------------------------------------
B1: Specular reflection and specular refraction
- raytracer.js
    - reflect_refract()
    - getSpecularRays()

------------------------------------------------------------------------
B2: Anti-aliasing with a regular grid / random / jitter
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
C1: Stereoscopic rendering
- ray.js
- raytracer.js
    - trace()

------------------------------------------------------------------------
C2: Texture mapping and bump mapping with bilinear filter for anti-aliasing
- properties/texture.js
- properties/normalmap.js
- objects/sphere.js
    - calcUV()
- intersection.js
    - getAmbient() / getDiffuse() / getSpecular()
    - getNormal()

------------------------------------------------------------------------
C3: Triangle meshes
- objects/mesh.js
- objects/triangle.js
- scene/C3.js

------------------------------------------------------------------------
D1: Octree (termination criteria: number of levels: log8 #objects)
- scene/D1.js
- objects/octree.js

------------------------------------------------------------------------
D2: Area lights with grid / random / jitter
- area_light.js

------------------------------------------------------------------------


Run
========================================================================

To run the framework, you need to start raytracer.html in your browser (recent versions of Firefox and Chrome are supported, don't use IE)
To export your rendered images as PNG, just click Export. It will download the image.