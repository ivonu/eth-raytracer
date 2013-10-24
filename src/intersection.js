var Intersection = function (_object1, _object2, _ambient, _diffuse, _specular, _specularExp, _refraction_idx) {
    this.ambient = _ambient;
    this.diffuse = _diffuse;
    this.specular = _specular;
    this.specular_exp = _specularExp;
    this.refraction_idx = _refraction_idx;

    this.object1 = _object1;
    this.object2 = _object2;
};

Intersection.prototype.intersects = function (ray) {

    var inside = (ray.refraction_idx !== 1);

    var intersection1 = this.object1.intersects(ray);
    var intersection2 = this.object2.intersects(ray);

    // ray intersects just one object
    if (intersection1 === null || intersection2 === null) return null;

    if (intersection2[0] < intersection1[0]) {
        var tmp = intersection1;
        intersection1 = intersection2;
        intersection2 = tmp;
    }

    // second object starts after first object ends
    if (intersection1[2] < intersection2[0]) return null;

    var intersection = intersection2;

    return intersection;
}