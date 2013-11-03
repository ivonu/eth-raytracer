var NormalMap = function (_normalmap) {

    this.tga = readTGA(_normalmap);
}

NormalMap.prototype.getNormal = function (u, v) {
    u = Math.floor(u * this.tga.header.width);
    v = Math.floor(v * this.tga.header.height);

    var id = 3 * (v * this.tga.header.width + u);

    var r = this.tga.image[id + 2] / 255.0;
    var g = this.tga.image[id + 1] / 255.0;
    var b = this.tga.image[id + 0] / 255.0;

    return $V([2*r-1, 2*g-1, 2*b-1]);
}

NormalMap.earth = function() {
    return new NormalMap (
        "data/EarthNormal.tga"
    );
}

NormalMap.moon = function() {
    return new NormalMap (
        "data/MoonNormal.tga"
    );
}