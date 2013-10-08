var Sphere = function (_center, _radius, _ambient, _diffuse, _specular, _specularExp) {
    this.center = _center;
    this.radius = _radius;
    this.ambient = _ambient;
    this.diffuse = _diffuse;
    this.specular = _specular;
    this.specular_exp = _specularExp;
};

Sphere.prototype.getNormal = function (intersectionPoint) {
    return intersectionPoint.subtract(this.center).toUnitVector();
}

Sphere.prototype.intersects = function (ray) {
    var o = ray.anchor;       // ray origin
    var d = ray.direction;    // ray vector
    var c = this.center;      // sphere center
    var r = this.radius;      // sphere radius
    var r2 = r*r;             // sphere radius squared

    // c-o : vector from ray origin to sphere center
    var co = c.subtract(o);

    // ||c-o||^2 : squared-distance from ray origin to sphere center
    var co2 = co.dot(co);

    // (c-o)*d : compute ray distance which is closest to sphere center
    var cod = co.dot(d);
    var cod2 = cod*cod;

    // reject if ray is outside or points away from sphere
    if (cod < 0)
        return null;

    // D^2 = ||c-o||^2 - ((c-o)*d)^2 : compute shortest squared-distance from sphere center to ray
    var D2 = co2 - cod2;

    // reject if greater than squared radius
    if (D2 > r2)
        return null;

    // t = (o-c)*d ± sqrt(r^2 - D^2) : compute half-chord squared-distance
    var r2D2 = r2 - D2;
    if (r2D2 < 0)
        return null;

    var t = cod - Math.sqrt(r2D2);
    var intersection_point = o.add(d.multiply(t));

    return intersection_point;
}