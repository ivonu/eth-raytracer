var Scene = function (_camera, _globalAmbientIntensity) {
    this.objects = [];
    this.lights = [];
    this.globalAmbientIntensity = _globalAmbientIntensity;
    this.camera = _camera;
};

Scene.prototype.addLight = function (_light) {
    this.lights.push(_light);
}

Scene.prototype.addObject = function (_object) {
    this.objects.push(_object);
}

// global scene object
var scene;

// 0. set up the scene described in the exercise sheet (this is called before the rendering loop)
function loadScene() {
    scene = new Scene (null, 0.2); // global ambient intensity

    loadDefaultCamera();
    loadDefaultLight();

    if (ModuleId.B3) {
        loadB3();
    } else if (ModuleId.B4) {
        loadB4();
    } else if (ModuleId.X1) {
        loadAdditionalStuff();
    } else {
        loadA1();
    }

    console.log("scene loaded");
}

function loadDefaultCamera() {
    var camera = new Camera (
        $V([0,0,10]),      // position
        $V([0,0,-1]),      // view direction
        $V([0,1,0]),       // up direction
        40,                // field of view
        1,                 // distance
        RayConfig.width,   // image width
        RayConfig.height); // image height

    scene.camera = camera;
}

function loadDefaultLight() {
    var light = new Light (
        $V([10,10,10]),      // position
        new Color(1,1,1),    // color
        0,                   // ambient intensity
        1,                   // diffuse intensity
        1);                  // specular intensity

    scene.addLight(light);
}

function loadA1() {
    var s1 = new Sphere (
        $V([0,0,0]),           // center
        2,                     // radius
        new Color(0.75,0,0),   // ambient material color
        new Color(1,0,0),      // diffuse material color
        new Color(1,1,1),      // specular material color
        32.0,                  // specular exponent
        Infinity);             // refraction index

    var s2 = new Sphere (
        $V([1.25,1.25,3]),     // center
        0.5,                   // radius
        new Color(0,0,0.75),   // ambient material color
        new Color(0,0,1),      // diffuse material color
        new Color(0.5,0.5,1),  // specular material color
        16.0,                  // specular exponent
        1.5);                  // refraction index

    scene.addObject(s1);
    scene.addObject(s2);
}

function loadB3() {

    var cylinder = new Cylinder (
        $V([0,0,0]),           // axis line
        false,true,false,      // fixed x,y,z axis
        2,0,1,                 // radii
        new Color(0.75,0,0),   // ambient material color
        new Color(1,0,0),      // diffuse material color
        new Color(1,1,1),      // specular material color
        32.0,                  // specular exponent
        Infinity);             // refraction index

    var ellipsoid = new Ellipsoid (
        $V([1.25,1.25,3]),           // center
        0.25,0.75,0.5,                 // x,y,z radii
        new Color(0,0,0.75),   // ambient material color
        new Color(0,0,1),      // diffuse material color
        new Color(0.5,0.5,1),      // specular material color
        16.0,                  // specular exponent
        1.5);             // refraction index

    scene.addObject(cylinder);
    scene.addObject(ellipsoid);
}

function loadB4() {
    var int = new Intersection(
        new Color(0,0,0.75),   // ambient material color
        new Color(0,0,1),      // diffuse material color
        new Color(0.5,0.5,1),      // specular material color
        16.0,                  // specular exponent
        1.5             // refraction index
    );
    int.addObject(new Sphere (
        $V([1.25,1.25,3]),
        0.5,
        null, null, null, null, null
    ));
    int.addObject(new Sphere (
        $V([0.25,1.25,3]),
        1,
        null, null, null, null, null
    ));

    scene.addObject(int);



    var s1 = new Hemisphere (
        $V([0,0,0]),           // center
        2,                     // radius
        new Color(0.75,0,0),   // exterior ambient material color
        new Color(1,0,0),      // exterior diffuse material color
        new Color(1,1,1),      // exterior specular material color
        32.0,                  // exterior specular exponent
        new Color(0.75,0.75,0),// interior ambient material color
        new Color(1,1,0),      // interior diffuse material color
        new Color(1,1,1),      // interior specular material color
        32.0,                  // interior specular exponent
        Infinity);             // refraction index

    scene.addObject(s1);

}

function loadAdditionalStuff() {

    var light2 = new Light ($V([-10,10,10]),    // position
        new Color(1,1,1),    // color
        0,                   // ambient intensity
        1,                   // diffuse intensity
        1);                  // specular intensity

    var s3 = new Sphere ($V([0,-1,-5]),     // center
        1.5,                // radius
        new Color(0,0,0),   // ambient material color
        new Color(0.588235,0.670588,0.729412),   // diffuse material color
        new Color(0.9,0.9,0.9),   // specular material color
        30.0,               // specular exponent
        1.5);               // refraction index

    var s4 = new Sphere ($V([-2,-2.4,-1]),     // center
        0.5,                // radius
        new Color(0.24725, 0.1995, 0.0745),   // ambient material color
        new Color(0.75164, 0.60648, 0.22648),   // diffuse material color
        new Color(0.628281, 0.555802, 0.366065),   // specular material color
        51.2,               // specular exponent
        Infinity);               // refraction index

    var p1 = new Plane ($V([0,-3,0]), // point on plane
        $V([0,1,0]).toUnitVector(),                // normal
        new Color(0.75, 0.75, 0.75),   // ambient material color
        new Color(1, 1, 1),   // diffuse material color
        new Color(1, 1, 1),   // specular material color
        10,               // specular exponent
        Infinity);               // refraction index

    scene.lights = [];
    scene.addLight(light2);
    scene.addObject(s3);
    scene.addObject(s4);
    scene.addObject(p1);
}