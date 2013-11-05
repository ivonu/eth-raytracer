var Mesh = function(_position, _scale) {
    this.V = new Array(); // array of vertices
    this.F = new Array(); // array of triangles
    this.N = new Array(); // array of normals

    this.triangles = new Array();

    this.material = null;

    this.position = _position;
    this.scale = _scale;

    this.octree = new Octree (null, 0);
};

Mesh.prototype.getBounding = function () {
    return this.octree.b;
}

Mesh.prototype.generateTriangles = function () {
    for (var i = 0; i < this.F.length; i++) {
        var face = this.F[i];
        var triangle = new Triangle (
            this.V[face.e(1)].multiply(this.scale).add(this.position),
            this.V[face.e(2)].multiply(this.scale).add(this.position),
            this.V[face.e(3)].multiply(this.scale).add(this.position),
            null
        );
        this.triangles[i] = triangle;
    }

    if (RayConfig.octree) this.octree.loadOctree(this.triangles);
}

Mesh.prototype.intersects = function (ray) {

    var min_intersection = null;

    var objects = RayConfig.octree ? this.octree.getIntersectionObjects(ray) : this.triangles;
    //console.rlog("triangle intersection tests (before): " + objects.length);
    objects = objects.filter (function (elem, pos) {
        return objects.indexOf(elem) == pos;
    });
    //console.rlog("triangle intersection tests (after): " + objects.length);
    for (var i = 0; i < objects.length; i++) {

        var intersection = objects[i].intersects(ray);

        if (intersection !== null) {
            if (min_intersection === null || intersection.distance < min_intersection.distance) {
                min_intersection = intersection;
                min_intersection.material = this.material;
                min_intersection.object = this;
            }
        }
    }

    return min_intersection;
}


Mesh.prototype.computeNormals = function() {

    for(var i = 0 ; i < this.V.length ; ++i) {
        this.N[i] = $V([0,0,0]);
    }

    for (var i = 0; i < this.F.length; i++) {
        var f = this.F[i];
        var t = this.triangles[i];
        this.N[f.e(1)] = this.N[f.e(1)].add(t.getTriangleNormal().multiply(t.getArea()));
        this.N[f.e(2)] = this.N[f.e(2)].add(t.getTriangleNormal().multiply(t.getArea()));
        this.N[f.e(3)] = this.N[f.e(3)].add(t.getTriangleNormal().multiply(t.getArea()));
    }

    for(var i = 0 ; i < this.V.length; ++i) {
        this.N[i] = this.N[i].toUnitVector();
    }

    for (var i = 0; i < this.triangles.length; i++) {
        var f = this.F[i];
        var t = this.triangles[i];
        t.n1 = this.N [f.e(1)];
        t.n2 = this.N [f.e(2)];
        t.n3 = this.N [f.e(3)];
    }
}