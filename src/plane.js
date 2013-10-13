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
    var l0 = ray.line.anchor;
    var p0 = this.point;
    var n = this.normal;
    var l = ray.line.direction;

    var d = -( (l0.subtract(p0).dot(n)) / (l.dot(n)) );
    d = p0.subtract(l0).dot(n) / l.dot(n);

    if (d < 0) return null;

    return l0.add(l.multiply(d));
}