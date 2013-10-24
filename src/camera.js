var Camera = function (_pos, _viewDirection, _upDirection, _fieldOfView, _distance, _width, _height) {
    this.pos = _pos;
    this.viewDirection = _viewDirection;
    this.upDirection = _upDirection;
    this.rightDirection = this.viewDirection.cross (this.upDirection);
    this.fieldOfView = _fieldOfView / 180 * Math.PI; // convert to radians
    this.distance = _distance;
    this.width = _width;
    this.height = _height;

    this.imagePaneHeight = 2 * Math.tan (this.fieldOfView/2) * this.distance;
    this.imagePaneWidth  = this.imagePaneHeight / this.height * this.width;
    this.imagePaneCenter = this.pos.add (this.viewDirection.multiply (this.distance));
};