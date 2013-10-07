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
    return direction.toUnitVector();
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

    // normal of intersection-point
    var n = intersectionObject.getNormal(intersectionPoint);

    // vector from intersection-point to light-source
    var wl = light.pos.subtract(intersectionPoint).toUnitVector();

    //var E = 20 / (4 * Math.PI * intersectionObject.radius * intersectionObject.radius) * n.dot(w);

    // angle between n and wl
    var E = n.dot(wl);

    // ray-direction
    var viewDirection = intersectionPoint.subtract (scene.camera.pos).toUnitVector();

    // ray-reflection-direction
    var wr = n.multiply (2 * n.dot (viewDirection)).subtract (viewDirection).toUnitVector();
    var S = Math.pow(wr.dot(wl), intersectionObject.specular_exp) / n.dot(wl) * E;

    var diffuse = intersectionObject.diffuse.multiply(E);
    var specular = intersectionObject.specular.multiply(S);

    return diffuse.add(specular);
}

function trace(pixelX, pixelY) {
    var color = $V([0,0,0]);

    // 1. shoot a ray determined from the camera parameters and the pixel position in the image
    var ray = getRay(pixelX, pixelY);

    // 2. intersect the ray to scene elements and determine the closest one
    var intersection = intersect(ray);

	// 3. check if the intersection point is illuminated by each light source
    
	// 4. shade the intersection point using the meterial attributes and the lightings
    if (intersection[0] != null) {
        for (var i = 0; i < scene.lights.length; i++) {
            color.addN(illuminate(intersection, scene.lights[i]));
        }
    }

	// 5. set the pixel color into the image buffer using the computed shading (for now set dummy color into the image buffer)
	return color;
}



