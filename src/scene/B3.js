
function loadB3() {

    var cylinder = new Cylinder (
        $V([0,0,0]),               // axis line
        false,true,false,          // fixed x,y,z axis
        2,0,1,                     // radii
        Material.red());

    var ellipsoid = new Ellipsoid (
        $V([1.25,1.25,3]),         // center
        0.25,0.75,0.5,             // x,y,z radii
        Material.blue());

    scene.addObject(cylinder);
    scene.addObject(ellipsoid);
}