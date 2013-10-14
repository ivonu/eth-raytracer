var Ray = function (_line, _refraction_idx, _power) {
    this.line = _line;
    this.refraction_idx = _refraction_idx;
    this.power = _power;
}

function getRay (pixelX, pixelY) {
    var camera = scene.camera;

    // translate pixels, so that 0/0 is in the center of the image
    pixelY = -1 * (pixelY+0.5) + camera.height/2;
    pixelX = (pixelX+0.5) - camera.width/2;

    // calculate point in imagePane in 3D
    var p = camera.imagePaneCenter.add (camera.upDirection.multiply (pixelY / camera.height * camera.imagePaneHeight));
    p.addN (camera.rightDirection.multiply (pixelX / camera.width * camera.imagePaneWidth));

    // vector from camera position to point in imagePane
    var direction = p.subtract(camera.pos);

    // return normalized vector
    return new Ray ($L(camera.pos, direction.toUnitVector()),1,1);
}

function getRays (pixelX, pixelY) {
    var camera = scene.camera;

    var rays = new Array();

    for (var x = 0; x < 1; x += 1/RayConfig.samples_per_axis) {
        for (var y = 0; y < 1; y += 1/RayConfig.samples_per_axis) {

            // translate pixels, so that 0/0 is in the center of the image
            var new_pixelY = -1 * (pixelY+y+0.5) + camera.height/2;
            var new_pixelX = (pixelX+x+0.5) - camera.width/2;

            // calculate point in imagePane in 3D
            var p = camera.imagePaneCenter.add (camera.upDirection.multiply (new_pixelY / camera.height * camera.imagePaneHeight));
            p.addN (camera.rightDirection.multiply (new_pixelX / camera.width * camera.imagePaneWidth));

            // vector from camera position to point in imagePane
            var direction = p.subtract(camera.pos);

            rays.push(new Ray ($L(camera.pos, direction.toUnitVector()),1,1));
        }
    }

    return rays;
}
