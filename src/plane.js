var Plane = function (_point, _normal, _material) {
    this.point = _point;
    this.normal = _normal;

    this.material = _material
};

Plane.prototype.getNormal = function (intersectionPoint) {
    return this.normal;
}

Plane.prototype.intersects = function (ray) {
    var d = this.point.subtract(ray.line.anchor).dot(this.normal) /
            ray.line.direction.dot(this.normal);

    if (d < 0) return null;

    var intersection = new Intersection(
        ray,
        d,
        0,
        this,
        this,
        this.material
    )

    return intersection;
}