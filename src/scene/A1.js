function loadA1() {

    var s1 = new Sphere (
        $V([0,0,0]),           // center
        2,                     // radius
        new Material (
            new Color(0.75,0,0),   // ambient material color
            new Color(1,0,0),      // diffuse material color
            new Color(1,1,1),      // specular material color
            32.0,                  // specular exponent
            Infinity));            // refraction index

    var s2 = new Sphere (
        $V([1.25,1.25,3]),     // center
        0.5,                   // radius
        new Material (
            new Color(0,0,0.75),   // ambient material color
            new Color(0,0,1),      // diffuse material color
            new Color(0.5,0.5,1),  // specular material color
            16.0,                  // specular exponent
            1.5));                 // refraction index

    scene.addObject(s1);
    scene.addObject(s2);
}