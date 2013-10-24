var Intersection = function (_ambient, _diffuse, _specular, _specularExp, _refraction_idx) {
    this.ambient = _ambient;
    this.diffuse = _diffuse;
    this.specular = _specular;
    this.specular_exp = _specularExp;
    this.refraction_idx = _refraction_idx;

    this.objects = [];
};

Intersection.prototype.addObject = function (object) {
    this.objects.push(object);
}

Intersection.prototype.intersects = function (ray) {
    var inside = (ray.refraction_idx !== 1);

    var min_inner_intersection = null;

    var min_outer_intersection = null;
    var max_outer_intersection = null;

    for (var i = 0; i < this.objects.length; i++) {
        var intersection = this.objects[i].intersects(ray);

        if (intersection !== null) {

            if (!inside) {
                // check if object is nearer than the last one
                if (min_inner_intersection === null || (intersection[0] !== null && intersection[0] > RayConfig.intersection_delta && intersection[0] < min_inner_intersection[0])) {
                    min_inner_intersection = intersection;
                }

            } else {

                // get furthers outer intersection
                if (max_outer_intersection === null || (intersection[2] !== null && intersection[2] > RayConfig.intersection_delta && intersection[2] > max_outer_intersection[2])) {
                    max_outer_intersection = intersection;
                }
                // get nearest outer intersection
                if (min_outer_intersection === null || (intersection[2] !== null && intersection[2] > RayConfig.intersection_delta && intersection[2] < min_outer_intersection[2])) {
                    min_outer_intersection = intersection;
                }

                // get nearest inner intersection
                if (min_inner_intersection === null || (intersection[0] !== null && intersection[0] > RayConfig.intersection_delta && intersection[0] < min_inner_intersection[0])) {
                    min_inner_intersection = intersection;
                }
            }
        }
    }

    var intersection = min_inner_intersection;

    if (inside) {
        if (min_inner_intersection !== null && min_outer_intersection[2] < min_inner_intersection[0]) intersection = min_outer_intersection;
        else intersection = max_outer_intersection;
    }

    return intersection;
}