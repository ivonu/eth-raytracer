var Ellipsoid = function (_center, _axis_x, _axis_y, _axis_z, _radius_x, _radius_y, _radius_z, _ambient, _diffuse, _specular, _specularExp, _refraction_idx) {
    this.center = _center;

    this.m = $M([
        _axis_x.multiply(_radius_x).elements,
        _axis_y.multiply(_radius_y).elements,
        _axis_z.multiply(_radius_z).elements
    ]);

    this.ambient = _ambient;
    this.diffuse = _diffuse;
    this.specular = _specular;
    this.specular_exp = _specularExp;
    this.refraction_idx = _refraction_idx;
};

Ellipsoid.prototype.getNormal = function (intersectionPoint) {

    var normal = intersectionPoint.subtract(this.center);
    console.rlog(normal.inspect());

//    normal.x = 2*normal.x / (ellipsoid.size.x*ellipsoid.size.x);
//    normal.y = 2*normal.y / (ellipsoid.size.y*ellipsoid.size.y);
//    normal.z = 2*normal.z / (ellipsoid.size.z*ellipsoid.size.z);

    normal = this.m.inverse().multiply(normal.multiply(2)).toUnitVector();

    console.rlog(normal.inspect());

    //return normal;

    //return intersectionPoint.subtract(this.center).toUnitVector();

    return this.m.multiply(intersectionPoint.subtract(this.center)).toUnitVector();
}

Ellipsoid.prototype.intersects = function (ray) {

    // Ray
    // P(t) = (x,y,z) = s + t*v

    // Ellipsoid
    // F(x,y,z): x^2 / a^2 + y^2 / b^2 + z^2 / c^2 - 1 = 0

    var v = ray.line.direction;
    var s = ray.line.anchor;
    var c = this.center;

    var mm = this.m.map(function(x) { return (x*x); }).inverse();

    //v = mm.multiply(v);
    //s = mm.multiply(s);
    //c = mm.multiply(c);

    var A = v.dot(v);
    var B = 2* s.dot(v) - 2*c.dot(v);
    var C = s.dot(s) + c.dot(c) - 2*c.dot(s) - 1;

    var under_root = B*B - 4*A*C;

    if (under_root < 0) return null;

    var t1 = (-B + Math.sqrt(under_root) ) / 2*A;
    var t2 = (-B - Math.sqrt(under_root) ) / 2*A;

    if (t1 < RayConfig.intersection_delta) return t2;
    if (t2 < RayConfig.intersection_delta) return t1;

    return Math.min(t1, t2);
}