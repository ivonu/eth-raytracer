var Sphere = function (_center, _radius, _material) {
    this.center = _center;
    this.radius = _radius;

    this.material = _material
};

Sphere.prototype.getNormal = function (intersectionPoint) {
    return intersectionPoint.subtract(this.center).toUnitVector();
}

Sphere.prototype.intersects = function (ray) {
    var o = ray.line.anchor;       // ray origin
    var d = ray.line.direction;    // ray vector
    var c = this.center;      // sphere center
    var r = this.radius;      // sphere radius
    var r2 = r*r;             // sphere radius squared

    // c-o : vector from ray origin to sphere center
    var oc = c.subtract(o);

    // ||c-o||^2 : squared-distance from ray origin to sphere center
    var oc2 = oc.dot(oc);

    // (c-o)*d : compute ray distance which is closest to sphere center
    var ocd = oc.dot(d);
    var ocd2 = ocd*ocd;

    // reject if ray is outside or points away from sphere
    if (ocd < 0)
        return null;

    // D^2 = ||c-o||^2 - ((c-o)*d)^2 : compute shortest squared-distance from sphere center to ray
    var D2 = oc2 - ocd2;

    // reject if greater than squared radius
    if (D2 > r2)
        return null;

    // t = (o-c)*d ± sqrt(r^2 - D^2) : compute half-chord squared-distance
    var r2D2 = r2 - D2;
    if (r2D2 < 0)
        return null;

    var t1 = ocd - Math.sqrt(r2D2);
    var t2 = ocd + Math.sqrt(r2D2);

    // no intersection (or just self-intersection)
    if (t1 < RayConfig.intersection_delta && t2 < RayConfig.intersection_delta) return null;

    var intersection = new Intersection(
        ray,
        t1,
        t2,
        this,
        this,
        this.material
    )

    return intersection;
}