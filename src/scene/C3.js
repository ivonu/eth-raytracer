function loadC3() {

    var sphereMesh1 = readOBJ('./data/sphere.obj', $V([0,0,0]), 2);
    sphereMesh1.material = Material.red();

    var sphereMesh2 = readOBJ('./data/sphere.obj', $V([1.25,1.25,3]), 0.5);
    sphereMesh2.material = Material.blue();

    scene.addObject(sphereMesh1);
    scene.addObject(sphereMesh2);

    // var pyr = readOBJ('./data/pyramid.obj', $V([-0.5,-0.5,0]), 3)
    // pyr.material = Material.blue();
    // scene.addObject(pyr);
}