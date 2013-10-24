var Cylinder = function (_axis_line, _fixed_x, _fixed_y, _fixed_z, _radius_x, _radius_y, _radius_z, _material) {
    this.axis_line = _axis_line;

    this.fixed_x = _fixed_x;
    this.fixed_y = _fixed_y;
    this.fixed_z = _fixed_z;

    this.radius_x = _radius_x;
    this.radius_y = _radius_y;
    this.radius_z = _radius_z;

    this.material = _material
};

Cylinder.prototype.getNormal = function (intersectionPoint) {

    var t = $M([
        [(this.fixed_x ? 0 : 2 / (this.radius_x * this.radius_x)), 0, 0],
        [0, (this.fixed_y ? 0 : 2 / (this.radius_y * this.radius_y)), 0],
        [0, 0, (this.fixed_z ? 0 : 2 / (this.radius_z * this.radius_z))]
    ]);

    var normal = intersectionPoint.subtract(this.axis_line);
    normal = t.multiply(normal);

    return normal.toUnitVector();
}

Cylinder.prototype.intersects = function (ray) {

    var oc = ray.line.anchor.subtract(this.axis_line);
    var dir = ray.line.direction.toUnitVector();

    var a =
          (this.fixed_x ? 0 : ((dir.e(1)*dir.e(1)) / (this.radius_x*this.radius_x)))
        + (this.fixed_y ? 0 : ((dir.e(2)*dir.e(2)) / (this.radius_y*this.radius_y)))
        + (this.fixed_z ? 0 : ((dir.e(3)*dir.e(3)) / (this.radius_z*this.radius_z)));

    var b =
          (this.fixed_x ? 0 : ((2*oc.e(1)*dir.e(1)) / (this.radius_x*this.radius_x)))
        + (this.fixed_y ? 0 : ((2*oc.e(2)*dir.e(2)) / (this.radius_y*this.radius_y)))
        + (this.fixed_z ? 0 : ((2*oc.e(3)*dir.e(3)) / (this.radius_z*this.radius_z)));

    var c =
          (this.fixed_x ? 0 : ((oc.e(1)*oc.e(1)) / (this.radius_x*this.radius_x)))
        + (this.fixed_y ? 0 : ((oc.e(2)*oc.e(2)) / (this.radius_y*this.radius_y)))
        + (this.fixed_z ? 0 : ((oc.e(3)*oc.e(3)) / (this.radius_z*this.radius_z)))
        - 1;

    var under_root = ((b*b)-(4.0*a*c));
    if (under_root < 0 || a == 0 || b == 0)// || c == 0)
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
