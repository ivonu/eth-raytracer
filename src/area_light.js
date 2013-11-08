var AreaLight = function (_pos, _radius, _direction, _color, _ambientIntensity, _diffuseIntensity, _specularIntensity) {
    this.pos = _pos;
    this.radius = _radius;
    this.direction = _direction;

    this.color = _color; // TODO: use light color
    this.ambientIntensity = _ambientIntensity;
    this.diffuseIntensity = _diffuseIntensity;
    this.specularIntensity = _specularIntensity; // TODO: use specular intensity
}

AreaLight.prototype.getShadowIntensity = function (intersection) {


    var upDirection = this.direction.cross ($V([1,0,0]));
    var rightDirection = this.direction.cross (upDirection);

    var subPositions = new Array();

    if (RayConfig.soft_shadow_method === AreaLight.Method.GRID) {

        var i = 0;
        var cell_size = this.radius*2/RayConfig.soft_shadow_grid_size_axis;

        while (i < RayConfig.soft_shadow_samples) {
            for (var r = -RayConfig.soft_shadow_grid_size_axis/2; r < RayConfig.soft_shadow_grid_size_axis/2; r++) {
                for (var s = -RayConfig.soft_shadow_grid_size_axis/2; s < RayConfig.soft_shadow_grid_size_axis/2; s++) {
                    var x = r * cell_size + cell_size/2;
                    var y = s * cell_size + cell_size/2;
                    var subPos = this.pos.add (upDirection.multiply(y)).add (rightDirection.multiply(x));

                    if (subPos.distanceFrom(this.pos) <= this.radius)
                        subPositions[i++] = subPos;
                }
            }
        }

    } else if (RayConfig.soft_shadow_method === AreaLight.Method.RANDOM) {

        for (var i = 0; i < RayConfig.soft_shadow_samples; i++) {
            do {
                var x = Math.random()*2 - 1;
                var y = Math.random()*2 - 1;
                subPositions[i] = this.pos.add (upDirection.multiply(y)).add (rightDirection.multiply(x));
            } while (subPositions[i].distanceFrom(this.pos) > this.radius);
        }

    } else if (RayConfig.soft_shadow_method === AreaLight.Method.JITTER) {

        var i = 0;
        var cell_size = this.radius*2/RayConfig.soft_shadow_grid_size_axis;

        while (i < RayConfig.soft_shadow_samples) {
            for (var r = -RayConfig.soft_shadow_grid_size_axis/2; r < RayConfig.soft_shadow_grid_size_axis/2; r++) {
                for (var s = -RayConfig.soft_shadow_grid_size_axis/2; s < RayConfig.soft_shadow_grid_size_axis/2; s++) {

                    var subPos = null;
                    var tries = 20;
                    do {
                        var x = r * cell_size + cell_size * Math.random();
                        var y = s * cell_size + cell_size * Math.random();
                        subPos = this.pos.add (upDirection.multiply(y)).add (rightDirection.multiply(x));
                    } while (subPos.distanceFrom(this.pos) > this.radius && tries-- > 0);

                    if (tries > 0) subPositions[i++] = subPos;
                }
            }
        }
    }

    var shadowIntensity = 0;

    for (var i = 0; i < RayConfig.soft_shadow_samples; i++) {
        var wl = subPositions[i].subtract(intersection.getPoint()).toUnitVector();

        var light_intersection = intersect (new Ray($L(intersection.getPoint(), wl), null, null, null));
        if (light_intersection !== null) shadowIntensity += 1/RayConfig.soft_shadow_samples;
    }


    return shadowIntensity;
}

AreaLight.Method = {
    GRID: "GRID",
    RANDOM: "RANDOM",
    JITTER: "JITTER"
}
