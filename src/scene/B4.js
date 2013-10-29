
function loadB4() {
    var int = new ObjectIntersection(
        new Sphere (
            $V([1.25,1.25,3]),
            0.5,
            null, null
        ),
        new Sphere (
            $V([0.25,1.25,3]),
            1,
            null, null
        ),
        Material.blue()
    );
    scene.addObject(int);

    var s1 = new Hemisphere (
        new Sphere (
            $V([0,0,0]),
            2,
            Material.red(), null
        ),
        new Plane (
            $V([0,0,0]),
            $V([-1,0,1]).toUnitVector(),
            Material.yellow()
        ));

    scene.addObject(s1);

}