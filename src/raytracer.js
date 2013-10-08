"use strict";

function getRay (pixelX, pixelY) {
    var camera = scene.camera;

    // translate pixels, so that 0/0 is in the center of the image
    pixelY = -1 * pixelY + camera.height/2;
    pixelX = pixelX - camera.width/2;

    // calculate point in imagePane in 3D
    var p = camera.imagePaneCenter.add (camera.upDirection.multiply (pixelY / camera.height * camera.imagePaneHeight));
    p.addN (camera.rightDirection.multiply (pixelX / camera.width * camera.imagePaneWidth));

    // vector from camera position to point in imagePane
    var direction = p.subtract(camera.pos);

    // return normalized vector
    return new $L(camera.pos, direction.toUnitVector());
}

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
            var intersection_vector = intersection_point.subtract(scene.camera.pos);
            var distance = intersection_vector.dot(intersection_vector);
            if (distance < min) {
                min = distance;
                min_intersection_point = intersection_point;
                object = scene.objects[i];
            }
        }
    }

    return [object, min_intersection_point];
}

function illuminate (intersection, light) {

    var intersectionObject = intersection[0];
    var intersectionPoint = intersection[1];

    // vector from intersection-point to light-source
    var wl = light.pos.subtract(intersectionPoint).toUnitVector();

    // normal of intersection-point
    var n = intersectionObject.getNormal(intersectionPoint);

    // view-direction
    var w = intersectionPoint.subtract (scene.camera.pos).toUnitVector();

    // ray-reflection-direction: wr = 2n(w*n) - w
    var wr = n.multiply (2 * n.dot (w)).subtract (w).toUnitVector();

    var E = light.diffuseIntensity * n.dot(wl);
    var S = Math.pow(wr.dot(wl), intersectionObject.specular_exp) / n.dot(wl);

    var Ld = intersectionObject.diffuse.multiply(E);
    var specular_highlight_color = S > 0 ? intersectionObject.specular.multiply(S*E) : new Color(0,0,0);

    var color = new Color(0,0,0);

    color = color.add(Ld);
    color = color.add(specular_highlight_color);

    return color;
}

function trace(pixelX, pixelY) {
    var color = new Color(0,0,0);

    // 1. shoot a ray determined from the camera parameters and the pixel position in the image
    var ray = getRay(pixelX, pixelY);

    // 2. intersect the ray to scene elements and determine the closest one
    var intersection = intersect(ray);

	// 3. check if the intersection point is illuminated by each light source

	// 4. shade the intersection point using the material attributes and the lighting
    if (intersection[0] !== null) {
        var global_ambient_color = intersection[0].ambient.multiply(scene.globalAmbientIntensity);
        color = color.add(global_ambient_color);

        for (var i = 0; i < scene.lights.length; i++) {
            color = color.add(illuminate(intersection, scene.lights[i]));
        }
    }

	// 5. set the pixel color into the image buffer using the computed shading (for now set dummy color into the image buffer)
	return color;
}



