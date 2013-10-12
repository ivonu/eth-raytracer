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

    var camera = new Camera ($V([0,0,10]),      // position
                             $V([0,0,-1]),      // view direction
                             $V([0,1,0]),       // up direction
                             40,                // field of view
                             1,                 // distance
                             RayConfig.width,   // image width
                             RayConfig.height); // image height

    var light = new Light ($V([10,10,10]),      // position
                           new Color(1,1,1),    // color
                           0,                   // ambient intensity
                           1,                   // diffuse intensity
                           1);                  // specular intensity

    var s1 = new Sphere ($V([0,0,0]),           // center
                         2,                     // radius
                         new Color(0.75,0,0),   // ambient material color
                         new Color(1,0,0),      // diffuse material color
                         new Color(1,1,1),      // specular material color
                         32.0,                  // specular exponent
                         Infinity);             // refraction index

    var s2 = new Sphere ($V([1.25,1.25,3]),     // center
                         0.5,                   // radius
                         new Color(0,0,0.75),   // ambient material color
                         new Color(0,0,1),      // diffuse material color
                         new Color(0.5,0.5,1),  // specular material color
                         16.0,                  // specular exponent
                         1.5);                  // refraction index

    scene = new Scene (camera, 0.2); // global ambient intensity

    scene.addLight(light);
    scene.addObject(s1);
    scene.addObject(s2);

    loadAdditionalStuff();

    console.log("scene loaded");
}

function loadAdditionalStuff() {

    var light2 = new Light ($V([-10,10,10]),    // position
        new Color(1,1,1),    // color
        0,                   // ambient intensity
        1,                   // diffuse intensity
        1);                  // specular intensity

    var s3 = new Sphere ($V([0,0,0]),     // center
        1,                // radius
        new Color(0,0,0),   // ambient material color
        new Color(0.588235,0.670588,0.729412),   // diffuse material color
        new Color(0.9,0.9,0.9),   // specular material color
        96.0,               // specular exponent
        1.5);               // refraction index

    var s4 = new Sphere ($V([-2,-1,3]),     // center
        0.5,                // radius
            new Color(0.24725, 0.1995, 0.0745),   // ambient material color
        new Color(0.75164, 0.60648, 0.22648),   // diffuse material color
        new Color(0.628281, 0.555802, 0.366065),   // specular material color
        51.2,               // specular exponent
        Infinity);               // refraction index

    //scene.addLight(light2);
    //scene.addObject(s3);
    scene.addObject(s4);
}