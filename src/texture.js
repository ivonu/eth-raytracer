var Texture = function (_texture, _specular_exp, _refraction_idx) {

    this.tga = readTGA(_texture);

    this.specular_exp = _specular_exp;
    this.refraction_idx = _refraction_idx;
}

Texture.prototype.getPixelColor = function (u, v) {
    u = Math.floor(u * this.tga.header.width);
    v = Math.floor(v * this.tga.header.height);

    var id = 3 * (v * this.tga.header.width + u);

    var r = this.tga.image[id + 2] / 255.0;
    var g = this.tga.image[id + 1] / 255.0;
    var b = this.tga.image[id + 0] / 255.0;

    return new Color (r,g,b);
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