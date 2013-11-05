
// DO NOT change the content of this file except for implementing the computeNormals() function
// to load a mesh you need to call: var myMesh = readOBJ('./data/mesh.obj');

function readOBJ(path, position, scale) {
	console.log("Reading OBJ file: " + path);
	var obj = new Mesh(position, scale);
	var req = new XMLHttpRequest();
	req.open('GET', path, false);
	
	req.send(null);
    loadMesh (obj, req.response);
    obj.generateTriangles();
	obj.computeNormals();
	console.log("OBJ file successfully loaded (nbV: " + obj.V.length + ", nbF: " + obj.F.length + ")");
	
	return obj;
}
	
function loadMesh (mesh, data) {

	// v float float float
	var vertex_pattern = /v( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/;
	// f vertex vertex vertex
	var face_pattern1 = /f( +\d+)( +\d+)( +\d+)/
	// f vertex/uv vertex/uv vertex/uv
	var face_pattern2 = /f( +(\d+)\/(\d+))( +(\d+)\/(\d+))( +(\d+)\/(\d+))/;
	// f vertex/uv/normal vertex/uv/normal vertex/uv/normal
	var face_pattern3 = /f( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))/;
	// f vertex//normal vertex//normal vertex//normal
	var face_pattern4 = /f( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))/;

	
	var lines = data.split( "\n" );

	for ( var i = 0; i < lines.length; i ++ ) {

		var line = lines[ i ];
		line = line.trim();

		var result;

		if ( line.length === 0 || line.charAt( 0 ) === '#' ) {
			continue;
		}
		else if ( ( result = vertex_pattern.exec( line ) ) !== null ) {

			// ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
			mesh.V.push( $V([
				parseFloat( result[ 1 ] ),
				parseFloat( result[ 2 ] ),
				parseFloat( result[ 3 ] )
			]) );

		}
		else if ( ( result = face_pattern1.exec( line ) ) !== null ) {

			// ["f 1 2 3", "1", "2", "3"]
			mesh.F.push( $V([
				parseInt( result[ 1 ] ) - 1 ,
				parseInt( result[ 2 ] ) - 1 ,
				parseInt( result[ 3 ] ) - 1 
			]) );

		} else if ( ( result = face_pattern2.exec( line ) ) !== null ) {

			// ["f 1/1 2/2 3/3", " 1/1", "1", "1", " 2/2", "2", "2", " 3/3", "3", "3"]
			mesh.F.push( $V([
				parseInt( result[ 2 ] ) - 1 ,
				parseInt( result[ 5 ] ) - 1 ,
				parseInt( result[ 8 ] ) - 1 
			]) );

		} else if ( ( result = face_pattern3.exec( line ) ) !== null ) {

			// ["f 1/1/1 2/2/2 3/3/3", " 1/1/1", "1", "1", "1", " 2/2/2", "2", "2", "2", " 3/3/3", "3", "3", "3"]
			mesh.F.push( $V([
				parseInt( result[ 2 ] ) - 1 ,
				parseInt( result[ 6 ] ) - 1 ,
				parseInt( result[ 10 ] ) - 1 
			]) );

		} else if ( ( result = face_pattern4.exec( line ) ) !== null ) {

			// ["f 1//1 2//2 3//3", " 1//1", "1", "1", " 2//2", "2", "2", " 3//3", "3", "3"]
			mesh.F.push( $V([
				parseInt( result[ 2 ] ) - 1,
				parseInt( result[ 5 ] ) - 1,
				parseInt( result[ 8 ] ) - 1 
			]) );

		}

	}
	
};



