function loadC3() {

    var sphereMesh1 = readOBJ('./data/sphere.obj')
    sphereMesh1.material = Material.red();
    sphereMesh1.position = $V([0,0,0]);
    sphereMesh1.scale = 2;

    //var sphereMesh2 = readOBJ('./data/sphere.obj')
    //sphereMesh2.material = Material.blue();
    //sphereMesh2.position = $V([1.25,1.25,3]);
    //sphereMesh2.scale = 0.5;

    scene.addObject(sphereMesh1);
    //scene.addObject(sphereMesh2);

    var t1 = new Triangle(
        $V([0,1,0]),
        $V([0,0,0]),
        $V([1,0,0]),
        Material.red()
    )
    var t2 = new Triangle(
        $V([1,0,0]),
        $V([1,1,-1]),
        $V([0,1,0]),
        Material.red()
    )
    var t3 = new Triangle(
        $V([0,0,0]),
        $V([0,-1,-0.5]),
        $V([1,0,0]),
        Material.red()
    )
    var t4 = new Triangle(
        $V([0,0,0]),
        $V([0,1,0]),
        $V([-1,0,-1]),
        Material.red()
    )
    var t5 = new Triangle(
        $V([0,0,0]),
        $V([-1,0,-1]),
        $V([0,-1,-0.5]),
        Material.red()
    )

  //  scene.addObject(t1);
  //  scene.addObject(t2);
  //  scene.addObject(t3);
  //  scene.addObject(t4);
  //  scene.addObject(t5);
}