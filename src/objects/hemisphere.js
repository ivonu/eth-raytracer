var Hemisphere = function (_sphere, _plane) {
    this.sphere = _sphere;
    this.plane = _plane;
};

Hemisphere.prototype.getBounding = function () {
    return this.sphere.getBounding();
}

Hemisphere.prototype.getNormal = function (intersectionPoint) {
    return intersectionPoint.subtract(this.center).toUnitVector();
}

Hemisphere.prototype.intersects = function (ray) {


    var sphereIntersection = this.sphere.intersects(ray);
    var planeIntersection = this.plane.intersects(ray);

    // just one intersection
    if (sphereIntersection === null || planeIntersection === null) return null;

    // sphere before plane intersection -> miss
    if (sphereIntersection.distance < planeIntersection.distance && sphereIntersection.distance2 < planeIntersection.distance) return null;

    // plane before sphere intersection -> intersection on sphere
    if (sphereIntersection.distance > planeIntersection.distance && sphereIntersection.distance2 > planeIntersection.distance) return sphereIntersection;

    // plane between sphere intersections -> intersection on plane
    if (sphereIntersection.distance < planeIntersection.distance && sphereIntersection.distance2 > planeIntersection.distance) return planeIntersection;

    // should never come here
    throw "Should not happen!";
    return planeIntersection;
}