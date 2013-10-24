
function loadB3() {

    var cylinder = new Cylinder (
        $V([0,0,0]),               // axis line
        false,true,false,          // fixed x,y,z axis
        2,0,1,                     // radii
        new Material (
            new Color(0.75,0,0),   // ambient material color
            new Color(1,0,0),      // diffuse material color
            new Color(1,1,1),      // specular material color
            32.0,                  // specular exponent
            Infinity));            // refraction index

    var ellipsoid = new Ellipsoid (
        $V([1.25,1.25,3]),         // center
        0.25,0.75,0.5,             // x,y,z radii
        new Material (
            new Color(0,0,0.75),   // ambient material color
            new Color(0,0,1),      // diffuse material color
            new Color(0.5,0.5,1),  // specular material color
            16.0,                  // specular exponent
            1.5));                 // refraction index

    scene.addObject(cylinder);
    scene.addObject(ellipsoid);
}