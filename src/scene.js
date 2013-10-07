var Scene = function (_camera, _light) {
    this.objects = [];
    this.camera = _camera;
    this.light = _light;
};


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
                             800,               // image width
                             600);              // image height

    var light = new Light ($V([10,10,10]),      // position
                           new Color (1,1,1),   // color
                           0,                   // ambient intensity
                           1,                   // diffuse intensity
                           1,                   // specular intensity
                           0.2);                // global ambient intensity

    var s1 = new Sphere ($V([0,0,0]),           // center
                         2,                     // radius
                         new Color (0.75,0,0),  // ambient material color
                         new Color (1,0,0),     // diffuse material color
                         new Color(1,1,1),      // specular material color
                         32.0);                 // specular exponent

    var s2 = new Sphere ($V([1.25,1.25,3]),     // center
                         0.5,                   // radius
                         new Color (0,0,0.75),  // ambient material color
                         new Color (0,0,1),     // diffuse material color
                         new Color(0.5,0.5,1),  // specular material color
                         16.0);                 // specular exponent


    scene = new Scene (camera, light);

    scene.addObject(s1);
    scene.addObject(s2);

    console.log("scene loaded");
}