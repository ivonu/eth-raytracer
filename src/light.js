var PointLight = function (_pos, _color, _ambientIntensity, _diffuseIntensity, _specularIntensity) {
    this.pos = _pos;
    this.color = _color;
    this.ambientIntensity = _ambientIntensity;
    this.diffuseIntensity = _diffuseIntensity;
    this.specularIntensity = _specularIntensity;
};

PointLight.prototype.getShadowIntensity = function (intersection) {
    var wl = this.pos.subtract(intersection.getPoint()).toUnitVector();
    var light_intersection = intersect (new Ray($L(intersection.getPoint(), wl), null, null, null));

    return light_intersection === null ? 0 : 1;
}



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

    var shadowIntensity = 0;

    var upDirection = this.direction.cross ($V([1,0,0]));
    var rightDirection = this.direction.cross (upDirection);

    var subPos = null;

    for (var i = 0; i < RayConfig.soft_shadow_samples; i++) {

        do {
            var x = Math.random()*2 - 0.5;
            var y = Math.random()*2 - 0.5;
            subPos = this.pos.add(upDirection.multiply(y));
            subPos = this.pos.add(rightDirection.multiply(x));
        } while (subPos.distanceFrom(this.pos) > this.radius);

        var wl = subPos.subtract(intersection.getPoint()).toUnitVector();

        var light_intersection = intersect (new Ray($L(intersection.getPoint(), wl), null, null, null));
        if (light_intersection !== null) shadowIntensity += 1/RayConfig.soft_shadow_samples;
    }

    return shadowIntensity;
}
