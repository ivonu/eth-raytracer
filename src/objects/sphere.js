var Sphere = function (_center, _radius, _material, _texture, _normalmap) {
    this.center = _center;
    this.radius = _radius;

    this.material = _material;
    this.texture = _texture;
    this.normalmap = _normalmap;

    this.northDirection = $V([0,1,1]).toUnitVector();
    this.meridianDirection = $V([-1,1,-1]).toUnitVector();
};

Sphere.prototype.getBounding = function () {
    return new Bounding(
        this.center.e(1) + this.radius,
        this.center.e(1) - this.radius,
        this.center.e(2) + this.radius,
        this.center.e(2) - this.radius,
        this.center.e(3) + this.radius,
        this.center.e(3) - this.radius
    );
}

Sphere.prototype.getInclination = function (unitVector) {
    var x = unitVector.e(1);
    var y = unitVector.e(2);
    var z = unitVector.e(3);

    return Math.acos (y);
}

Sphere.prototype.getAzimuth = function (unitVector) {
    var x = unitVector.e(1);
    var y = unitVector.e(2);
    var z = unitVector.e(3);

    var azimuth =  Math.atan (x / z);

    if (z < 0) azimuth += Math.PI;
    else if (x < 0) azimuth += Math.PI*2;

    return azimuth;
}

Sphere.prototype.calcUV = function (intersectionPoint) {
    var center_to_point = intersectionPoint.subtract(this.center).toUnitVector();

    var origin = $V([0,0,0]);
    var rightDirection = $V([1,0,0]);
    var upDirection = $V([0,1,0]);
    var frontDirection = $V([0,0,1]);


    var meridianAngle = -Math.acos(this.meridianDirection.dot(frontDirection));
    center_to_point = center_to_point.rotate(meridianAngle, $L($V([0,0,0]), upDirection));
    upDirection     = upDirection.rotate(meridianAngle, $L(origin, upDirection));
    rightDirection  = rightDirection.rotate(meridianAngle, $L(origin, upDirection));
    frontDirection  = frontDirection.rotate(meridianAngle, $L(origin, upDirection));

    var northAngle = -Math.acos(this.northDirection.dot(upDirection));
    center_to_point = center_to_point.rotate(northAngle, $L(origin, rightDirection));
    upDirection     = upDirection.rotate(northAngle, $L(origin, rightDirection));
    rightDirection  = rightDirection.rotate(northAngle, $L(origin, rightDirection));
    frontDirection  = frontDirection.rotate(northAngle, $L(origin, rightDirection));

    var inclination = this.getInclination(center_to_point);
    var azimuth = this.getAzimuth(center_to_point);

    var u = azimuth / (2*Math.PI);
    var v = -(inclination/Math.PI) + 1;

    return [u, v];
}

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