var Cylinder = function (_axis_line, _radii, _ambient, _diffuse, _specular, _specularExp, _refraction_idx) {
    this.axis_line = _axis_line;
    this.radii = _radii;

    this.ambient = _ambient;
    this.diffuse = _diffuse;
    this.specular = _specular;
    this.specular_exp = _specularExp;
    this.refraction_idx = _refraction_idx;
};

Cylinder.prototype.getNormal = function (intersectionPoint) {
    return null;
}

Cylinder.prototype.intersects = function (ray) {
    return null;
}