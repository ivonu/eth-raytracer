var Plane = function (_point, _normal, _ambient, _diffuse, _specular, _specularExp, _refraction_idx) {
    this.point = _point;
    this.normal = _normal;

    this.ambient = _ambient;
    this.diffuse = _diffuse;
    this.specular = _specular;
    this.specular_exp = _specularExp;
    this.refraction_idx = _refraction_idx;
};

Plane.prototype.getNormal = function (intersectionPoint) {
    return this.normal;
}

Plane.prototype.intersects = function (ray) {
    var d = this.point.subtract(ray.line.anchor).dot(this.normal) /
            ray.line.direction.dot(this.normal);

    if (d < 0) return null;

    return [d, this.normal, d];
}