var Ellipsoid = function (_center, _radius_x, _radius_y, _radius_z, _ambient, _diffuse, _specular, _specularExp, _refraction_idx) {
    this.center = _center;

    this.radius_x = _radius_x;
    this.radius_y = _radius_y;
    this.radius_z = _radius_z;

    this.ambient = _ambient;
    this.diffuse = _diffuse;
    this.specular = _specular;
    this.specular_exp = _specularExp;
    this.refraction_idx = _refraction_idx;
};

Ellipsoid.prototype.getNormal = function (intersectionPoint) {

    var normal = intersectionPoint.subtract(this.center);

    var t = $M([
        [2.0 / (this.radius_x * this.radius_x), 0, 0],
        [0, 2.0 / (this.radius_y * this.radius_y), 0],
        [0, 0, 2.0 / (this.radius_z * this.radius_z)]
    ]);

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
    if (under_root < 0 || a == 0 || b == 0 || c == 0)
        return null;

    var root = Math.sqrt(under_root);

    var t1 = (-b+root) / (2*a);
    var t2 = (-b-root) / (2*a);

    if (t1 < RayConfig.intersection_delta) return t2;
    if (t2 < RayConfig.intersection_delta) return t1;

    return Math.min(t1, t2);
}

// http://cudaopencl.blogspot.ch/2012/12/ellipsoids-finally-added-to-ray-tracing.html