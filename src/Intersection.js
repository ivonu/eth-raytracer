var Intersection = function (_ray, _t1, _t2, _normalObject, _object, _material) {

    if (_t1 < RayConfig.intersection_delta && _t1 > -RayConfig.intersection_delta) _t1 = 0;
    if (_t2 < RayConfig.intersection_delta && _t2 > -RayConfig.intersection_delta) _t2 = 0;

    if (_t1 > 0 && _t2 > 0) {
        this.distance = Math.min (_t1, _t2);
        this.distance2 = Math.max (_t1, _t2);

    } else if (_t1 > 0 && _t2 <= 0) {
        this.distance = _t1;
        this.distance2 = _t2;

    } else if (_t2 > 0 && _t1 <= 0) {
        this.distance = _t2;
        this.distance2 = _t2;
    }

    this.ray = _ray;

    this.normalObject = _normalObject;
    this.material = _material;
    this.object = _object;

    this.normal = null;
    this.point = null;
}

Intersection.prototype.getPoint = function () {
    if (this.point === null)
        this.point = this.ray.line.anchor.add (this.ray.line.direction.multiply(this.distance));

    return this.point;
}

Intersection.prototype.getNormal = function () {
    if (this.normal === null)
        this.normal = this.normalObject.getNormal(this.getPoint());

    return this.normal;
}