var Ray = function (_line, _refraction_idx, _power, _eye) {
    this.line = _line;
    this.refraction_idx = _refraction_idx;
    this.power = _power;
    this.eye = _eye;
}

Ray.Eye = {
    LEFT: "LEFT",
    RIGHT: "RIGHT",
    CENTER: "CENTER"
}

Ray.AntiAliasing = {
    GRID: "GRID",
    RANDOM: "RANDOM",
    JITTER: "JITTER"
}


// generate rays for anti aliasing
function getRays (pixelX, pixelY) {
    var camera = scene.camera;

    var rays = new Array();

    var sub_pixel_size = 1/RayConfig.samples_per_axis;

    if (RayConfig.anti_aliasing_method === Ray.AntiAliasing.GRID) {
        for (var x = 0; x < 1; x += sub_pixel_size) {
            for (var y = 0; y < 1; y += sub_pixel_size) {
                if (ModuleId.C1) {
                    rays.push(generateRay(pixelX, pixelY, x, y, camera, Ray.Eye.LEFT));
                    rays.push(generateRay(pixelX, pixelY, x, y, camera, Ray.Eye.RIGHT));
                } else {
                    rays.push(generateRay(pixelX, pixelY, x, y, camera, Ray.Eye.CENTER));
                }
            }
        }

    } else if (RayConfig.anti_aliasing_method === Ray.AntiAliasing.RANDOM) {
        for (var i = 0; i < RayConfig.samples_per_pixel; i++) {
            if (ModuleId.C1) {
                rays.push(generateRay(pixelX, pixelY, Math.random(), Math.random(), camera, Ray.Eye.LEFT));
                rays.push(generateRay(pixelX, pixelY, Math.random(), Math.random(), camera, Ray.Eye.RIGHT));
            } else {
                rays.push(generateRay(pixelX, pixelY, Math.random(), Math.random(), camera, Ray.Eye.CENTER));
            }
        }

    } else if (RayConfig.anti_aliasing_method === Ray.AntiAliasing.JITTER) {
        for (var x = 0; x < 1; x += sub_pixel_size) {
            for (var y = 0; y < 1; y += sub_pixel_size) {
                if (ModuleId.C1) {
                    rays.push(generateRay(pixelX, pixelY, x + (Math.random()*sub_pixel_size), y + (Math.random()*sub_pixel_size), camera, Ray.Eye.LEFT));
                    rays.push(generateRay(pixelX, pixelY, x + (Math.random()*sub_pixel_size), y + (Math.random()*sub_pixel_size), camera, Ray.Eye.RIGHT));
                } else {
                    rays.push(generateRay(pixelX, pixelY, x + (Math.random()*sub_pixel_size), y + (Math.random()*sub_pixel_size), camera, Ray.Eye.CENTER));
                }
            }
        }
    }

    return rays;
}

function generateRay (pixelX, pixelY, x_offset, y_offset, camera, eye) {

    // translate pixels, so that 0/0 is in the center of the image
    pixelX = (pixelX+x_offset+0.5) - camera.width/2;
    pixelY = -1 * (pixelY+y_offset+0.5) + camera.height/2;

    // calculate point in imagePane in 3D
    var p = camera.imagePaneCenter.add (camera.upDirection.multiply (pixelY / camera.height * camera.imagePaneHeight));
    p = p.add (camera.rightDirection.multiply (pixelX / camera.width * camera.imagePaneWidth));

    var camPos = null;

    if (eye === Ray.Eye.CENTER) camPos = camera.pos;
    if (eye === Ray.Eye.LEFT) camPos = camera.pos.add($V([-1,0,0]));
    if (eye === Ray.Eye.RIGHT) camPos = camera.pos.add($V([1,0,0]));

    // vector from camera position to point in imagePane
    var direction = p.subtract(camPos);

    return new Ray ($L(camPos, direction.toUnitVector()),1,1, eye);
}
