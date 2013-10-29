function loadAdditionalStuff() {

    var light2 = new Light (
        $V([-10,10,10]),        // position
        new Color(1,1,1),       // color
        0,                      // ambient intensity
        1,                      // diffuse intensity
        1);                     // specular intensity

    var s3 = new Sphere (
        $V([0,-1,-2]),      // center
        1.5,                // radius
        new Material(
            new Color(0,0,0),                       // ambient material color
            new Color(0.588235,0.670588,0.729412),  // diffuse material color
            new Color(0.9,0.9,0.9),                 // specular material color
            30.0,                                   // specular exponent
            1.5));                                  // refraction index

    var s4 = new Sphere (
        $V([-2.5,-1.5,0]),       // center
        1,                      // radius
        new Material(
            new Color(0.24725, 0.1995, 0.0745),         // ambient material color
            new Color(0.75164, 0.60648, 0.22648),       // diffuse material color
            new Color(0.628281, 0.555802, 0.366065),    // specular material color
            51.2,                                       // specular exponent
            Infinity));                                 // refraction index

    var p1 = new Plane (
        $V([0,-3,0]),                       // point on plane
        $V([0,1,0]).toUnitVector(),         // normal
        new Material(
            new Color(0.75, 0.75, 0.75),    // ambient material color
            new Color(1, 1, 1),             // diffuse material color
            new Color(1, 1, 1),             // specular material color
            10,                             // specular exponent
            Infinity));                     // refraction index

    var i = new ObjectIntersection(
        new ObjectIntersection(
            new Sphere ($V([0,0.5,0]), 2, null),
            new Sphere ($V([0,0.5,0]), 2, null),
            null
        ),
        new ObjectIntersection(
            new Sphere ($V([0.,-0.5,0]), 2, null),
            new Sphere ($V([-0.,-0.5,0]), 2, null),
            null
        ),
        new Material(
            new Color(0.75, 0.75, 0.75),    // ambient material color
            new Color(1, 1, 1),             // diffuse material color
            new Color(1, 1, 1),             // specular material color
            10,                             // specular exponent
            Infinity)                      // refraction index
    )

    var i1 = new ObjectIntersection(
        new Sphere ($V([0.5,0,0]), 2, null),
        new Sphere ($V([-0.5,0,0]), 2, null),
        new Material(
            new Color(0.75, 0.75, 0.75),    // ambient material color
            new Color(1, 1, 1),             // diffuse material color
            new Color(1, 1, 1),             // specular material color
            10,                             // specular exponent
            Infinity)                      // refraction index
    )
    var i2 = new ObjectIntersection(
        new Sphere ($V([0,0.5,0]), 2, null),
        new Sphere ($V([0,-0.5,0]), 2, null),
        new Material(
            new Color(0.75, 0.75, 0.75),    // ambient material color
            new Color(1, 1, 1),             // diffuse material color
            new Color(1, 1, 1),             // specular material color
            10,                             // specular exponent
            Infinity)                      // refraction index
    )

    //scene.lights = [];
    //scene.addLight(light2);
    scene.addObject(s3);
    scene.addObject(s4);
    scene.addObject(p1);
    //scene.addObject(i);
    //scene.addObject(i1);
    //scene.addObject(i2);

    var i3 = new ObjectIntersection(
        i1, i2,
        new Material(
            new Color(0.75, 0.75, 0.75),    // ambient material color
            new Color(1, 1, 1),             // diffuse material color
            new Color(1, 1, 1),             // specular material color
            10,                             // specular exponent
            Infinity)                      // refraction index
    )
    //scene.addObject(i3);
}