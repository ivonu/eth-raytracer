var Plane = function (_point, _normal, _material) {
    this.point = _point;
    this.normal = _normal;

    this.material = _material;

    this.bounding = null;
};

Plane.prototype.getBounding = function () {
    if (this.bounding === null) {
        this.bounding = new Bounding(
            Infinity,
            -Infinity,
            Infinity,
            -Infinity,
            Infinity,
            -Infinity
        );
    }
    return this.bounding;
}

Plane.prototype.getNormal = function (intersectionPoint) {
    return this.normal;
}

Plane.prototype.intersects = function (ray) {

    var cos = ray.line.direction.dot(this.normal);

    if (cos === 0) return null;

    var d = this.point.subtract(ray.line.anchor).dot(this.normal) / cos;

    if (d < RayConfig.intersection_delta) return null;

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