
console.rlog = function (msg) {
    if (Math.random() > 0.001) return;
    console.log(msg);
}

Vector.prototype.toString = function () {
    return this.e(1) + "/" + this.e(2) + "/" + this.e(3);
}


var Color = function (_r, _g, _b) {
    this.r = _r;
    this.g = _g;
    this.b = _b;
};

var Sphere = function (_center, _radius, _ambient, _diffuse, _specular, _specularExp) {
    this.center = _center;
    this.radius = _radius;
    this.ambient = _ambient;
    this.diffuse = _diffuse;
    this.specular = _specular;
    this.specular_exp = _specularExp;
};

var Light = function (_pos, _color, _ambientIntensity, _diffuseIntensity, _specularIntensity, _globalAmbientIntensity) {
    this.pos = _pos;
    this.color = _color;
    this.ambientIntensity = _ambientIntensity;
    this.diffuseIntensity = _diffuseIntensity;
    this.specularIntensity = _specularIntensity;
    this.globalAmbientIntensity = _globalAmbientIntensity;
};

var Camera = function (_pos, _viewDirection, _upDirection, _fieldOfView, _distance, _width, _height) {
    this.pos = _pos;
    this.viewDirection = _viewDirection;
    this.upDirection = _upDirection;
    this.rightDirection = this.viewDirection.cross (this.upDirection);
    this.fieldOfView = _fieldOfView/180*Math.PI;
    this.distance = _distance;
    this.width = _width;
    this.heigth = _height;


    this.imagePaneHeigth = 2 * Math.tan (this.fieldOfView/2) * this.distance;
    this.imagePaneWidth  = this.imagePaneHeigth / this.heigth * this.width;

    this.imageCenter = this.pos.add (this.viewDirection.multiply (this.distance));
    this.imageTop = this.imageCenter.add (this.upDirection.multiply (this.imagePaneHeigth/2));
    this.imageBottom = this.imageCenter.add (this.upDirection.multiply (-1 * this.imagePaneHeigth/2));
    this.imageLeft = this.imageCenter.add (this.rightDirection.multiply (-1 * this.imagePaneWidth/2));
    this.imageRight = this.imageCenter.add (this.rightDirection.multiply (this.imagePaneWidth/2));

    console.log("imageCenter: " + this.imageCenter.toString());
    console.log("imageTop: " + this.imageTop.toString());
    console.log("imageBottom: " + this.imageBottom.toString());
    console.log("imageLeft: " + this.imageLeft.toString());
    console.log("imageRight: " + this.imageRight.toString());
    console.log("imageWidth: " + this.imagePaneWidth.toString());
    console.log("imageHeigth: " + this.imagePaneHeigth.toString());
};

var Scene = function (_camera, _light) {
    this.objects = new Array();
    this.camera = _camera;
    this.light = _light;
};

Scene.prototype.addObject = function (_object) {
    this.objects.push(_object);
}

var Ray = function (_pos, _direct) {
    this.pos = _pos;
    this.direct = _direct;
}


// 0. set up the scene described in the exercise sheet (this is called before the rendering loop)
function loadScene() {

    var s1 = new Sphere ($V([0,0,0]), 2, new Color (0.75,0,0), new Color (1,0,0), new Color(1,1,1), 32.0);
    var s2 = new Sphere ($V([1.25,1.25,3]), 0.5, new Color (0,0,0.75), new Color (0,0,1), new Color(0.5,0.5,1), 16.0);

    var light = new Light ($V([10,10,10]), new Color (1,1,1), 0, 1, 1, 0.2);
    var camera = new Camera ($V([0,0,10]), $V([0,0,-1]), $V([0,1,0]), 40, 1, 800, 600);

    scene = new Scene (camera, light);

    scene.addObject(s1);
    scene.addObject(s2);

    console.log("scene loaded");
}

function getRay (pixelX, pixelY) {
    var camera = scene.camera;

    pixelY = -1 * pixelY + camera.heigth/2;
    pixelX = pixelX - camera.width/2;

    var p = camera.imageCenter.add (camera.upDirection.multiply (pixelY / camera.heigth * camera.imagePaneHeigth));
    p.addN (camera.rightDirection.multiply (pixelX / camera.width * camera.imagePaneWidth));

    var direction = p.subtract(camera.pos);
    var ray = new Ray (camera.pos, direction.toUnitVector());

    return ray;
}

Sphere.prototype.intersects = function (ray) {

    var o = scene.camera.pos;
    var c = this.center;
    var d = ray.direct;
    var r = this.radius;
    var r2 = r*r;

    // c-o
    var co = c.subtract(o);

    // ||c-o||^2
    var co2 = co.dot(co);

    // (c-o)*d
    var cod = co.dot(d);
    var cod2 = cod*cod;

    if (cod < 0)
        return false;

    // D^2 = ||c-o||^2 - ((c-o)*d)^2
    var D2 = co2 - cod2;
    if (D2 > r2)
        return false;

    // t = (o-c)*d ± sqrt(r^2 - D^2)
    var r2D2 = r2 - D2;
    if (r2D2 < 0)
        return false;
    var t1 = cod + Math.sqrt(r2D2);
    var t2 = cod - Math.sqrt(r2D2);
    var t = Math.min(t1,t2);

    return t;
}

function intersect (ray) {
    var min = -1;
    var object;

    for (var i in scene.objects) {
        var intersection = scene.objects[i].intersects(ray);
        if (intersection != false) {
            if (min == -1 || intersection < min) {
                min = intersection;
                object = scene.objects[i];
            }
        }
    }

    return object;
}

var scene;

function trace(color, pixelX, pixelY) {

    var pixel_color = new Color (0,0,0);

    // 1. shoot a ray determined from the camera parameters and the pixel position in the image
    var ray = getRay(pixelX, pixelY);

    // 2. intersect the ray to scene elements and determine the closest one
    var intersection = intersect(ray);
    if (intersection) {
        pixel_color = intersection.ambient;
    }

	// 3. check if the intersection point is illuminated by each light source
	
	// 4. shade the intersection point using the meterial attributes and the lightings

	// 5. set the pixel color into the image buffer using the computed shading (for now set dummy color into the image buffer)
	color.setElements([	pixel_color.r, pixel_color.g, pixel_color.b ]);
	
}
