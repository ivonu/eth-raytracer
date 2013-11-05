function loadD1 () {
    for (var i = 0; i <= 9; i++) {
        for (var j = 0; j <= 9; j++) {
            for (var k = 0; k <= 9; k++) {
                var s = new Sphere (
                    $V([i-4.5, j-4.5, -Math.pow(k,3)]),
                    0.25,
                    Material.blue(), null, null
                );
                scene.addObject(s);
            }
        }
    }
}