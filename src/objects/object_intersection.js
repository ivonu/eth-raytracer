var ObjectIntersection = function (_object1, _object2, _material) {
    this.material = _material

    this.object1 = _object1;
    this.object2 = _object2;
};

ObjectIntersection.prototype.intersects = function (ray) {

    var inside = (ray.refraction_idx !== 1);

    var intersection1 = this.object1.intersects(ray);
    var intersection2 = this.object2.intersects(ray);

    // ray intersects just one object
    if (intersection1 === null || intersection2 === null) return null;

    if (intersection2.distance < intersection1.distance) {
        var tmp = intersection1;
        intersection1 = intersection2;
        intersection2 = tmp;
    }

    // second object starts after first object ends
    if (intersection1.distance2 < intersection2.distance) return null;

    var intersection = new Intersection(
        ray,
        intersection2.distance,
        Math.min (intersection1.distance2, intersection2.distance),
        intersection2.normalObject,
        this,
        this.material
    )

    return intersection;
}