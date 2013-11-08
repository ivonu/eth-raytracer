function loadX2() {

    addRandom();
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