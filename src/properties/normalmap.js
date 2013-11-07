var NormalMap = function (_normalmap) {

    this.tga = readTGA(_normalmap);
}

NormalMap.prototype.getNormal = function (u, v) {
    //return this.noFilter(u, v);
    return this.bilinearFilter(u, v);
}

NormalMap.prototype.getPixelNormal = function (u, v) {
    var id = 3 * (v * this.tga.header.width + u);

    var r = this.tga.image[id + 2] / 255.0;
    var g = this.tga.image[id + 1] / 255.0;
    var b = this.tga.image[id + 0] / 255.0;

    return $V([2*r-1, 2*g-1, 2*b-1]).toUnitVector();
}

NormalMap.prototype.noFilter = function (u,v) {
    var fu = Math.floor(u * this.tga.header.width);
    var fv = Math.floor(v * this.tga.header.height);

    return this.getPixelNormal(fu, fv);
}

NormalMap.prototype.bilinearFilter = function (u, v) {
    // exact pixel values
    var u = u * this.tga.header.width;
    var v = v * this.tga.header.height;

    // integer pixel values surrounding the exact value
    var u1 = Math.floor(u);
    var v1 = Math.floor(v);
    var u2 = (u1 + 1);
    var v2 = (v1 + 1);

    // fractional parts of u and v
    var frac_u = u - Math.floor (u);
    var frac_v = v - Math.floor (v);

    // weight factors of the surrounding pixels
    var w1 = (1 - frac_u) * (1 - frac_v);
    var w2 = frac_u * (1 - frac_v);
    var w3 = (1 - frac_u) * frac_v;
    var w4 = frac_u *  frac_v;

    // weighted pixel colors of the surrounding pixels
    var n1 = this.getPixelNormal(u1, v1).multiply(w1);
    var n2 = this.getPixelNormal(u2, v1).multiply(w2);
    var n3 = this.getPixelNormal(u1, v2).multiply(w3);
    var n4 = this.getPixelNormal(u2, v2).multiply(w4);

    /// add them together
    return n1.add(n2).add(n3).add(n4);
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