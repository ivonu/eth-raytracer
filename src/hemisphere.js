var Hemisphere = function (_sphere, _plane) {
    this.sphere = _sphere;
    this.plane = _plane;
};

Hemisphere.prototype.getNormal = function (intersectionPoint) {
    return intersectionPoint.subtract(this.center).toUnitVector();
}

Hemisphere.prototype.intersects = function (ray) {


    var sphereIntersection = this.sphere.intersects(ray);
    var planeIntersection = this.plane.intersects(ray);

    // just one intersection
    if (sphereIntersection === null || planeIntersection === null) return null;

    // sphere before plane intersection
    if (sphereIntersection.distance < planeIntersection.distance && sphereIntersection.distance2 < planeIntersection.distance) return null;

    if (sphereIntersection.distance > planeIntersection.distance && sphereIntersection.distance2 > planeIntersection.distance) return sphereIntersection;

    if (sphereIntersection.distance < planeIntersection.distance && sphereIntersection.distance2 > planeIntersection.distance) return planeIntersection;

    return planeIntersection;
}