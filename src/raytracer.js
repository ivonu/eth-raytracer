"use strict";

function intersect (ray) {
    var min = Infinity;
    var min_intersection_point;
    var object = null;

    // loop through all objects in the scene
    for (var i = 0; i < scene.objects.length; i++) {

        // calculate intersection point
        var intersection_point = scene.objects[i].intersects(ray);

        if (intersection_point != null) {

            // compare distance, and remember the nearest object
            var intersection_vector = intersection_point.subtract(ray.line.anchor);
            var distance = intersection_vector.dot(intersection_vector);
            if (distance > 0.1 && distance < min) {
                min = distance;
                min_intersection_point = intersection_point;
                object = scene.objects[i];
            }
        }
    }

    return [object, min_intersection_point];
}



function illuminate (intersection, ray, light) {

    var color = new Color(0,0,0);

    var intersectionObject = intersection[0];
    var intersectionPoint = intersection[1];

    // vector from intersection-point to light-source
    var wl = light.pos.subtract(intersectionPoint).toUnitVector();

    // 3. check if the intersection point is illuminated by each light source
    // check if point to light-source is intersected -> shadows
    var light_intersection = intersect (new Ray($L(intersectionPoint, wl), ray.refraction_idx));
    if (RayConfig.shadows && light_intersection[0] != null) {
        return color;
    }

    // normal of intersection-point
    var n = intersectionObject.getNormal(intersectionPoint);

    // view-direction
    var w = intersectionPoint.subtract (ray.line.anchor).toUnitVector();

    // ray-reflection-direction: wr = 2n(w*n) - w
    var wr = n.multiply (2 * n.dot (w)).subtract (w).toUnitVector();

    var E = light.diffuseIntensity * n.dot(wl);
    var S = Math.pow(wr.dot(wl), intersectionObject.specular_exp) / n.dot(wl);

    var diffuse_color = intersectionObject.diffuse.multiply(E);
    var specular_highlight_color = S > 0 ? intersectionObject.specular.multiply(S*E) : color;

    if (RayConfig.diffuse_illumination) color.addN(diffuse_color);
    if (RayConfig.specular_highlights) color.addN(specular_highlight_color);

    return color;
}



function getSpecularRays (ray, intersection) {
    var intersectionObject = intersection[0];
    var intersectionPoint = intersection[1];

    var inside = ray.refraction_idx != 1;

    // normal of intersection-point
    var n = intersectionObject.getNormal(intersectionPoint);
    if (inside) n.multiplyN(-1);

    // view-direction
    var w = intersectionPoint.subtract (ray.line.anchor).toUnitVector();

    // angle between view-direction and normal
    var w_dot_n = w.dot(n);

    // ===== reflection =====
    // ray-reflection-direction: wr = 2n(w*n) - w
    var wr = n.multiply (2 * w_dot_n).subtract (w).toUnitVector().multiply(-1);
    var reflectedRay = new Ray($L(intersectionPoint, wr), ray.refraction_idx);

    // ===== refraction =====
    var refractedRay = null;
    var n1 = ray.refraction_idx;
    var n2 = inside ? 1 : intersectionObject.refraction_idx;
    var ref = n1/n2;

    var F_reflect = 1;
    var F_refract = 0;

    if (n2 != Infinity) {
        var first = w.subtract( n.multiply(w_dot_n) ).multiply(-ref);
        var under_root = 1-(ref*ref)*(1-(w_dot_n*w_dot_n));

        if (under_root >= 0) {
            // ray-refraction-direction
            var wt = first.subtract( n.multiply(Math.sqrt(under_root))).toUnitVector();// .multiply(-1);
            var refractedRay = new Ray ($L(intersectionPoint, wt), n2);

            // ===== fresnel equation ====
            var cos1 = wr.dot(n); // Math.cos(w_dot_n);
            var cos2 = wt.dot(n.multiply(-1)); // Math.cos(wr_dot_n);

            var p_reflect = (n2*cos1 - n1*cos2) / (n2*cos1 + n1*cos2);
            var p_refract = (n1*cos1 - n2*cos2) / (n1*cos1 + n2*cos2);

            F_reflect = 0.5*(p_reflect*p_reflect + p_refract*p_refract);
            F_refract = 1-F_reflect;
        }
    }

    return [reflectedRay, refractedRay, F_reflect, F_refract];
}


function reflect_refract (ray, intersection, depth) {
    var color = new Color(0,0,0);

    var rays = getSpecularRays(ray, intersection);

    var specular_reflected_color = new Color(0,0,0);
    var specular_refraction_color = new Color(0,0,0);
    if (rays[0] != null) {
        var reflected_color = traceRay(rays[0], depth);
        specular_reflected_color = reflected_color.multiplyColor(intersection[0].specular);
    }
    if (rays[1] != null) {
        var refracted_color = traceRay(rays[1], depth);
        specular_refraction_color = refracted_color.multiplyColor(intersection[0].specular);
    }

    if (rays[0] != null) color.addN(specular_reflected_color.multiply(rays[2]));
    if (rays[1] != null) color.addN(specular_refraction_color.multiply(rays[3]));

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
        if (RayConfig.ambient_illumination) color.addN(global_ambient_color);

        for (var i = 0; i < scene.lights.length; i++) {
            color.addN(illuminate(intersection, ray, scene.lights[i]).multiply(1));
        }

        if (ModuleId.B1 && depth > 0) color.addN(reflect_refract(ray, intersection, depth-1).multiply(1));
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
            sample_color.multiplyN(1.0/RayConfig.samples_per_pixel);
            color.addN(sample_color);
        }

    } else {
        var ray = getRay(pixelX, pixelY);
        color = traceRay(ray, RayConfig.depth);
    }

    console.rlog_end();

	// 5. set the pixel color into the image buffer using the computed shading (for now set dummy color into the image buffer)
	return color;
}



