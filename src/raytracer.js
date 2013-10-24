"use strict";

function intersect (ray) {
    var min = Infinity;
    var object = null;
    var intersection_point = null;
    var normal = null;

    // loop through all objects in the scene
    for (var i = 0; i < scene.objects.length; i++) {

        // intersect with object -> returns distance
        var intersection = scene.objects[i].intersects(ray);
        if (intersection !== null) {

            // check if object is nearer than the last one
            if (intersection[0] > RayConfig.intersection_delta && intersection[0] < min) {
                min = intersection[0];
                normal = intersection[1];
                object = scene.objects[i];
            }
        }
    }

    // calculate intersection-point with distance and ray
    if (min !== Infinity) intersection_point = ray.line.anchor.add(ray.line.direction.multiply(min));

    return [object, intersection_point, normal];
}

function illuminate (intersection, ray, light) {

    var color = new Color(0,0,0);

    var intersectionObject = intersection[0];
    var intersectionPoint = intersection[1];
    var intersectionNormal = intersection[2];

    // vector from intersection-point to light-source
    var wl = light.pos.subtract(intersectionPoint).toUnitVector();

    // 3. check if the intersection point is illuminated by each light source
    // check if point to light-source is intersected -> shadows
    var light_intersection = intersect (new Ray($L(intersectionPoint, wl), ray.refraction_idx, ray.power));
    if (RayConfig.shadows && light_intersection[0] != null) {
        // if (light_intersection[0].refraction_idx !== Infinity) light refraction through object
        return color;
    }

    // normal of intersection-point
    var n = intersectionNormal;

    // view-direction
    var w = intersectionPoint.subtract (ray.line.anchor).toUnitVector();

    // ray-reflection-direction: wr = 2n(w*n) - w
    var wr = n.multiply (2 * n.dot (w)).subtract (w).toUnitVector();

    var E = light.diffuseIntensity * n.dot(wl);
    var S = Math.pow(wr.dot(wl), intersectionObject.specular_exp) / n.dot(wl);

    var ambient_color = intersectionObject.ambient.multiply(light.ambientIntensity);
    var diffuse_color = intersectionObject.diffuse.multiply(E);
    var specular_highlight_color = S > 0 ? intersectionObject.specular.multiply(S*E) : color;

    if (RayConfig.ambient_illumination) color = color.add(ambient_color);
    if (RayConfig.diffuse_illumination) color = color.add(diffuse_color);
    if (RayConfig.specular_highlights) color = color.add(specular_highlight_color);

    return color;
}



function getSpecularRays (ray, intersection) {
    var intersectionObject = intersection[0];
    var intersectionPoint = intersection[1];
    var intersectionNormal = intersection[2];

    var inside = ray.refraction_idx !== 1;

    // normal of intersection-point
    var n = intersectionNormal;
    if (inside) n = n.multiply(-1);

    // view-direction
    var w = ray.line.anchor.subtract (intersectionPoint).toUnitVector();

    // angle between view-direction and normal
    var w_dot_n = w.dot(n);

    // ===== reflection =====
    // ray-reflection-direction: wr = 2n(w*n) - w
    var wr = n.multiply (2 * w_dot_n).subtract (w).toUnitVector();
    var reflectedRay = new Ray($L(intersectionPoint, wr), ray.refraction_idx, ray.power);

    // ===== refraction =====
    var refractedRay = null;
    var n1 = ray.refraction_idx;
    var n2 = inside ? 1 : intersectionObject.refraction_idx;
    var ref = n1/n2;

    if (n2 !== Infinity) {
        var first = w.subtract( n.multiply(w_dot_n) ).multiply(-ref);
        var under_root = 1 - ((ref*ref) * (1 - (w_dot_n*w_dot_n)));

        if (under_root >= 0) {
            // ray-refraction-direction
            var wt = first.subtract( n.multiply(Math.sqrt(under_root))).toUnitVector();
            var refractedRay = new Ray ($L(intersectionPoint, wt), n2, ray.power);

            // ===== fresnel equation ====
            var cos1 = wr.dot(n);
            var cos2 = wt.dot(n.multiply(-1));

            var p_reflect = (n2*cos1 - n1*cos2) / (n2*cos1 + n1*cos2);
            var p_refract = (n1*cos1 - n2*cos2) / (n1*cos1 + n2*cos2);

            var F_reflect = 0.5*(p_reflect*p_reflect + p_refract*p_refract);
            //F_reflect = 0;
            var F_refract = 1-F_reflect;

            reflectedRay.power = reflectedRay.power * F_reflect;
            refractedRay.power = refractedRay.power * F_refract;
        }
    }

    return [reflectedRay, refractedRay];
}


function reflect_refract (ray, intersection, depth) {
    var color = new Color(0,0,0);

    var rays = getSpecularRays(ray, intersection);

    var inside = ray.refraction_idx !== 1;

    if (RayConfig.reflection && rays[0] !== null) {
        var specular_reflected_color = traceRay(rays[0], depth);
        specular_reflected_color = specular_reflected_color.multiplyColor(intersection[0].specular);
        color = color.add(specular_reflected_color.multiply(rays[0].power));
    }
    if (RayConfig.refraction && rays[1] !== null) {
        var specular_refraction_color = traceRay(rays[1], depth);
        if (!inside) specular_refraction_color = specular_refraction_color.multiplyColor(intersection[0].specular);
        color = color.add(specular_refraction_color.multiply(rays[1].power));
    }

    return color;
}



function traceRay (ray, depth) {
    var color = new Color (0,0,0);

    // 2. intersect the ray to scene elements and determine the closest one
    var intersection = intersect(ray);

    // 3. check if the intersection point is illuminated by each light source

    // 4. shade the intersection point using the material attributes and the lighting
    if (intersection[0] !== null) {

        var global_ambient_color = intersection[0].ambient.multiply(scene.globalAmbientIntensity);
        if (RayConfig.global_ambient_illumination) color = color.add(global_ambient_color);

        for (var i = 0; i < scene.lights.length; i++) {
            color = color.add(illuminate(intersection, ray, scene.lights[i]).multiply(ray.power));
        }

        if (ModuleId.B1 && depth > 0) color = color.add(reflect_refract(ray, intersection, depth-1).multiply(ray.power));
    }

    return color;
}

function trace(pixelX, pixelY) {
    console.rlog_start();

    var color = new Color(0,0,0);

    // 1. shoot a ray determined from the camera parameters and the pixel position in the image
    if (ModuleId.B2) {
        // super sampling / anti-aliasing
        var rays = getRays(pixelX, pixelY);
        for (var i = 0; i < RayConfig.samples_per_pixel; i++) {
            var sample_color = traceRay(rays[i], RayConfig.depth);
            sample_color = sample_color.multiply(1.0/RayConfig.samples_per_pixel);
            color = color.add(sample_color);
        }

    } else {
        var ray = getRay(pixelX, pixelY);
        color = traceRay(ray, RayConfig.depth);
    }

    console.rlog_end();

	// 5. set the pixel color into the image buffer using the computed shading (for now set dummy color into the image buffer)
	return color;
}



