var Color = function (_r, _g, _b) {
    this.r = _r;
    this.g = _g;
    this.b = _b;

    this.normalize();
};

Color.fromVector = function (_vector) {
    return new Color (_vector.e(1), _vector.e(2), _vector.e(3));
}

Color.random = function() {
    return new Color(Math.random(), Math.random(), Math.random());
}

Color.prototype.normalize = function() {
    if (this.r < 0) this.r = 0;
    if (this.g < 0) this.g = 0;
    if (this.b < 0) this.b = 0;
    if (this.r > 1) this.r = 1;
    if (this.g > 1) this.g = 1;
    if (this.b > 1) this.b = 1;
}


Color.prototype.add = function (color) {
    return new Color (this.r + color.r, this.g + color.g, this.b + color.b);
}


Color.prototype.multiply = function (skalar) {
    return new Color (this.r * skalar, this.g * skalar, this.b * skalar);
}


Color.prototype.multiplyColor = function (color) {
    return new Color (this.r * color.r, this.g * color.g, this.b * color.b);
}

Color.prototype.toVector = function () {
    return $V([this.r, this.g, this.b]);
}