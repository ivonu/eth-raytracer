var Ellipsoid = function (_center, _radius_x, _radius_y, _radius_z, _material) {
    this.center = _center;

    this.radius_x = _radius_x;
    this.radius_y = _radius_y;
    this.radius_z = _radius_z;

    this.material = _material
    this.bounding = null;
};

Ellipsoid.prototype.getBounding = function () {
    if (this.bounding === null) {
        this.bounding = new Bounding(
            this.center.e(1) + this.radius_x,
            this.center.e(1) - this.radius_x,
            this.center.e(2) + this.radius_y,
            this.center.e(2) - this.radius_y,
            this.center.e(3) + this.radius_z,
            this.center.e(3) - this.radius_z
        );
    }
    return this.bounding;
}

Ellipsoid.prototype.getNormal = function (intersectionPoint) {


    var t = $M([
        [2 / (this.radius_x * this.radius_x), 0, 0],
        [0, 2 / (this.radius_y * this.radius_y), 0],
        [0, 0, 2 / (this.radius_z * this.radius_z)]
    ]);

    var normal = intersectionPoint.subtract(this.center);
    normal = t.multiply(normal);

    return normal.toUnitVector();
}

Ellipsoid.prototype.intersects = function (ray) {

    var oc = ray.line.anchor.subtract(this.center);
    var dir = ray.line.direction.toUnitVector();

    var a =
          ((dir.e(1)*dir.e(1)) / (this.radius_x*this.radius_x))
        + ((dir.e(2)*dir.e(2)) / (this.radius_y*this.radius_y))
        + ((dir.e(3)*dir.e(3)) / (this.radius_z*this.radius_z));
    
    var b =
          ((2*oc.e(1)*dir.e(1)) / (this.radius_x*this.radius_x))
        + ((2*oc.e(2)*dir.e(2)) / (this.radius_y*this.radius_y))
        + ((2*oc.e(3)*dir.e(3)) / (this.radius_z*this.radius_z));
    
    var c =
          ((oc.e(1)*oc.e(1)) / (this.radius_x*this.radius_x))
        + ((oc.e(2)*oc.e(2)) / (this.radius_y*this.radius_y))
        + ((oc.e(3)*oc.e(3)) / (this.radius_z*this.radius_z))
        - 1;

    var under_root = ((b*b)-(4.0*a*c));
    if (under_root < 0 || a == 0 || b == 0) // || c == 0)
        return null;

    var root = Math.sqrt(under_root);

    var t1 = (-b+root) / (2*a);
    var t2 = (-b-root) / (2*a);

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

// http://cudaopencl.blogspot.ch/2012/12/ellipsoids-finally-added-to-ray-tracing.html