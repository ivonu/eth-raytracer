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


Intersection.prototype.getAmbient = function () {
    if (RayConfig.texture && this.object.texture) {
        var uv = this.object.calcUV(this.getPoint());
        return this.object.texture.getPixelColor(uv[0], uv[1]);
    }
    return this.object.material.ambient;
}

Intersection.prototype.getDiffuse = function () {
    if (RayConfig.texture && this.object.texture) {
        var uv = this.object.calcUV(this.getPoint());
        return this.object.texture.getPixelColor(uv[0], uv[1]);
    }
    return this.object.material.diffuse;
}

Intersection.prototype.getSpecular = function () {
    if (RayConfig.texture && this.object.texture) {
        var uv = this.object.calcUV(this.getPoint());
        return this.object.texture.getPixelColor(uv[0], uv[1]);
    }
    return this.object.material.specular;
}


Intersection.prototype.getPoint = function () {
    if (this.point === null)
        this.point = this.ray.line.anchor.add (this.ray.line.direction.multiply(this.distance));

    return this.point;
}

Intersection.prototype.getNormal = function () {
    if (this.normal === null) {
        if (RayConfig.normalmap && this.object.normalmap) {

            var old_normal = this.normalObject.getNormal(this.getPoint());
            //old_normal = $V([-1,0,0]);

            var tangent1 = old_normal.cross($V([0,1,0])).toUnitVector();
            var tangent2 = old_normal.cross(tangent1).toUnitVector();

            var transMatrix = $M([
                tangent1.multiply(-1).elements,
                tangent2.multiply(-1).elements,
                old_normal.elements
            ]);

            transMatrix = transMatrix.transpose();

            var uv = this.object.calcUV(this.getPoint());
            var new_normal = this.object.normalmap.getNormal(uv[0], uv[1]);
            //new_normal = $V([1,0,1]).toUnitVector();

            this.normal = transMatrix.multiply(new_normal);

        } else {
            this.normal = this.normalObject.getNormal(this.getPoint());
        }
    }

    return this.normal;
}