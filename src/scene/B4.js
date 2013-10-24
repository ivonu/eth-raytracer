
function loadB4() {
    var int = new ObjectIntersection(
        new Sphere (
            $V([1.25,1.25,3]),
            0.5,
            null
        ),
        new Sphere (
            $V([0.25,1.25,3]),
            1,
            null
        ),
        new Material (
            new Color(0,0,0.75),   // ambient material color
            new Color(0,0,1),      // diffuse material color
            new Color(0.5,0.5,1),  // specular material color
            16.0,                  // specular exponent
            1.5)                   // refraction index
    );
    scene.addObject(int);

    var s1 = new Hemisphere (
        new Sphere (
            $V([0,0,0]),
            2,
            new Material (
                new Color(0.75,0,0),   // exterior ambient material color
                new Color(1,0,0),      // exterior diffuse material color
                new Color(1,1,1),      // exterior specular material color
                32.0,                  // exterior specular exponent
                Infinity)              // refraction index
        ),
        new Plane (
            $V([0,0,0]),
            $V([-1,0,1]).toUnitVector(),
            new Material (
                new Color(0.75,0.75,0),// interior ambient material color
                new Color(1,1,0),      // interior diffuse material color
                new Color(1,1,1),      // interior specular material color
                32.0,                  // interior specular exponent
                Infinity)              // refraction index
        ));

    scene.addObject(s1);

}