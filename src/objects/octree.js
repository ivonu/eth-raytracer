var Octree = function (_bounding, _depth) {
    this.bounding = _bounding;
    this.data = null;
    this.children = new Array();
    this.depth = _depth;
}

Octree.prototype.isLeaf = function () {
    return this.children.length === 0;
}

Octree.prototype.makeChildren = function () {
    for (var x = 0; x <= 1; x++) {
        for (var y = 0; y <= 1; y++) {
            for (var z = 0; z <= 1; z++) {

                var new_b = new Bounding (
                    this.bounding.x_max - (1-x)*this.bounding.x_width/2,
                    this.bounding.x_min +     x*this.bounding.x_width/2,
                    this.bounding.y_max - (1-y)*this.bounding.y_width/2,
                    this.bounding.y_min +     y*this.bounding.y_width/2,
                    this.bounding.z_max - (1-z)*this.bounding.z_width/2,
                    this.bounding.z_min +     z*this.bounding.z_width/2
                )

                this.children.push (new Octree (new_b, this.depth-1));
            }
        }
    }
}

// http://www.brandonpelfrey.com/blog/coding-a-simple-octree/
Octree.prototype.insertObject = function (object) {

    if (this.depth <= 0) {
        if (this.data === null) {
            this.data = new Array();
        }
        this.data.push (object);
        return;
    }

    // The node is a leaf (no children/not split) and has no data assigned.
    if (this.isLeaf() && this.data === null) {
        // This is the easiest! We’ve ended up in a small region of space
        // with no data currently assigned and no children,
        // so we will simply assign this data point
        // to this leaf node and we’re done!
        this.data = object;
        return;
    }

    // The node is a leaf (no children/not split),
    // but it already has a point assigned.
    if (this.isLeaf() && this.data !== null) {
        // This is slightly more complicated.
        // We are at a leaf but there’s something already here.
        // Since we only store one point in a leaf, we will actually
        // need to remember what was here already, split this node
        // into eight children, and then re-insert the old point and
        // our new point into the new children.
        // Note: it’s entirely possible that this will happen several
        // times during insert if these two points are really close
        // to each other. (On the order of the logarithm of the space
        // separating them.)

        this.makeChildren();
        var old_data = this.data;
        this.data = null;
        this.insertObject(old_data);
    }

    // The node is an interior node to the tree (has 8 children).
    if (this.isLeaf() === false) {
        // Since we never store data in an interior node
        // of the tree in this article, we will find out
        // which of the eight children the data point
        // lies in and then make a recursive call to
        // insert into that child.

        var objBounding = object.getBounding();

        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].bounding.contains(objBounding)) {
                this.children[i].insertObject(object);
            }
        }
        return;
    }
}

Octree.prototype.getIntersectionObjects = function (ray) {
    if (this.isLeaf()) {
        if (this.data !== null && this.depth <= 0) return this.data;
        if (this.data !== null) return [this.data];
        return [];
    }

    var objects = new Array();

    for (var i = 0; i < 8; i++) {
        if (this.children[i].bounding.intersects(ray)) {
            objects = objects.concat(this.children[i].getIntersectionObjects(ray));
        }
    }

    return objects;
}

