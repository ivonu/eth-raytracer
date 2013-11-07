var Texture = function (_texture, _specular_exp, _refraction_idx) {

    this.tga = readTGA(_texture);

    this.specular_exp = _specular_exp;
    this.refraction_idx = _refraction_idx;
}

Texture.prototype.getColor = function (u, v) {
    //return this.noFilter(u, v);
    return this.bilinearFilter(u, v);
}

Texture.prototype.getPixelColor = function (u, v) {
    var id = 3 * (v * this.tga.header.width + u);

    var r = this.tga.image[id + 2] / 255.0;
    var g = this.tga.image[id + 1] / 255.0;
    var b = this.tga.image[id + 0] / 255.0;

    return new Color (r,g,b);
}

Texture.prototype.noFilter = function (u,v) {
    var fu = Math.floor(u * this.tga.header.width);
    var fv = Math.floor(v * this.tga.header.height);

    return this.getPixelColor(fu, fv);
}

Texture.prototype.bilinearFilter = function (u, v) {
    // exact pixel values
    u = u * this.tga.header.width;
    v = v * this.tga.header.height;

    // integer pixel values surrounding the exact value
    var u1 = Math.floor(u);
    var v1 = Math.floor(v);
    var u2 = Math.min ((u1 + 1), this.tga.header.width-1);
    var v2 = Math.min ((v1 + 1), this.tga.header.height-1);

    // fractional parts of u and v
    var frac_u = u - Math.floor (u);
    var frac_v = v - Math.floor (v);

    // weight factors of the surrounding pixels
    var w1 = (1 - frac_u) * (1 - frac_v);
    var w2 = frac_u * (1 - frac_v);
    var w3 = (1 - frac_u) * frac_v;
    var w4 = frac_u *  frac_v;

    // weighted pixel colors of the surrounding pixels
    var c1 = this.getPixelColor(u1, v1).multiply(w1);
    var c2 = this.getPixelColor(u2, v1).multiply(w2);
    var c3 = this.getPixelColor(u1, v2).multiply(w3);
    var c4 = this.getPixelColor(u2, v2).multiply(w4);

    /// add them together
    return c1.add(c2).add(c3).add(c4);
}

Texture.earth = function() {
    return new Texture (
        "data/Earth.tga",
        32.0,                  // specular exponent
        Infinity);             // refraction index
}

Texture.moon = function() {
    return new Texture (
        "data/Moon.tga",
        16.0,                  // specular exponent
        Infinity);             // refraction index
}