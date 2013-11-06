var Triangle = function (_v1, _v2, _v3, _material) {
    this.v1 = _v1;
    this.v2 = _v2;
    this.v3 = _v3;

    this.n1 = null;
    this.n2 = null;
    this.n3 = null;

    this.material = _material;

    this.triangleNormal = null;
    this.area = null;

    this.bounding = null;
};

Triangle.prototype.getBounding = function () {
    if (this.bounding === null) {
        var min_x = Infinity;
        var min_y = Infinity;
        var min_z = Infinity;
        var max_x = -Infinity;
        var max_y = -Infinity;
        var max_z = -Infinity;

        if (this.v1.e(1) < min_x) min_x = this.v1.e(1);
        if (this.v2.e(1) < min_x) min_x = this.v2.e(1);
        if (this.v3.e(1) < min_x) min_x = this.v3.e(1);
        if (this.v1.e(1) > max_x) max_x = this.v1.e(1);
        if (this.v2.e(1) > max_x) max_x = this.v2.e(1);
        if (this.v3.e(1) > max_x) max_x = this.v3.e(1)

        if (this.v1.e(2) < min_y) min_y = this.v1.e(2);
        if (this.v2.e(2) < min_y) min_y = this.v2.e(2);
        if (this.v3.e(2) < min_y) min_y = this.v3.e(2);
        if (this.v1.e(2) > max_y) max_y = this.v1.e(2);
        if (this.v2.e(2) > max_y) max_y = this.v2.e(2);
        if (this.v3.e(2) > max_y) max_y = this.v3.e(2);

        if (this.v1.e(3) < min_z) min_z = this.v1.e(3);
        if (this.v2.e(3) < min_z) min_z = this.v2.e(3);
        if (this.v3.e(3) < min_z) min_z = this.v3.e(3);
        if (this.v1.e(3) > max_z) max_z = this.v1.e(3);
        if (this.v2.e(3) > max_z) max_z = this.v2.e(3);
        if (this.v3.e(3) > max_z) max_z = this.v3.e(3);

        this.bounding = new Bounding(
            max_x,
            min_x,
            max_y,
            min_y,
            max_z,
            min_z
        );
    }
    return this.bounding;
}

Triangle.prototype.getArea = function () {
    if (this.area === null) {
        var AB = this.v2.subtract(this.v1);
        var AC = this.v3.subtract(this.v1);
        var cr = AB.cross(AC);
        this.area = cr.distanceFrom($V([0,0,0])) / 2; // same?
        //this.area = Math.sqrt (cr.e(1)*cr.e(1) + cr.e(2)*cr.e(2) + cr.e(3)*cr.e(3)) / 2;
    }
    return this.area;
}

Triangle.prototype.getTriangleNormal = function () {
    if (this.triangleNormal === null) {
        var e1 = this.v1.subtract(this.v2);
        var e2 = this.v1.subtract(this.v3);
        this.triangleNormal = e1.cross(e2).toUnitVector();
    }
    return this.triangleNormal;
}

Triangle.prototype.getNormal = function (intersectionPoint) {
    if (this.n1 === null && this.n2 === null && this.n3 === null)
        return this.getTriangleNormal();

    var d1 = intersectionPoint.distanceFrom(this.v1);
    var d2 = intersectionPoint.distanceFrom(this.v2);
    var d3 = intersectionPoint.distanceFrom(this.v3);

    var normal = $V([0,0,0]);
    normal = normal.add (this.n1.multiply(1/d1));
    normal = normal.add (this.n2.multiply(1/d2));
    normal = normal.add (this.n3.multiply(1/d3));

    return normal.toUnitVector();
}


Triangle.prototype.intersects = function (ray) {
    // ⟨Get triangle vertices in p1, p2, and p3 140⟩
    var p1 = this.v1;
    var p2 = this.v2;
    var p3 = this.v3;

    // ⟨Compute s1 141⟩
    var e1 = p2.subtract(p1);
    var e2 = p3.subtract(p1);
    var s1 = ray.line.direction.cross(e2);
    var divisor = s1.dot(e1);

    if (divisor === 0)
        return null;
    var invDivisor = 1.0 / divisor;

    // ⟨Compute first barycentric coordinate 142⟩
    var d = ray.line.anchor.subtract(p1);
    var b1 = d.dot(s1) * invDivisor;
    if (b1 < 0 || b1 > 1)
        return null;

    // ⟨Compute second barycentric coordinate 142⟩
    var s2 = d.cross(e1);
    var b2 = ray.line.direction.dot(s2) * invDivisor;
    if (b2 < 0 || b1 + b2 > 1)
        return null;

    // ⟨Compute t to intersection point 142⟩
    var t = e2.dot(s2) * invDivisor;
    //if (t < ray.mint || t > ray.maxt)
    //    return false;

    // ⟨Compute triangle partial derivatives 143⟩
    // ⟨Interpolate (u, v) triangle parametric coordinates 143⟩
    // ⟨Test intersection against alpha texture, if present 144⟩
    // ⟨Fill in Differential Geometry from triangle hit 145⟩
    // *tHit = t;
    // *rayEpsilon = 1e-3f * *tHit;
    // return true;

    return new Intersection(ray, t, null, this, this, this.material);
}