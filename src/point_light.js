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