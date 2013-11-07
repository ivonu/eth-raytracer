function loadC3() {

    addSphere1();
    addSphere2();
    //addPyramid();
    //addRandom();
}

function addSphere1() {
    var sphereMesh1 = readOBJ('./data/sphere.obj', $V([0,0,0]), 2);
    sphereMesh1.material = Material.red();
    scene.addObject(sphereMesh1);
}

function addSphere2() {
    var sphereMesh2 = readOBJ('./data/sphere.obj', $V([1.25,1.25,3]), 0.5);
    sphereMesh2.material = Material.blue();
    scene.addObject(sphereMesh2);
}

function addPyramid() {
    var pyr = readOBJ('./data/pyramid.obj', $V([-0.5,-0.5,0]), 3)
    pyr.material = Material.blue();
    scene.addObject(pyr);
}

function addRandom() {
    var file = null;

    var r = Math.floor(Math.random() * 4);
    if (r === 0) file = './data/buddha.obj';
    if (r === 1) file = './data/dragon.obj';
    if (r === 2) file = './data/bunny.obj';
    if (r === 3) file = './data/teapot.obj';

    var object = readOBJ(file, $V([0,0,0]), 0.3);
    object.material = Material.red();
    scene.addObject(object);
}