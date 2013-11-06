var Bounding = function (_x_max, _x_min, _y_max, _y_min, _z_max, _z_min) {
    this.x_max = _x_max;
    this.x_min = _x_min;
    this.y_max = _y_max;
    this.y_min = _y_min;
    this.z_max = _z_max;
    this.z_min = _z_min;

    this.x_width = this.x_max - this.x_min;
    this.y_width = this.y_max - this.y_min;
    this.z_width = this.z_max - this.z_min;
}

Bounding.prototype.contains = function (bounding) {
    if (bounding.x_min > this.x_max || bounding.x_max < this.x_min) return false;
    if (bounding.y_min > this.y_max || bounding.y_max < this.y_min) return false;
    if (bounding.z_min > this.z_max || bounding.z_max < this.z_min) return false;

    return true;
}

Bounding.prototype.intersects = function (ray) {
    var o = ray.line.anchor;
    var d = ray.line.direction;

    var t_x1 = (this.x_min - o.e(1)) / d.e(1);
    var t_y1 = (this.y_min - o.e(2)) / d.e(2);
    var t_z1 = (this.z_min - o.e(3)) / d.e(3);
    var t_x2 = (this.x_max - o.e(1)) / d.e(1);
    var t_y2 = (this.y_max - o.e(2)) / d.e(2);
    var t_z2 = (this.z_max - o.e(3)) / d.e(3);

    var t_x_min = Math.min (t_x1, t_x2);
    var t_x_max = Math.max (t_x1, t_x2);
    var t_y_min = Math.min (t_y1, t_y2);
    var t_y_max = Math.max (t_y1, t_y2);
    var t_z_min = Math.min (t_z1, t_z2);
    var t_z_max = Math.max (t_z1, t_z2);

    var t_min = Math.max (t_x_min, t_y_min, t_z_min);
    var t_max = Math.min (t_x_max, t_y_max, t_z_max);

    // intersection if t_min < t_max
    return (t_min < t_max);
}

Bounding.getBoundingFromObjects = function (objects) {
    var x_min = Infinity;
    var y_min = Infinity;
    var z_min = Infinity;
    var x_max = -Infinity;
    var y_max = -Infinity;
    var z_max = -Infinity;

    for (var i = 0; i < objects.length; i++) {
        var bounding = objects[i].getBounding();
        if (bounding.x_min < x_min) x_min = bounding.x_min;
        if (bounding.y_min < y_min) y_min = bounding.y_min;
        if (bounding.z_min < z_min) z_min = bounding.z_min;
        if (bounding.x_max > x_max) x_max = bounding.x_max;
        if (bounding.y_max > y_max) y_max = bounding.y_max;
        if (bounding.z_max > z_max) z_max = bounding.z_max;
    }

    return new Bounding (
        x_max,
        x_min,
        y_max,
        y_min,
        z_max,
        z_min
    );
}