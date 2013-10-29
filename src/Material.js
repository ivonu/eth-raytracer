var Material = function (_ambient, _diffuse, _specular, _specular_exp, _refraction_idx) {
    this.ambient = _ambient;
    this.diffuse = _diffuse;
    this.specular = _specular;
    this.specular_exp = _specular_exp;
    this.refraction_idx = _refraction_idx;
}

Material.red = function() {
    return new Material (
        new Color(0.75,0,0),   // ambient material color
        new Color(1,0,0),      // diffuse material color
        new Color(1,1,1),      // specular material color
        32.0,                  // specular exponent
        Infinity);             // refraction index
}

Material.blue = function() {
    return new Material (
        new Color(0,0,0.75),   // ambient material color
        new Color(0,0,1),      // diffuse material color
        new Color(0.5,0.5,1),  // specular material color
        16.0,                  // specular exponent
        1.5);                  // refraction index
}

Material.yellow = function() {
    return new Material (
        new Color(0.75,0.75,0),// interior ambient material color
        new Color(1,1,0),      // interior diffuse material color
        new Color(1,1,1),      // interior specular material color
        32.0,                  // interior specular exponent
        Infinity);             // refraction index
}

Material.redC1 = function() {
    return new Material (
        new Color(1,1,0),      // ambient material color
        new Color(1,1,0),      // diffuse material color
        new Color(1,1,1),      // specular material color
        32.0,                  // specular exponent
        Infinity);             // refraction index
}

Material.blueC1 = function() {
    return new Material (
        new Color(0,1,1),      // ambient material color
        new Color(0,1,1),      // diffuse material color
        new Color(1,1,1),      // specular material color
        32.0,                  // specular exponent
        Infinity);             // refraction index
}
