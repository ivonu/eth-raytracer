function getRay (pixelX, pixelY) {
    var camera = scene.camera;

    // translate pixels, so that 0/0 is in the center of the image
    pixelY = -1 * pixelY + camera.heigth/2;
    pixelX = pixelX - camera.width/2;

    // calculate point in imagePane in 3D
    var p = camera.imagePaneCenter.add (camera.upDirection.multiply (pixelY / camera.heigth * camera.imagePaneHeigth));
    p.addN (camera.rightDirection.multiply (pixelX / camera.width * camera.imagePaneWidth));

    // vector from camera position to point in imagePane
    var direction = p.subtract(camera.pos);

    // return normalized vector
    return direction.toUnitVector();
}

function intersect (ray) {
    var min = Infinity;
    var object = null;

    // loop through all objects in the scene
    for (var i = 0; i < scene.objects.length; i++) {

        // calculate intersection point
        var intersection = scene.objects[i].intersects(ray);

        if (intersection != null) {

            // compare distance, and remember the nearest object
            var intersection_vector = intersection.subtract(scene.camera.pos);
            var distance = intersection_vector.dot(intersection_vector);
            if (distance < min) {
                min = distance;
                object = scene.objects[i];
            }
        }
    }

    return [object, intersection];
}

function trace(pixelX, pixelY) {
    var color = new Color (0,0,0);

    // 1. shoot a ray determined from the camera parameters and the pixel position in the image
    var ray = getRay(pixelX, pixelY);

    // 2. intersect the ray to scene elements and determine the closest one
    var intersection = intersect(ray);
    if (intersection[0] != null) {
        color = intersection[0].ambient;
    }

	// 3. check if the intersection point is illuminated by each light source
	
	// 4. shade the intersection point using the meterial attributes and the lightings

	// 5. set the pixel color into the image buffer using the computed shading (for now set dummy color into the image buffer)
	return color;
}



