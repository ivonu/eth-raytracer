function loadA1() {

    var material1 = ModuleId.C1 ? Material.redC1() : Material.red();
    var texture1 = ModuleId.C2 ? Texture.earth() : null;

    var material2 = ModuleId.C1 ? Material.blueC1() : Material.blue();
    var texture2 = ModuleId.C2 ? Texture.moon() : null;

    var s1 = new Sphere (
        $V([0,0,0]),           // center
        2,                     // radius
        material1, texture1);

    var s2 = new Sphere (
        $V([1.25,1.25,3]),     // center
        0.5,                   // radius
        material2, texture2);

    scene.addObject(s1);
    scene.addObject(s2);
}