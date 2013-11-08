var Scene = function (_globalAmbientIntensity) {
    this.objects = [];
    this.lights = [];
    this.globalAmbientIntensity = _globalAmbientIntensity;
    this.camera = null;

    this.octree = new Octree(null, 0);
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

    scene = new Scene (0.2); // global ambient intensity

    loadDefaultCamera();

    if (ModuleId.D2) {
        loadAreaLight();
    } else {
        loadDefaultLight();
    }

    if (ModuleId.B3) {
        loadB3();

    } else if (ModuleId.B4) {
        loadB4();

    } else if (ModuleId.C3) {
        loadC3();

    } else if (ModuleId.D1) {
        loadD1();

    } else if (ModuleId.X1) {
        loadX1();

    } else if (ModuleId.X2) {
        loadX2();

    } else {
        loadA1();
    }

    if (RayConfig.octree) {
        var depth = Math.min (Math.floor (Math.log (scene.objects.length) / Math.log(8)), RayConfig.octree_max_depth);
        scene.octree = new Octree(Bounding.getBoundingFromObjects(scene.objects), depth);
        for (var i = 0; i < scene.objects.length; i++) {
            scene.octree.insertObject(scene.objects[i]);
        }
    }

    console.log("scene loaded");
}

function loadDefaultCamera() {
    var camera = new Camera (
        $V([0,0,10]),      // position
        $V([0,0,-1]),      // view direction
        $V([0,1,0]),       // up direction
        40,                // field of view
        8.5,                 // distance
        RayConfig.width,   // image width
        RayConfig.height); // image height

    scene.camera = camera;
}

function loadDefaultLight() {
    var light = new PointLight (
        $V([10,10,10]),      // position
        new Color(1,1,1),    // color
        0,                   // ambient intensity
        1,                   // diffuse intensity
        1);                  // specular intensity

    scene.addLight(light);
}

function loadAreaLight() {
    var light = new AreaLight (
        $V([10,10,10]),      // position
        1,
        $V([0,0,0]).subtract($V([10,10,10])).toUnitVector(),
        new Color(1,1,1),    // color
        0,                   // ambient intensity
        1,                   // diffuse intensity
        1);                  // specular intensity

    scene.addLight(light);
}



